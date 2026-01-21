import { Answers, DiagnosticResult } from '../types';

/**
 * ライブラリを使わず、標準のFetch APIでGemini 1.5 Flashを呼び出す
 * （これならビルドエラーは絶対に起きません）
 */
export const getAIAdvice = async (answers: Answers, result: DiagnosticResult): Promise<string> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.error("API Key is missing.");
    return "APIキー設定エラー：Vercelの環境変数を確認してください。";
  }

  // Gemini 1.5 Flash のAPIエンドポイント（直接呼び出し）
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

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

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API Response Error:", errorData);
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    // レスポンスからテキストを抽出
    const advice = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    return advice || "アドバイスの生成に失敗しました。";

  } catch (error) {
    console.error("Gemini API Connection Error:", error);
    return "現在アクセスが集中しており、AIアドバイスを生成できませんでした。";
  }
};
