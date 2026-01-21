import { Answers, DiagnosticResult } from '../types';

export const getAIAdvice = async (answers: Answers, result: DiagnosticResult): Promise<string> => {
  // キーの名前が違っても動くように2パターン確認します
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_API_KEY;

  if (!apiKey) {
    return "システム設定エラー：APIキーが見つかりません。Vercelの環境変数を確認してください。";
  }

  // 1.5 Flashモデルを使用（安定・高速）
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const answerSummary = Object.entries(answers).map(([qid, opt]) => `Q${qid}: ${opt.label}`).join('\n');
    
  const prompt = `
  あなたはキャリアのプロです。以下のユーザーに「辛口かつ具体的」なアドバイスをください。
  
  【ユーザー】${result.characterName}
  【弱点環境】${result.toxicEnvironment}
  【回答】${answerSummary}
  
  制約：
  ・日本語で300文字以内
  ・抽象論禁止。具体的な行動を指示すること
  ・「毒の沼」から抜け出す方法を提案すること
  `;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        // 【重要】辛辣な言葉でもエラーにならないよう、安全フィルターを無効化します
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
      console.error("Gemini Error:", errorData);
      // エラー内容を画面に表示して原因をわかるようにします
      return `AIエラー (${response.status}): ${errorData.error?.message || "不明なエラー"}`;
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "アドバイスの生成に失敗しました（空の応答）。";

  } catch (error) {
    console.error("Connection Error:", error);
    return "通信エラーが発生しました。ネットワーク環境を確認してください。";
  }
};
