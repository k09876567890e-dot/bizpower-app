import { Question, ResultType, DiagnosticResult } from './types';

// GitHubのRawリンクベースURL
const GITHUB_IMAGE_BASE = "https://raw.githubusercontent.com/k09876567890e-dot/bizpower-app/main/";

export const MAIN_COPIES = [
  "あなたの「ビジネス戦闘力」を測定します。",
  "深層心理から導き出す、\n本当の才能と「輝ける戦場」。",
  "我慢は美徳ではありません。\nあなたの武器が最大化される場所を特定せよ。",
];

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "仕事において、あなたが最も「ストレス」を感じる瞬間は？",
    options: [
      { label: "根拠のない、感情的な指示に従わされる時", value: 0, scores: [3, 0, -1, 1, 0] },
      { label: "毎日同じことの繰り返しで、変化がない時", value: 0, scores: [0, 3, 0, -1, 2] },
      { label: "周囲がギスギスしていて、協力関係がない時", value: 0, scores: [-1, 0, 3, 0, -1] },
    ]
  },
  {
    id: 2,
    text: "もし明日から、上司の指示が一切なくなるとしたら？",
    options: [
      { label: "最高だ。自分のやり方で自由に動ける", value: 0, scores: [1, 1, -1, 3, 1] },
      { label: "不安だ。明確な目標やガイドラインが欲しい", value: 0, scores: [0, -1, 2, -2, -2] },
      { label: "自分がリーダーとして周りをまとめたい", value: 0, scores: [2, 0, 0, 1, 2] },
    ]
  },
  {
    id: 3,
    // 【修正】ファンタジー要素（杖・聖杯）を排除し、ビジネス用語に変更
    text: "仕事で成果を出すための「最強の武器」は？",
    options: [
      { label: "圧倒的な「データ分析力と論理思考」", value: 0, scores: [3, -1, 1, -1, -2] },
      { label: "常識を覆す「アイデアと発想力」", value: 0, scores: [0, 3, 0, 2, 1] },
      { label: "チームを結束させる「人望と対話力」", value: 0, scores: [0, 0, 3, 0, -1] },
    ]
  },
  {
    id: 4,
    text: "あなたが憧れるビジネスパーソンの姿は？",
    options: [
      { label: "誰にも真似できない専門スキルを持つ「職人」", value: 0, scores: [2, 2, -2, 2, 0] },
      { label: "周囲から絶大な信頼を集める「人格者」", value: 0, scores: [-1, -1, 3, -1, -1] },
      { label: "大胆な決断で組織を動かす「司令塔」", value: 0, scores: [2, 0, 0, 1, 2] },
    ]
  },
  {
    id: 5,
    // 【修正】読点（、）の表記ゆれを修正
    text: "会議中、決定事項に論理的な「矛盾」を見つけたら？",
    options: [
      { label: "その場ですぐに指摘し、修正を提案する", value: 0, scores: [3, 0, -1, 1, 1] },
      { label: "場の雰囲気を壊さないよう、様子を見る", value: 0, scores: [-2, -1, 3, -1, -1] },
      { label: "後でこっそり、個別に意見を伝える", value: 0, scores: [1, 1, 0, 2, 0] },
    ]
  },
  {
    id: 6,
    text: "プロジェクトが失敗した際、最も「許せない」原因は？",
    options: [
      { label: "計画自体がずさんで、見通しが甘かったこと", value: 0, scores: [3, 0, 0, 0, -1] },
      { label: "斬新なアイデアや工夫が全くなかったこと", value: 0, scores: [0, 3, 0, 0, 1] },
      { label: "メンバーの足並みが揃わず、バラバラだったこと", value: 0, scores: [0, 0, 3, 0, 0] },
    ]
  },
  {
    id: 7,
    text: "年収や報酬に対する考え方に最も近いのは？",
    options: [
      { label: "低くてもいいので、安定した生活を保障してほしい", value: 0, scores: [1, -2, 1, -2, -3] },
      { label: "リスクを取ってでも、成果に見合う高報酬を狙いたい", value: 0, scores: [0, 2, -1, 2, 3] },
      { label: "そこそこの報酬と、自由な時間を両立したい", value: 0, scores: [1, 0, 1, 0, -1] },
    ]
  },
  {
    id: 8,
    text: "あなたのデスクやパソコン内の整理状況は？",
    options: [
      { label: "どこに何があるか、常に完璧に整理されている", value: 0, scores: [2, -1, 0, 1, -1] },
      { label: "散らかっているように見えて、自分なりの秩序がある", value: 0, scores: [-1, 3, 0, 1, 0] },
      { label: "他人の目が気になるので、最低限は整えている", value: 0, scores: [0, -1, 2, -1, -1] },
    ]
  },
  {
    id: 9,
    text: "理不尽な要求をする相手（顧客や上司）。どう対処する？",
    options: [
      { label: "冷静に論理的な矛盾を突いて、交渉する", value: 0, scores: [3, 0, -2, 1, 1] },
      { label: "相手の感情を逆なでしないよう、柔軟に受け流す", value: 0, scores: [0, 0, 3, 0, -1] },
      { label: "マニュアルやルールを盾にして、粛々と対応する", value: 0, scores: [1, -1, 0, 1, 0] },
    ]
  },
  {
    id: 10,
    text: "あなたが「美しい仕事」だと感じるのは？",
    options: [
      { label: "無駄が一切なく、洗練された仕組みやデータ", value: 0, scores: [3, 1, 0, 1, 0] },
      { label: "誰も見たことがないような、独創的な企画や商品", value: 0, scores: [0, 3, 0, 1, 1] },
      { label: "多くの人が笑顔になり、感謝の言葉が飛び交う光景", value: 0, scores: [-1, -1, 3, -1, -2] },
    ]
  },
  {
    id: 11,
    text: "休日、急に予定が空いてしまいました。どう過ごす？",
    options: [
      { label: "ここぞとばかりに、一人で趣味や勉強に没頭する", value: 0, scores: [1, 1, -1, 3, 0] },
      { label: "寂しいので、誰か誘える友人がいないか連絡する", value: 0, scores: [-1, -1, 3, -2, 0] },
      { label: "時間を有効に使うための計画を立て直す", value: 0, scores: [2, 0, 0, 1, 0] },
    ]
  },
  {
    id: 12,
    text: "ビジネスにおける「常識」という言葉をどう捉える？",
    options: [
      { label: "円滑な運営のために、絶対に守るべきマナー", value: 0, scores: [1, -1, 2, -1, -2] },
      { label: "時代に合わせて疑い、打破していくべきもの", value: 0, scores: [1, 3, -1, 2, 2] },
      { label: "特に何も考えず、周りに合わせている", value: 0, scores: [0, 0, 0, 0, 0] },
    ]
  },
  {
    id: 13,
    text: "もしチームリーダーを任されたら、最初に何をする？",
    options: [
      { label: "まずは目標達成に向けた戦略とルールを固める", value: 0, scores: [3, 0, 0, 1, 1] },
      { label: "メンバーとランチに行き、信頼関係を築く", value: 0, scores: [-1, -1, 3, -1, -1] },
      { label: "今までにない面白いやり方を試してみる", value: 0, scores: [0, 3, -1, 1, 2] },
    ]
  },
  {
    id: 14,
    text: "人から批判を受けたとき、あなたの心境は？",
    options: [
      { label: "論理的に正しい指摘であれば、素直に感謝する", value: 0, scores: [2, 0, -1, 2, 0] },
      { label: "「自分の個性が目立っている」とポジティブに捉える", value: 0, scores: [0, 2, -1, 2, 2] },
      { label: "感情的に傷つくので、できるだけ回避したい", value: 0, scores: [-1, -1, 3, -2, -2] },
    ]
  },
  {
    id: 15,
    text: "人生の最後、仕事についてどう言われたい？",
    options: [
      { label: "「あなたは誰よりも賢く、正解を示し続けた」", value: 0, scores: [3, 0, 0, 0, 0] },
      { label: "「あなたと一緒に働けて、本当に幸せだった」", value: 0, scores: [0, 0, 3, 0, 0] },
      { label: "「あなたは誰にも真似できない、自由な挑戦者だった」", value: 0, scores: [0, 3, -1, 3, 1] },
    ]
  },
];

