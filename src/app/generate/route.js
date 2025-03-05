export const maxDuration = 60;
export const dynamic = "force-dynamic";

const getPrompt = (language, errorOutput, code) => {
  if (language === "한국어") {
    return `Jupyter Notebook (.ipynb) 파일을 실행하는 중 다음 오류가 발생했습니다. 초보 사용자도 이해할 수 있도록 문제 해결을 도와주세요.

            ---

            **오류 메시지:**

            ${errorOutput}

            ---

            **실행 코드:**

            ${code}

            ---

            **1. 오류 메시지에서 에러 유형(예: NameError, TypeError, SyntaxError 등)을 확인하고, 어떤 부분에서 오류가 발생했는지 구체적으로 설명해주세요.** (예: "NameError: 'my_variable' is not defined" 오류는 'my_variable'이라는 변수가 정의되지 않았다는 의미입니다.)

            **2. 오류가 발생한 코드 줄을 찾고, 해당 코드에 어떤 문제가 있는지 설명해주세요.** (예: 오타, 잘못된 함수 사용, 들여쓰기 오류 등)

            **3. 오류를 해결하기 위한 단계별 해결 방법을 제시해주세요.** (예: 변수 정의, 함수 수정, 라이브러리 설치 등)

            **4. 필요하다면, 코드를 직접 수정하여 제시해주세요.**

            **5. 오류 해결에 추가적으로 필요한 정보가 있다면 구체적으로 요청해주세요.** (예: 사용 중인 Python 버전, 특정 라이브러리 버전 등)

            ---

            **출력 형식:**

            * **1. 오류 유형 및 발생 위치:** (구체적으로 설명)
            * **2. 문제점:** (코드의 문제점 설명)
            * **3. 해결 방법 1:** (단계별 설명)
            * **4. 해결 방법 2:** (필요시 추가)
            * **5. 추가 정보:** (필요시 구체적으로 요청)
                `;
  }

  return `The following error occurred while running a Jupyter Notebook (.ipynb) file. Please assist in troubleshooting this issue for a beginner user.

          ---

          **Error Message:**

          ${errorOutput}

          ---

          **Executed Code:**

          ${code}

          ---

          **1. Identify the error type (e.g., NameError, TypeError, SyntaxError) from the error message and explain specifically where the error occurred.** (e.g., "NameError: 'my_variable' is not defined" indicates that the variable 'my_variable' has not been defined.)

          **2. Locate the line of code where the error occurred and explain what is wrong with that line.** (e.g., typos, incorrect function usage, indentation errors.)

          **3. Provide step-by-step solutions to resolve the error.** (e.g., defining variables, correcting functions, installing libraries.)

          **4. If possible, provide the corrected code directly.**

          **5. If any additional information is needed to resolve the error, request it specifically.** (e.g., Python version being used, specific library versions.)

          ---


          **Output Format:**

          * **1. Error Type and Location:** (Explain specifically)
          * **2. Issue:** (Describe the problem in the code)
          * **3. Solution 1:** (Step-by-step explanation)
          * **4. Solution 2:** (If necessary)
          * **5. Additional Information:** (Request specifically if needed)
          `;
};

const removeUnnecessaryErrorOutput = (errorOutput) => {
  const withoutColorCodes = errorOutput.replace(/\x1b\[[0-9;]*[mG]/g, "");

  const lines = withoutColorCodes.split("\n");

  const cleanMessage = lines.map((line) => line.trim()).join("\n");

  return cleanMessage;
};

export async function POST(req) {
  const API_KEY = process.env.API_KEY;
  const SERVER_LOG_WEB_HOOK_URL = process.env.WEB_HOOK_URL;

  const { errorOutput, code, language } = await req.json();
  const cleanedErrorOutput = removeUnnecessaryErrorOutput(errorOutput);

  const prompt = getPrompt(language, cleanedErrorOutput, code);

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:countTokens?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const { totalTokens } = await res.json();

    if (SERVER_LOG_WEB_HOOK_URL) {
      fetch(SERVER_LOG_WEB_HOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "Gemini Assistant Server Log",
          content: cleanedErrorOutput.substr(0, 2000),
          embeds: [
            {
              fields: [
                {
                  name: "language",
                  value: language,
                },
                {
                  name: "tokens",
                  value: totalTokens,
                },
              ],
            },
          ],
        }),
      }).catch(console.log);
    }
  } catch (error) {
    console.log(error);
  }

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-thinking-exp-01-21:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    if (res.status === 200) {
      const jsonParsedData = await res.json();

      const { candidates } = jsonParsedData;

      return Response.json({ candidates });
    } else {
      const errorData = await res.json();

      const { code, status, message } = errorData.error;

      throw new Error(
        `code: ${code} , message: ${message} , status: ${status}`
      );
    }
  } catch (error) {
    console.log(
      `errorOutput length: ${cleanedErrorOutput.length}, code length: ${code.length}`
    );

    fetch(SERVER_LOG_WEB_HOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "Gemini Assistant Server Error Log",
        content: "🚨 **ERROR** 🚨\n```" + error.toString() + "```",
      }),
    }).catch(console.error);
  }
}
