// 正規のSDKをインポート（Step 1を行ったので、これで動きます）
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Answers, DiagnosticResult } from '../types';

export const getAIAdvice = async (answers: Answers, result: DiagnosticResult): Promise<string> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_API_KEY;

  if (!apiKey) {
    return "APIキーが見つかりません。Vercelの環境変数を確認してください。";
  }

  try {
    // SDK初期化
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // destiny-appでも動いている標準モデルを指定
    // SDK経由なら "gemini-1.5-flash" で自動的に適切なバージョンに繋がります
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const answerSummary = Object.entries(answers).map(([qid, opt]) => `Q${qid}: ${opt.label}`).join('\n');
    
    const prompt = `
    あなたは辛口のキャリアアドバイザーです。以下のユーザーに300文字以内でアドバイスをください。
    
    【ユーザー】${result.characterName}
    【弱点】${result.toxicEnvironment}
    【回答】${answerSummary}
    
    具体的かつ論理的に、毒の沼から抜け出す方法を提案してください。
    `;

    const resultAI = await model.generateContent(prompt);
    const response = await resultAI.response;
    return response.text();

  } catch (error: any) {
    console.error("Gemini SDK Error:", error);
    return `AIエラー: ${error.message || "詳細不明"}`;
  }
};