export const RESULT_TEMPLATES: Record<ResultType, Omit<DiagnosticResult, 'type' | 'radarData' | 'combatPower' | 'rank' | 'shareText'>> = {
  ARCHITECT: {
    characterName: "叡智の設計者",
    catchphrase: "不条理を排し、最適解を導く知の司令塔。",
    imagePath: `${GITHUB_IMAGE_BASE}architect.png`,
    description: `高い論理演算力と自律性を持つあなたは、混沌とした状況から法則性を見出し、無駄のない仕組みを再構築できる希少な人材です。周囲が感情論で足踏みする中、常に根拠に基づいた「正解」を提示できます。`,
    toxicEnvironment: "根拠のない精神論が飛び交う組織、古い慣習が絶対のレガシー企業。",
    fateWarning: "あなたの精密な思考能力は無意味な調整業務に浪費され、凡庸なパーツとして埋もれてしまう恐れがあります。",
    recommendedActions: [
      { label: "専門特化型コンサル", description: "知性を武器に企業の課題を解決。", url: "https://example.com/affiliate1" },
      { label: "実力主義テック組織", description: "質のみで評価される世界。", url: "https://example.com/affiliate2" },
      { label: "外資系戦略部門", description: "フェアな競争が行われる場。", url: "https://example.com/affiliate3" }
    ],
    colorTheme: "from-blue-500 to-indigo-700",
  },
  REVOLUTIONARY: {
    characterName: "未来の開拓者",
    catchphrase: "常識を破壊し、新しい価値を創造する変革者。",
    imagePath: `${GITHUB_IMAGE_BASE}revolutionary.png`,
    description: `圧倒的な創造性と挑戦心が武器です。既存のルールを疑い、誰も見たことがない景色を形にする力があります。ルーチンワークはあなたにとって退屈以外の何物でもありません。`,
    toxicEnvironment: "前例踏襲が最優先の公務員的組織、減点方式の保守的な環境。",
    fateWarning: "狭い鳥籠の中であなたの翼は腐りかけています。打たれ続ける前に、自らが風を起こせる場所へ脱出すべきです。",
    recommendedActions: [
      { label: "スタートアップ創業", description: "ゼロからルールを創る旅。", url: "https://example.com/affiliate4" },
      { label: "新規事業開発", description: "社内リソースで大胆な実験。", url: "https://example.com/affiliate5" },
      { label: "独立・起業", description: "自らがルールとなりビジョンを証明。", url: "https://example.com/affiliate6" }
    ],
    colorTheme: "from-amber-400 to-orange-600",
  },
  GUARDIAN: {
    characterName: "調和の守護者",
    catchphrase: "絆を繋ぎ、組織を癒やす絶対的なバランサー。",
    imagePath: `${GITHUB_IMAGE_BASE}guardian.png`,
    description: `SSR級の共感力と調整力を持っています。人々の心を繋ぎ止め、心理的安全性を生み出せるのはあなただけです。チームを一つの生き物のように機能させる才能があります。`,
    toxicEnvironment: "個人主義が極まった弱肉強食の組織、パワハラが横行する環境。",
    fateWarning: "あなたの優しさは都合の良い道具として搾取されている可能性があります。自分の心が削り取られる前に、慈愛に応えてくれる組織へ。",
    recommendedActions: [
      { label: "人事・組織開発", description: "人が輝くための土壌を耕す。", url: "https://example.com/affiliate7" },
      { label: "カスタマーサクセス", description: "顧客に深く寄り添い感謝を得る。", url: "https://example.com/affiliate8" },
      { label: "NPO・社会貢献企業", description: "意義を追求し社会を癒やす。", url: "https://example.com/affiliate9" }
    ],
    colorTheme: "from-emerald-400 to-teal-600",
  },
  STRATEGIST: {
    characterName: "勝利の軍師",
    catchphrase: "結果ですべてを証明する、冷徹なる戦略家。",
    imagePath: `${GITHUB_IMAGE_BASE}strategist.png`,
    description: `論理とリスク耐性が高い勝負師です。目的達成のために最も効率的な一手を選び抜くことができます。リーダーシップを発揮することを恐れず、大きな成果を掴み取ります。`,
    toxicEnvironment: "年功序列でポストが空かない組織、意思決定が遅い大企業。",
    fateWarning: "あなたの野心は、天井の低い部屋では育ちません。実力がダイレクトに反映される戦場へ移動しなければ、欲求不満で終わります。",
    recommendedActions: [
      { label: "経営企画・事業戦略", description: "数字で世界を動かす中枢。", url: "https://example.com/affiliate10" },
      { label: "実力主義セールス", description: "成果の分だけ報酬が伸びる世界。", url: "https://example.com/affiliate11" },
      { label: "M&Aアドバイザリー", description: "巨額が動く交渉の最前線。", url: "https://example.com/affiliate12" }
    ],
    colorTheme: "from-slate-700 to-slate-900",
  },
  NOMAD: {
    characterName: "自由な開拓者",
    catchphrase: "枠に囚われず、美学と直感で生きる自由人。",
    imagePath: `${GITHUB_IMAGE_BASE}nomad.png`,
    description: `組織の枠には収まりきらない魂を持っています。あらゆる拘束はあなたのパフォーマンスを低下させます。自分の興味がある分野への集中力は他の追随を許しません。`,
    toxicEnvironment: "9時5時の定時出社、スーツ着用必須、古い慣習の職場。",
    fateWarning: "鳥籠の中で翼を広げることはできません。もし今時計を気にしながら仕事をしているなら、あなたは人生という大切な資産を浪費しています。",
    recommendedActions: [
      { label: "フリーランス・独立", description: "場所を選ばず自らが看板に。", url: "https://example.com/affiliate13" },
      { label: "クリエイティブ専門職", description: "感性をアウトプットし価値を生む。", url: "https://example.com/affiliate14" },
      { label: "多拠点ノマドワーク", description: "旅しながら好きな時に働く。", url: "https://example.com/affiliate15" }
    ],
    colorTheme: "from-violet-500 to-purple-700",
  }
};

