import { GoogleGenAI, Modality } from "@google/genai";

// 这是一个运行在 Netlify 服务器上的后端函数
// 它可以无视防火墙，直接连接 Google
export default async (req: Request) => {
  // 1. 处理跨域问题 (CORS) - 允许你的网站访问
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  // 2. 检查 API Key (从 Netlify 环境变量获取)
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Server API_KEY missing" }), { status: 500 });
  }

  try {
    const { type, text, voice } = await req.json();
    const ai = new GoogleGenAI({ apiKey });

    // === 场景 A: 文字转语音 (TTS) ===
    if (type === 'tts') {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: voice || 'Kore' },
            },
          },
        },
      });
      const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      return new Response(JSON.stringify({ audio: audioData }), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    // === 场景 B: 解释单词 (Explain) ===
    if (type === 'explain') {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are a helpful French tutor. Briefly explain the phrase "${text}" in English. Keep it casual and under 40 words.`,
        });
        return new Response(JSON.stringify({ text: response.text }), {
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        });
    }

    return new Response("Invalid type", { status: 400 });

  } catch (error: any) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { 
        status: 500,
        headers: { "Access-Control-Allow-Origin": "*" } 
    });
  }
};
