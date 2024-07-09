export async function POST(req) {
    const API_KEY = process.env.API_KEY;

    const { errorOutput, code } = await req.json()

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [
                        {
                            text: `.ipynb 코드를 실행하던 중 에러가 발생했어. 오류에 대한 솔루션을 제공해줘
                            ===
                            error: ${errorOutput}
                            ===
                            code: ${code}
                            ===
                            language: ko
                            ===
                            level: beginner
                            ===
                            size: 500자 이내
                            ===
                            **출력 결과물 형식: 
                            에러 원인
                            \n
                            해결 방법1
                            \n
                            해결 방법2
                            \n
                            해결 방법...
                            \n
                            **
                            }`
                        },
                    ],
                },
            ],
        }),
    });

    const { candidates } = await res.json();

    return Response.json({ candidates })
}