export const CONCEPT_TEXT = `【運営理念：才能の最適配置】

「なぜ、優秀な人間が、組織の中で腐ってしまうのか？」

私たちBizPowerプロジェクトは、この問いから始まりました。
日本のビジネス現場において、個人の能力不足ではなく、「環境とのミスマッチ」によって才能が殺されているケースは後を絶ちません。

論理的な戦略家が、感情論ばかりの職場で疲弊する。
革新的なアイデアマンが、前例踏襲の組織で沈黙する。

これは個人の不幸であると同時に、社会的な損失です。

私たちは、AI技術と深層心理学を掛け合わせることで、あなたの「ビジネス戦闘力」を客観的に可視化します。
精神論や根性論ではなく、データに基づいた「勝ちやすい戦場（適職環境）」を提示すること。
そして、あなたが本来のパフォーマンスを発揮できる場所へ送り出すこと。

それが、当サービスの唯一の目的です。

あなたの人生という貴重なリソースを、無駄な場所で浪費しないでください。
BizPowerは、あなたが「勝てる場所」を見つけるための羅針盤であり続けます。

BizPower 運営事務局
`;

export const PRIVACY_POLICY = `プライバシーポリシー

本ウェブサイト（以下、「当サイト」）は、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシーを定めます。

1. 個人情報の収集
当サイトは、利用者のアクセス時に以下の情報を自動的に収集することがあります。
・端末情報、ブラウザの種類、IPアドレス、クッキー（Cookie）情報
・当診断サービスの回答データ（個人を特定しない統計情報として扱います）

2. 利用目的
収集した情報は、以下の目的で利用します。
・診断サービスの提供および改善
・ユーザーの特性に合わせた最適な広告（アフィリエイト広告等）の配信
・不正アクセスの防止およびセキュリティの維持

3. 第三者への提供および広告配信
当サイトでは、第三者配信広告サービス（Googleアドセンス、Amazonアソシエイト、バリューコマース、A8.net、アクセストレード等）を利用しています。これらの事業者は、ユーザーの興味に応じた広告を表示するため、Cookieを使用することがあります。
また、アクセス解析のためにGoogleアナリティクスを利用しており、これらにより収集されるデータは各社のプライバシーポリシーに基づいて管理されます。

4. 免責事項
当サイトの診断結果および掲載情報は、その正確性や成功を保証するものではありません。当サイトの利用により生じた直接的・間接的な損害について、当サイトは一切の責任を負いません。リンク先の外部サイトにおけるトラブルについても同様です。

5. お問い合わせ
ポリシーに関する変更は当ページへの掲載をもって効力を生じるものとします。
`;

export const DISCLAIMER = `利用規約

第1条（総則）
本規約は、BizPower（以下、「本サービス」）の利用条件を定めるものです。利用者は、本規約に同意した上で本サービスを利用するものとします。

第2条（サービス内容）
本サービスは、独自のアルゴリズムに基づき利用者のビジネス特性を分析するエンターテインメント・ツールです。結果の妥当性やキャリアにおける絶対的な成果を保証するものではありません。

第3条（禁止事項）
利用者は、以下の行為を禁止されます。
・本サービスの内容の無断転載、商用利用、または解析行為。
・本サービスの運営を妨げるネットワーク攻撃。
・法令、公序良俗に反する行為。

第4条（知的財産権）
本サービスに関する一切の権利は、運営者またはそのライセンサーに帰属します。

第5条（免責）
・本サービスに起因して利用者に生じた損害について、運営者は一切の賠償責任を負いません。
・アフィリエイトリンク先の商品、サービスに関する契約は利用者と提供者との間で行われるものであり、運営者は関与いたしません。

第6条（準拠法・管轄）
本規約の準拠法は日本法とし、本サービスに関する紛争は運営者の所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。
`;
