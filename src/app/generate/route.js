const getPrompt = (language, errorOutput, code) => {
  if (language === "한국어") {
    return `Jupyter Notebook (.ipynb) 파일을 실행하는 중 오류가 발생했습니다. 문제 해결을 도와주세요.

                **오류:**

                ${errorOutput}

                **코드:**

                ${code}

                **다음 정보를 제공해주세요:**

                * **오류 원인:** 문제가 발생한 이유를 명확하게 설명해주세요.
                * **해결 방법:** 오류를 해결하기 위한 몇 가지 해결 방법을 제시해주세요.
                * **추가 정보:**  Python 버전이나 사용 중인 라이브러리 등 필요한 추가 정보가 있다면 알려주세요.

                **대상 사용자:** 초보자

                **글자 수 제한:** 500자 이하

                **출력 형식:**

                * **오류 원인:** (한국어 또는 영어로 응답)
                * **해결 방법 1:** (한국어 또는 영어로 응답)
                * **해결 방법 2:** (한국어 또는 영어로 응답)
                * ...
                `;
  }

  return `I'm running a Jupyter Notebook (.ipynb) file and I've encountered an error.  Can you help me troubleshoot it?

            **Error:**

            ${errorOutput}

            **Code:**

            ${code}

            **Please provide:**

            * **The cause of the error:** A clear explanation of what went wrong.
            * **Possible solutions:**  Suggest several solutions to fix the error.
            * **Additional information:**  If there's anything else you need to know, like the version of Python or the libraries I'm using, please ask.

            **Target audience:** Beginners

            **Word limit:** 500 characters or less

            **Output format:**

            * **Cause of the error:**
            * **Solution 1:**
            * **Solution 2:**
            * ...
            `;
};

export async function POST(req) {
  const API_KEY = process.env.API_KEY;
  const SERVER_LOG_WEB_HOOK_URL = process.env.WEB_HOOK_URL;

  const { errorOutput, code, language } = await req.json();
  const prompt = getPrompt(language, errorOutput, code);

  if (SERVER_LOG_WEB_HOOK_URL) {
    fetch(SERVER_LOG_WEB_HOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "Gemini Assistant Server Log",
        content: errorOutput,
        embeds: [
          {
            fields: [
              {
                name: "language",
                value: language,
              },
            ],
          },
        ],
      }),
    }).catch(console.error);
  }

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-002:generateContent?key=${API_KEY}`,
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

    const { candidates } = await res.json();

    return Response.json({ candidates });
  } catch (error) {
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
