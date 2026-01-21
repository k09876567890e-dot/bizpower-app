// 【修正】ブラウザで動くライブラリに変更
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Answers, DiagnosticResult } from '../types';

/**
 * 診断結果に基づいたAIアドバイスを生成
 */
export const getAIAdvice = async (answers: Answers, result: DiagnosticResult): Promise<string> => {
  // 1. APIキーの取得
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.error("API Key is missing.");
    return "APIキー設定エラー：Vercelの環境変数を確認してください。";
  }

  try {
    // 【修正】Web用SDKの初期化方法に変更
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // 【修正】ここでモデルを指定（1.5 Flash）
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const answerSummary = Object.entries(answers).map(([qid, opt]) => `Q${qid}: ${opt.label}`).join('\n');
    
    // 【踏襲】ご指定のプロンプトをそのまま使用
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

    // 【修正】Web用SDKでの生成メソッドに変更
    const resultAI = await model.generateContent(prompt);
    const response = await resultAI.response;
    return response.text();

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AIアドバイスの生成に失敗しました。モデルへのアクセス権限か、APIキーの設定をご確認ください。";
  }
};
