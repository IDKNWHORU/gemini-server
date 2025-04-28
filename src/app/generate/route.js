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

  if (language === "日本語") {
    return `Jupyter Notebook (.ipynb) ファイルを実行中に以下のエラーが発生しました。初心者でも理解できるように、問題解決を手伝ってください。

            ---

            **エラーメッセージ:**

            ${errorOutput}

            ---

            **実行コード:**

            ${code}

            ---

            **1. エラーメッセージからエラーの種類（例: NameError, TypeError, SyntaxError など）を確認し、どの部分でエラーが発生したかを具体的に説明してください。** （例: 「NameError: 'my_variable' is not defined」エラーは、「'my_variable' という変数が定義されていない」ことを意味します。）

            **2. エラーが発生したコードの行を見つけ、そのコードにどのような問題があるかを説明してください。** （例: タイプミス、関数の誤用、インデントエラーなど）

            **3. エラーを解決するためのステップバイステップの解決策を提示してください。** （例: 変数の定義、関数の修正、ライブラリのインストールなど）

            **4. 必要であれば、コードを直接修正して提示してください。**

            **5. エラー解決に追加で必要な情報があれば、具体的に要求してください。** （例: 使用中のPythonバージョン、特定のライブラリのバージョンなど）

            ---

            **出力形式:**

            * **1. エラーの種類と発生箇所:** （具体的に説明）
            * **2. 問題点:** （コードの問題点を説明）
            * **3. 解決策 1:** （ステップバイステップで説明）
            * **4. 解決策 2:** （必要に応じて追加）
            * **5. 追加情報:** （必要に応じて具体的に要求）
            `;
  }

  // 러시아어 추가
  if (language === "Русский") {
    return `При выполнении файла Jupyter Notebook (.ipynb) произошла следующая ошибка. Помогите устранить проблему для начинающего пользователя.

            ---

            **Сообщение об ошибке:**

            ${errorOutput}

            ---

            **Выполняемый код:**

            ${code}

            ---

            **1. Определите тип ошибки (например, NameError, TypeError, SyntaxError и т. д.) из сообщения об ошибке и конкретно объясните, где произошла ошибка.** (Например, ошибка «NameError: 'my_variable' is not defined» означает, что переменная 'my_variable' не определена.)

            **2. Найдите строку кода, где произошла ошибка, и объясните, что не так с этой строкой.** (Например: опечатки, неправильное использование функции, ошибки отступов.)

            **3. Предложите пошаговые решения для устранения ошибки.** (Например: определение переменных, исправление функций, установка библиотек.)

            **4. Если возможно, предоставьте исправленный код напрямую.**

            **5. Если для устранения ошибки требуется дополнительная информация, конкретно запросите ее.** (Например: используемая версия Python, версии конкретных библиотек.)

            ---

            **Формат вывода:**

            * **1. Тип ошибки и место возникновения:** (Подробное объяснение)
            * **2. Проблема:** (Описание проблемы в коде)
            * **3. Решение 1:** (Пошаговое объяснение)
            * **4. Решение 2:** (При необходимости дополнительно)
            * **5. Дополнительная информация:** (При необходимости конкретный запрос)
            `;
  }

  // 페르시아어 추가
  if (language === "فارسی") {
    return `هنگام اجرای فایل Jupyter Notebook (.ipynb) خطای زیر رخ داده است. لطفا در عیب‌یابی این مشکل برای یک کاربر مبتدی کمک کنید.

            ---

            **پیام خطا:**

            ${errorOutput}

            ---

            **کد اجرا شده:**

            ${code}

            ---

            **1. نوع خطا (مانند NameError, TypeError, SyntaxError و غیره) را از پیام خطا شناسایی کنید و به طور خاص توضیح دهید که خطا در کجا رخ داده است.** (مثال: خطای «NameError: 'my_variable' is not defined» به این معنی است که متغیر 'my_variable' تعریف نشده است.)

            **2. خط کدی که در آن خطا رخ داده است را پیدا کنید و توضیح دهید که مشکل آن خط چیست.** (مثال: غلط املایی، استفاده نادرست از تابع، خطاهای تورفتگی.)

            **3. راه حل‌های گام به گام برای رفع خطا ارائه دهید.** (مثال: تعریف متغیرها، اصلاح توابع، نصب کتابخانه‌ها.)

            **4. در صورت امکان، کد اصلاح شده را مستقیماً ارائه دهید.**

            **5. اگر برای رفع خطا به اطلاعات بیشتری نیاز است، به طور خاص آن را درخواست کنید.** (مثال: نسخه پایتون در حال استفاده، نسخه‌های کتابخانه‌های خاص.)

            ---

            **فرمت خروجی:**

            * **1. نوع و محل خطا:** (توضیح دقیق)
            * **2. مشکل:** (توضیح مشکل در کد)
            * **3. راه حل 1:** (توضیح گام به گام)
            * **4. راه حل 2:** (در صورت لزوم اضافی)
            * **5. اطلاعات اضافی:** (در صورت لزوم درخواست خاص)
            `;
  }

  // 기본 (English)
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
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-04-17:generateContent?key=${API_KEY}`,
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
