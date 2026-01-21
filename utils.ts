import { Answers, ResultType, DiagnosticResult } from './types';
import { RESULT_TEMPLATES } from './constants';

export const calculateResult = (answers: Answers): DiagnosticResult => {
  const answerValues = Object.values(answers);
  
  let logic = 0;
  let creativity = 0;
  let empathy = 0;
  let autonomy = 0;
  let risk = 0;

  answerValues.forEach((opt) => {
    logic += opt.scores[0];
    creativity += opt.scores[1];
    empathy += opt.scores[2];
    autonomy += opt.scores[3];
    risk += opt.scores[4];
  });

  const normalize = (val: number) => {
    const base = 5;
    const scaled = base + val;
    return Math.max(1, Math.min(10, scaled));
  };

  const nLogic = normalize(logic);
  const nCreativity = normalize(creativity);
  const nEmpathy = normalize(empathy);
  const nAutonomy = normalize(autonomy);
  const nRisk = normalize(risk);

  const radarData = [
    { subject: '論理性', A: nLogic, fullMark: 10 },
    { subject: '独創性', A: nCreativity, fullMark: 10 },
    { subject: '共感力', A: nEmpathy, fullMark: 10 },
    { subject: '自律性', A: nAutonomy, fullMark: 10 },
    { subject: '決断力', A: nRisk, fullMark: 10 },
  ];

  let type: ResultType = 'ARCHITECT'; 

  const scores = {
    ARCHITECT: nLogic + nAutonomy,
    REVOLUTIONARY: nCreativity + nRisk,
    GUARDIAN: nEmpathy * 1.5 - nRisk, 
    STRATEGIST: nLogic + nRisk - nEmpathy, 
    NOMAD: nCreativity + nAutonomy
  };

  const entries = Object.entries(scores) as [ResultType, number][];
  entries.sort((a, b) => b[1] - a[1]);
  type = entries[0][0];

  const template = RESULT_TEMPLATES[type];

  const totalScore = nLogic + nCreativity + nEmpathy + nAutonomy + nRisk;
  const basePower = (totalScore / 50) * 8000 + 1000; 
  const randomFactor = Math.floor(Math.random() * 500); 
  const combatPower = Math.floor(basePower + randomFactor);

  let rank = 'C';
  if (combatPower > 8500) rank = 'S';
  else if (combatPower > 7000) rank = 'A';
  else if (combatPower > 5000) rank = 'B';
  else rank = 'C';

  // Twitterカード画像がある前提で極限まで短く。リンクを含める余白を確保。
  const shareText = `【ビジネス戦闘力診断】
戦闘力：${combatPower.toLocaleString()}(${rank})
ジョブ：${template.characterName}
「${template.catchphrase}」
あなたの才能を殺す「毒の沼」にいませんか？
#BizPower #キャリア診断`;

  return {
    ...template,
    type,
    radarData,
    combatPower,
    rank,
    shareText
  };
};