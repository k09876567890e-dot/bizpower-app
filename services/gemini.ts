// 最新SDKを使用
import { GoogleGenAI } from "@google/genai";
import { Answers, DiagnosticResult } from '../types';

/**
 * 診断結果に基づいたAIアドバイスを生成（Gemini 3 Flash Preview）
 */
export const getAIAdvice = async (answers: Answers, result: DiagnosticResult): Promise<string> => {
  // 1. APIキーの取得（Vercel/Vite環境用）
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.error("API Key is missing.");
    return "APIキー設定エラー：Vercelの環境変数を確認してください。";
  }

  try {
    // 2. AIクライアントの初期化（関数の内側で実行してクラッシュを回避）
    const ai = new GoogleGenAI({ apiKey: apiKey });
    
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
    ・300文字程度に凝縮してください。
    ・論理的かつ勇気を与えるトーンで。
    `;

    // 3. ご指定の Gemini 3 Flash Preview モデルを使用
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', 
      contents: {
        role: 'user',
        parts: [{ text: prompt }]
      },
    });

    return response.text() || "アドバイスの生成に失敗しました。";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AIアドバイスの生成に失敗しました。モデルへのアクセス権限か、APIキーの設定をご確認ください。";
  }
};
