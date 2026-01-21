import { Answers, DiagnosticResult } from '../types';

/**
 * コスト最安・最速の Gemini 1.5 Flash を確実に呼び出す設定
 */
export const getAIAdvice = async (answers: Answers, result: DiagnosticResult): Promise<string> => {
  // 環境変数の読み込み（Vite/Vercel用）
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_API_KEY;

  if (!apiKey) {
    return "APIキーが見つかりません。Vercelの設定を確認してください。";
  }

  // 【修正の肝】
  // 短い名前ではなく、確実に存在する「正式バージョン名」を指定します。
  // これで "404 not found" を回避します。
  const model = "gemini-1.5-flash-latest";
  
  // Flashは v1beta で呼び出すのが必須です
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const answerSummary = Object.entries(answers).map(([qid, opt]) => `Q${qid}: ${opt.label}`).join('\n');
    
  const prompt = `
  あなたは辛口のキャリアアドバイザーです。以下の診断結果のユーザーに、300文字以内で具体的なアドバイスをしてください。
  
  【ユーザータイプ】${result.characterName}
  【弱点・毒の沼】${result.toxicEnvironment}
  【回答傾向】${answerSummary}
  
  制約：
  ・抽象的な励ましは禁止。具体的な行動を提案すること。
  ・「毒の沼」から抜け出すための第一歩を示すこと。
  ・トーンは論理的かつ、少し厳しめに。
  `;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        // 安全フィルターを解除（辛口アドバイスがブロックされないようにする）
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API Error:", errorData);
      
      // 万が一 Flash がダメだった場合のエラー表示
      return `AIエラー (${response.status}): ${errorData.error?.message || "モデルが見つかりません"}`;
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "アドバイスの生成に失敗しました。";

  } catch (error) {
    console.error("Network Error:", error);
    return "通信エラーが発生しました。時間を置いて再試行してください。";
  }
};
