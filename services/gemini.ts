
import { GoogleGenAI } from "@google/genai";
import { Answers, DiagnosticResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * 診断結果に基づいたAIアドバイスを生成（Gemini 3 Flash）
 */
export const getAIAdvice = async (answers: Answers, result: DiagnosticResult): Promise<string> => {
  try {
    const answerSummary = Object.entries(answers).map(([qid, opt]) => `Q${qid}: ${opt.label}`).join('\n');
    
    const prompt = `
    あなたは、深層心理学と組織行動学に精通したキャリアアドバイザーです。
    診断結果に基づき、ユーザーの現状の苦しみの正体を言語化し、進むべき道をアドバイスしてください。
    
    【診断結果】
    タイプ: ${result.characterName}
    キャッチコピー: ${result.catchphrase}
    回避すべき環境: ${result.toxicEnvironment}
    
    【回答要約】
    ${answerSummary}
    
    【制約】
    ・日本語で回答してください。
    ・200文字程度に凝縮してください。
    ・論理的かつ勇気を与えるトーンで。
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "アドバイスの生成に失敗しました。";
  } catch (error) {
    console.error("Gemini API Error (Text):", error);
    return "AIアドバイスを読み込めませんでした。";
  }
};
