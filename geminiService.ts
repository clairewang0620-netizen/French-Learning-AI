import { GoogleGenAI, Modality } from "@google/genai";

// 1. 内存缓存：存下播放过的音频，第二次点击时瞬间播放，无需联网
const audioCache = new Map<string, AudioBuffer>();

// 2. 音频上下文单例
let audioContext: AudioContext | null = null;

function getAudioContext() {
  if (!audioContext) {
    // 兼容 iOS Safari 的写法 (webkitAudioContext)
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioContext = new AudioContextClass();
  }
  return audioContext;
}

// 解码 Base64
function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// 将 PCM 数据转换为音频 Buffer (Gemini 输出是 24kHz)
function createAudioBufferFromPCM(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number = 24000
): AudioBuffer {
  const dataInt16 = new Int16Array(data.buffer);
  const numChannels = 1;
  const frameCount = dataInt16.length;
  
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  const channelData = buffer.getChannelData(0);

  for (let i = 0; i < frameCount; i++) {
    // 归一化 16-bit 整数到浮点数
    channelData[i] = dataInt16[i] / 32768.0;
  }
  
  return buffer;
}

export const playTextToSpeech = async (text: string, voiceName: 'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'Zephyr' = 'Kore'): Promise<void> => {
  const ctx = getAudioContext();

  // [关键修复] iOS Safari 必须在点击瞬间恢复音频上下文，否则静音
  if (ctx.state === 'suspended') {
    try {
      await ctx.resume();
    } catch (e) {
      console.warn("Audio context resume failed:", e);
    }
  }

  const cacheKey = `${text}-${voiceName}`;

  // 1. 如果缓存里有，直接播放 (0延迟)
  if (audioCache.has(cacheKey)) {
    playBuffer(ctx, audioCache.get(cacheKey)!);
    return;
  }

  // 2. 检查 API Key
  if (!process.env.API_KEY) {
    alert("API Key is missing. Please check your Netlify 'Environment variables' settings for API_KEY.");
    return;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (base64Audio) {
      const pcmData = decodeBase64(base64Audio);
      // 强制使用 24000Hz 采样率，消除机械杂音
      const audioBuffer = createAudioBufferFromPCM(pcmData, ctx, 24000);
      
      // 存入缓存
      audioCache.set(cacheKey, audioBuffer);
      
      // 播放
      playBuffer(ctx, audioBuffer);
    }
  } catch (error: any) {
    console.error("TTS Error:", error);
    if (error.message && error.message.includes("403")) {
        alert("Invalid API Key. Please check your Google AI Studio key in Netlify.");
    }
  }
};

function playBuffer(ctx: AudioContext, buffer: AudioBuffer) {
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  source.start();
}

export const generateExplanation = async (phrase: string): Promise<string> => {
    if (!process.env.API_KEY) return "Please add API_KEY in Netlify settings.";
    
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are a helpful French tutor. Briefly explain the phrase "${phrase}" in English. 
            If it's an idiom, explain the literal meaning vs the actual meaning. 
            Keep it casual and under 40 words.`,
        });
        return response.text || "No explanation available.";
    } catch (e) {
        console.error(e);
        return "Thinking failed. Try again later.";
    }
}