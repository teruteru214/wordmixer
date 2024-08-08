import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

const user = {
	name: "Test User",
	email: "testuser@example.com",
	password: "password123",
	subscription: UserRole.FREE,
};

const levels = ["Very Easy", "Easy", "Medium", "Hard", "Very Hard"];

const texts: {
	[key in (typeof levels)[number]]: {
		en: string;
		ja: string;
		theme: string;
		words?: string[];
	}[];
} = {
	"Very Easy": [
		{
			en: "Study every day to improve your skills.",
			ja: "毎日勉強してスキルを向上させよう。",
			words: ["study", "improve", "skills"],
			theme: "Education",
		},
		{
			en: "Practice makes perfect.",
			ja: "練習が完璧を作る。",
			words: ["practice", "perfect"],
			theme: "Education",
		},
		{
			en: "Drink plenty of water.",
			ja: "たくさんの水を飲みましょう。",
			words: ["drink", "water"],
			theme: "Health",
		},
		{
			en: "Eat healthy food.",
			ja: "健康的な食べ物を食べましょう。",
			words: ["eat", "healthy", "food"],
			theme: "Health",
		},
		{
			en: "Exercise is good for health.",
			ja: "運動は健康に良いです。",
			words: ["exercise", "health"],
			theme: "Health",
		},
		{
			en: "Sleep well every night.",
			ja: "毎晩よく寝ましょう。",
			words: ["sleep", "well", "night"],
			theme: "Health",
		},
		{
			en: "Read books to gain knowledge.",
			ja: "知識を得るために本を読みましょう。",
			words: ["read", "books", "knowledge"],
			theme: "Education",
		},
		{
			en: "Write notes to remember things.",
			ja: "物事を覚えるためにメモを書きましょう。",
			words: ["write", "notes", "remember"],
			theme: "Education",
		},
		{
			en: "Listen to music to relax.",
			ja: "リラックスするために音楽を聴きましょう。",
			words: ["listen", "music", "relax"],
			theme: "Entertainment",
		},
		{
			en: "Help others when you can.",
			ja: "できるときに他の人を助けましょう。",
			words: ["help", "others"],
			theme: "Daily Life",
		},
	],
	Easy: [
		{
			en: "Studying every day helps to improve your skills significantly over time. This practice is essential for personal growth and can lead to great success in your career and personal life.",
			ja: "毎日勉強することで、時間をかけてスキルを大幅に向上させることができます。この習慣は個人の成長に不可欠であり、キャリアや個人の生活で大きな成功につながる可能性があります。",
			words: ["studying", "improve", "skills", "personal", "growth"],
			theme: "Education",
		},
		{
			en: "Practicing regularly is the key to mastering any skill. It not only helps you become better but also builds discipline and perseverance, which are crucial for long-term success.",
			ja: "定期的に練習することがどんなスキルを習得する鍵です。それは上達を助けるだけでなく、規律と忍耐力も養い、長期的な成功にとって非常に重要です。",
			words: [
				"practicing",
				"regularly",
				"mastering",
				"discipline",
				"perseverance",
			],
			theme: "Education",
		},
		{
			en: "Drinking enough water each day is essential for maintaining good health. It keeps your body hydrated, supports overall well-being, and helps your organs function properly.",
			ja: "毎日十分な水を飲むことは健康を維持するために不可欠です。体を水分で満たし、全体的な幸福をサポートし、臓器が正常に機能するのを助けます。",
			words: ["drinking", "water", "health", "well being", "hydrated"],
			theme: "Health",
		},
		{
			en: "Eating a balanced diet provides your body with the necessary nutrients it needs to function properly. This includes a variety of foods that supply proteins, vitamins, and minerals.",
			ja: "バランスの取れた食事は、体が正常に機能するために必要な栄養素を供給します。これには、タンパク質、ビタミン、ミネラルを供給するさまざまな食品が含まれます。",
			words: ["eating", "balanced", "diet", "nutrients", "proteins"],
			theme: "Health",
		},
		{
			en: "Regular exercise not only improves your physical health but also enhances your mental well-being. It helps reduce stress, boosts your mood, and increases overall energy levels.",
			ja: "定期的な運動は身体の健康を向上させるだけでなく、精神的な健康も向上させます。運動はストレスを軽減し、気分を高め、全体的なエネルギーレベルを増加させます。",
			words: ["exercise", "physical", "health", "mental", "well being"],
			theme: "Health",
		},
		{
			en: "Getting enough sleep every night is important for your overall health. It helps your body recover from the day's activities, improves concentration, and supports a healthy immune system.",
			ja: "毎晩十分な睡眠をとることは全体的な健康に重要です。睡眠は一日の活動から体を回復させ、集中力を向上させ、健康な免疫系をサポートします。",
			words: ["sleep", "health", "recover", "concentration", "immune"],
			theme: "Health",
		},
		{
			en: "Reading books regularly helps to expand your knowledge and vocabulary. It also improves your cognitive skills and can be a great way to relax and unwind after a long day.",
			ja: "定期的に本を読むことで知識と語彙が広がります。また、認知スキルを向上させ、長い一日の後にリラックスしてくつろぐための素晴らしい方法となります。",
			words: ["reading", "books", "knowledge", "vocabulary", "cognitive"],
			theme: "Education",
		},
		{
			en: "Writing down important information helps you remember it better. It also keeps you organized and allows you to easily review your notes whenever needed.",
			ja: "重要な情報を書き留めることで、よりよく覚えることができます。また、整理整頓を保ち、必要に応じて簡単にメモを見直すことができます。",
			words: ["writing", "information", "remember", "organized", "review"],
			theme: "Education",
		},
		{
			en: "Listening to music can be a great way to relax and unwind after a long day of work. It helps reduce stress and anxiety, providing a sense of calm and peace.",
			ja: "音楽を聴くことは、長い仕事の一日の後にリラックスしてくつろぐための素晴らしい方法です。音楽はストレスや不安を軽減し、静けさと平和を提供します。",
			words: ["listening", "music", "relax", "unwind", "stress"],
			theme: "Entertainment",
		},
		{
			en: "Helping others in need can provide a sense of fulfillment and purpose in your life. It builds empathy and strengthens your connection to the community.",
			ja: "困っている人を助けることで、充実感と目的意識が得られます。共感を養い、コミュニティとのつながりを強化します。",
			words: ["helping", "others", "fulfillment", "purpose", "empathy"],
			theme: "Daily Life",
		},
	],
	Medium: [
		{
			en: "The rapid advancement of technology has revolutionized the way we live and work, bringing about significant changes in various industries. As technology continues to evolve, it is crucial for individuals to stay updated with the latest developments.",
			ja: "テクノロジーの急速な進歩は、私たちの生活と仕事の仕方を革命的に変え、さまざまな業界に大きな変化をもたらしました。テクノロジーが進化し続ける中で、最新の開発についていくことが重要です。",
			words: [
				"technology",
				"advancement",
				"revolutionized",
				"industries",
				"developments",
			],
			theme: "Technology",
		},
		{
			en: "Effective time management is essential for balancing work responsibilities and personal life commitments. By prioritizing tasks and setting realistic goals, individuals can achieve a better work-life balance and reduce stress.",
			ja: "効果的な時間管理は、仕事の責任と個人の生活のコミットメントのバランスを取るために不可欠です。タスクに優先順位を付け、現実的な目標を設定することで、より良いワークライフバランスを達成し、ストレスを軽減できます。",
			words: [
				"time management",
				"balancing",
				"responsibilities",
				"commitments",
				"stress",
			],
			theme: "Business",
		},
		{
			en: "The implementation of sustainable practices can significantly reduce environmental impact and promote long-term ecological balance. Businesses and individuals alike must adopt eco-friendly habits to ensure a sustainable future.",
			ja: "持続可能な慣行の導入は、環境への影響を大幅に削減し、長期的な生態系のバランスを促進することができます。企業と個人の両方が、持続可能な未来を確保するためにエコフレンドリーな習慣を採用する必要があります。",
			words: [
				"sustainable",
				"practices",
				"environmental",
				"impact",
				"eco-friendly",
			],
			theme: "Environment",
		},
		{
			en: "Developing critical thinking skills is crucial for academic success and informed decision-making in everyday life. It involves analyzing information, evaluating evidence, and making reasoned conclusions.",
			ja: "批判的思考スキルの開発は、学業の成功と日常生活における情報に基づいた意思決定にとって非常に重要です。情報を分析し、証拠を評価し、合理的な結論を出すことを含みます。",
			words: [
				"critical thinking",
				"academic",
				"success",
				"decision making",
				"evidence",
			],
			theme: "Education",
		},
		{
			en: "Advancements in medical technology have improved patient outcomes and expanded treatment options. These innovations have led to better diagnosis, more effective treatments, and improved quality of life for patients.",
			ja: "医療技術の進歩は、患者の治療結果を改善し、治療の選択肢を拡大しました。これらの革新により、より良い診断、より効果的な治療、そして患者の生活の質の向上が実現しました。",
			words: [
				"medical technology",
				"patient outcomes",
				"treatment options",
				"diagnosis",
				"quality of life",
			],
			theme: "Health",
		},
		{
			en: "Cultural exchange programs provide valuable opportunities for students to broaden their horizons and gain global perspectives. By interacting with people from different cultures, students can develop a deeper understanding of the world.",
			ja: "文化交流プログラムは、学生が視野を広げ、グローバルな視点を得るための貴重な機会を提供します。異なる文化の人々と交流することで、学生は世界についてより深く理解することができます。",
			words: [
				"cultural exchange",
				"opportunities",
				"broaden",
				"horizons",
				"global perspectives",
			],
			theme: "Education",
		},
		{
			en: "The study of history helps us understand the present and shape the future by learning from past events. It teaches us about the successes and failures of previous generations, providing valuable lessons for today's world.",
			ja: "歴史の研究は、過去の出来事から学ぶことで、現在を理解し、未来を形作るのに役立ちます。それは、前世代の成功と失敗について教えてくれ、今日の世界にとって貴重な教訓を提供します。",
			words: [
				"history",
				"present",
				"future",
				"past events",
				"valuable lessons",
			],
			theme: "History",
		},
		{
			en: "Creative problem-solving involves thinking outside the box and exploring innovative solutions. This approach encourages individuals to look at challenges from different perspectives and come up with unique ideas.",
			ja: "創造的な問題解決は、枠を超えて考え、革新的な解決策を探ることを伴います。このアプローチは、個人が異なる視点から課題を見て、ユニークなアイデアを思いつくことを奨励します。",
			words: [
				"creative",
				"problem solving",
				"innovative",
				"solutions",
				"unique ideas",
			],
			theme: "Business",
		},
		{
			en: "Regular physical activity and a nutritious diet are key components of a healthy lifestyle. These habits not only improve physical health but also enhance mental well-being and overall quality of life.",
			ja: "定期的な運動と栄養のある食事は、健康的なライフスタイルの重要な要素です。これらの習慣は、身体の健康を向上させるだけでなく、精神的な健康と全体的な生活の質を向上させます。",
			words: [
				"physical activity",
				"nutritious diet",
				"healthy lifestyle",
				"mental well being",
				"quality of life",
			],
			theme: "Health",
		},
		{
			en: "The effective use of digital tools can enhance productivity and streamline workflow processes. By leveraging technology, individuals and businesses can achieve greater efficiency and better results.",
			ja: "デジタルツールの効果的な使用は、生産性を向上させ、ワークフローのプロセスを効率化することができます。テクノロジーを活用することで、個人や企業はより高い効率性とより良い結果を達成できます。",
			words: [
				"digital tools",
				"productivity",
				"workflow",
				"technology",
				"efficiency",
			],
			theme: "Technology",
		},
	],
	Hard: [
		{
			en: "The intricate relationship between economic growth and environmental sustainability poses a significant challenge for policymakers. Balancing the demands of economic development with the need to protect natural resources requires innovative solutions and a commitment to long-term planning. This involves not only regulatory measures but also fostering public awareness and encouraging sustainable practices at all levels of society.",
			ja: "経済成長と環境の持続可能性の複雑な関係は、政策立案者にとって重大な課題を提起しています。経済発展の要求と自然資源の保護の必要性をバランスさせるには、革新的な解決策と長期的な計画へのコミットメントが必要です。これには、規制措置だけでなく、公共の認識を高め、社会のすべてのレベルで持続可能な慣行を奨励することも含まれます。",
			words: [
				"economic growth",
				"environmental sustainability",
				"policymakers",
				"natural resources",
				"long-term planning",
			],
			theme: "Environment",
		},
		{
			en: "Effective leadership requires the ability to inspire and motivate team members while also providing clear direction and support. Leaders must navigate complex organizational dynamics and make strategic decisions that align with the long-term goals of the organization. This includes managing conflicts, fostering collaboration, and creating a culture of continuous improvement.",
			ja: "効果的なリーダーシップは、チームメンバーを鼓舞し、動機付ける能力と、明確な方向性とサポートを提供する能力を必要とします。リーダーは、複雑な組織のダイナミクスをナビゲートし、組織の長期目標に一致する戦略的な決定を下さなければなりません。これには、対立の管理、コラボレーションの促進、継続的改善の文化の創造が含まれます。",
			words: ["leadership", "inspire", "motivate", "direction", "support"],
			theme: "Business",
		},
		{
			en: "The integration of artificial intelligence into various sectors has the potential to drive innovation and efficiency. However, it also raises ethical concerns regarding privacy, security, and the displacement of human workers. Addressing these challenges requires a comprehensive approach that includes regulatory oversight, ethical guidelines, and ongoing public discourse.",
			ja: "人工知能のさまざまな分野への統合は、イノベーションと効率を促進する可能性を秘めています。しかし、それはプライバシー、セキュリティ、および人間の労働者の移転に関する倫理的懸念も引き起こします。これらの課題に対処するには、規制の監視、倫理的ガイドライン、および継続的な公共の議論を含む包括的なアプローチが必要です。",
			words: [
				"artificial intelligence",
				"innovation",
				"efficiency",
				"ethical concerns",
				"privacy",
			],
			theme: "Technology",
		},
		{
			en: "The exploration of space not only expands our understanding of the universe but also drives technological advancements. Space missions have led to the development of new materials, improved telecommunications, and innovative solutions to engineering challenges. These advancements have applications beyond space exploration, benefiting various industries on Earth.",
			ja: "宇宙の探査は、宇宙に対する理解を深めるだけでなく、技術の進歩も促進します。宇宙ミッションは、新素材の開発、通信の改善、および工学的課題に対する革新的な解決策につながりました。これらの進歩は、宇宙探査を超えて、地球上のさまざまな産業に利益をもたらします。",
			words: [
				"exploration",
				"space",
				"universe",
				"technological advancements",
				"innovative solutions",
			],
			theme: "Science",
		},
		{
			en: "The study of ancient civilizations provides insights into the cultural and technological achievements of early societies. By examining artifacts, historical records, and architectural remains, researchers can reconstruct the lifestyles, beliefs, and innovations of past cultures. This knowledge contributes to our understanding of human development and cultural evolution.",
			ja: "古代文明の研究は、初期の社会の文化的および技術的な成果についての洞察を提供します。研究者は、遺物、歴史記録、および建築の遺跡を調査することで、過去の文化の生活様式、信念、および革新を再構築することができます。この知識は、人類の発展と文化の進化についての理解に貢献します。",
			words: [
				"ancient civilizations",
				"cultural achievements",
				"technological achievements",
				"artifacts",
				"historical records",
			],
			theme: "History",
		},
		{
			en: "Implementing effective cybersecurity measures is essential for protecting sensitive data and maintaining privacy. With the increasing prevalence of cyber threats, organizations must adopt comprehensive strategies that include encryption, access controls, and continuous monitoring. Educating employees about security best practices is also crucial to mitigating risks.",
			ja: "効果的なサイバーセキュリティ対策の実施は、機密データを保護し、プライバシーを維持するために不可欠です。サイバー脅威の増加に伴い、組織は暗号化、アクセス制御、および継続的な監視を含む包括的な戦略を採用する必要があります。従業員にセキュリティのベストプラクティスについて教育することも、リスクを軽減するために重要です。",
			words: [
				"cybersecurity",
				"sensitive data",
				"privacy",
				"encryption",
				"access controls",
			],
			theme: "Technology",
		},
		{
			en: "The development of renewable energy sources is crucial for reducing dependence on fossil fuels and mitigating climate change. Innovations in solar, wind, and hydroelectric power have made renewable energy more accessible and cost-effective. Governments and industries must work together to promote the adoption of sustainable energy solutions.",
			ja: "再生可能エネルギー源の開発は、化石燃料への依存を減らし、気候変動を緩和するために非常に重要です。太陽光、風力、水力発電の革新により、再生可能エネルギーはよりアクセスしやすく、コスト効率が高くなりました。政府と産業界は、持続可能なエネルギーソリューションの採用を促進するために協力する必要があります。",
			words: [
				"renewable energy",
				"fossil fuels",
				"climate change",
				"solar power",
				"wind power",
			],
			theme: "Environment",
		},
		{
			en: "Advancements in genetic research have opened new avenues for the treatment of previously incurable diseases. Gene therapy, personalized medicine, and CRISPR technology offer promising possibilities for addressing genetic disorders and improving patient outcomes. These breakthroughs highlight the importance of continued investment in scientific research.",
			ja: "遺伝子研究の進歩は、これまで治療不可能だった病気の治療に新しい道を開きました。遺伝子治療、個別化医療、およびCRISPR技術は、遺伝子疾患に対処し、患者の治療結果を改善するための有望な可能性を提供します。これらのブレークスルーは、科学研究への継続的な投資の重要性を強調しています。",
			words: [
				"genetic research",
				"gene therapy",
				"personalized medicine",
				"CRISPR",
				"patient outcomes",
			],
			theme: "Health",
		},
		{
			en: "The role of education in fostering innovation and creativity cannot be overstated. Educational institutions must provide students with the tools and opportunities to think critically, solve problems, and develop new ideas. By encouraging a culture of curiosity and experimentation, schools can help cultivate the next generation of innovators.",
			ja: "イノベーションと創造性を育む教育の役割は、いくら強調してもしすぎることはありません。教育機関は、学生が批判的に考え、問題を解決し、新しいアイデアを発展させるためのツールと機会を提供する必要があります。好奇心と実験の文化を奨励することで、学校は次世代の革新者を育成するのに役立ちます。",
			words: [
				"education",
				"innovation",
				"creativity",
				"critical thinking",
				"new ideas",
			],
			theme: "Education",
		},
		{
			en: "The development of renewable energy technologies is critical for reducing carbon emissions and combating climate change. These technologies harness natural resources such as sunlight, wind, and water to generate electricity, providing a sustainable alternative to fossil fuels. The transition to renewable energy requires significant investment and policy support, but it promises long-term environmental and economic benefits.",
			ja: "再生可能エネルギー技術の開発は、炭素排出を削減し、気候変動と戦うために重要です。これらの技術は、太陽光、風、水などの自然資源を利用して電力を生成し、化石燃料に代わる持続可能な選択肢を提供します。再生可能エネルギーへの移行には大規模な投資と政策支援が必要ですが、長期的な環境および経済的利益を約束します。",
			words: [
				"renewable energy",
				"carbon emissions",
				"climate change",
				"sustainable",
				"fossil fuels",
			],
			theme: "Environment",
		},
	],
	"Very Hard": [
		{
			en: "The interplay of cultural, social, and political factors influences historical events and their interpretations. Understanding this complex web of influences requires a multidisciplinary approach, combining insights from history, sociology, political science, and anthropology. By analyzing these diverse perspectives, we can gain a comprehensive understanding of the forces that shape human history and appreciate the interconnectedness of past events and current realities.",
			ja: "文化的、社会的、政治的要因の相互作用が、歴史的な出来事とその解釈に影響を与えます。この複雑な影響の網を理解するには、歴史学、社会学、政治学、人類学からの洞察を組み合わせた学際的なアプローチが必要です。これらの多様な視点を分析することで、人類の歴史を形作る力を包括的に理解し、過去の出来事と現在の現実との相互関係を評価することができます。",
			words: [
				"cultural factors",
				"social factors",
				"political factors",
				"historical events",
				"multidisciplinary approach",
			],
			theme: "History",
		},
		{
			en: "In the realm of artificial intelligence, machine learning algorithms are revolutionizing industries by automating complex tasks and analyzing vast amounts of data with unprecedented accuracy. These algorithms enable predictive analytics, enhancing decision-making processes in fields such as healthcare, finance, and transportation. However, the ethical implications and potential biases in AI systems necessitate rigorous oversight and continuous evaluation to ensure fair and responsible use.",
			ja: "人工知能の領域では、機械学習アルゴリズムが複雑なタスクを自動化し、前例のない精度で膨大なデータを分析することで、産業を変革しています。これらのアルゴリズムは予測分析を可能にし、医療、金融、交通などの分野で意思決定プロセスを強化します。しかし、AIシステムの倫理的な影響と潜在的な偏見は、公正かつ責任ある使用を確保するために厳格な監視と継続的な評価を必要とします。",
			words: [
				"artificial intelligence",
				"machine learning",
				"automating tasks",
				"predictive analytics",
				"ethical implications",
			],
			theme: "Technology",
		},
		{
			en: "The intricate relationship between physical exercise and mental health has been a subject of extensive research. Regular physical activity is known to reduce symptoms of depression and anxiety, improve mood, and enhance cognitive function. The physiological mechanisms underlying these benefits include the release of endorphins and the reduction of inflammation. Moreover, exercise can serve as a preventive measure, promoting overall well-being and resilience against mental health disorders.",
			ja: "運動とメンタルヘルスの複雑な関係は、広範な研究の対象となっています。定期的な運動は、うつ病や不安の症状を軽減し、気分を改善し、認知機能を向上させることが知られています。これらの利益の根底にある生理的メカニズムには、エンドルフィンの放出と炎症の軽減が含まれます。さらに、運動は全体的な健康促進とメンタルヘルス障害に対する予防策としても役立ちます。",
			words: [
				"physical exercise",
				"mental health",
				"depression",
				"anxiety",
				"cognitive function",
			],
			theme: "Health",
		},
		{
			en: "The preservation of cultural heritage sites is essential for maintaining the historical and cultural fabric of societies. These sites, ranging from ancient ruins to historic buildings, provide insights into past civilizations and foster a sense of identity and continuity. Preservation efforts often involve complex restoration techniques and require collaboration between governments, organizations, and local communities to balance conservation with modern development.",
			ja: "文化遺産の保存は、社会の歴史的および文化的な構造を維持するために不可欠です。古代の遺跡から歴史的建造物まで、これらのサイトは過去の文明に関する洞察を提供し、アイデンティティと継続性の感覚を育みます。保存努力にはしばしば複雑な修復技術が関わり、保全と現代の発展とのバランスを取るために政府、組織、地域社会の協力が必要です。",
			words: [
				"cultural heritage",
				"historical fabric",
				"ancient ruins",
				"historic buildings",
				"preservation efforts",
			],
			theme: "Art and Literature",
		},
		{
			en: "Advancements in biotechnology are paving the way for groundbreaking treatments and therapies in medicine. Techniques such as CRISPR gene editing allow for precise modifications of genetic material, offering potential cures for genetic disorders and chronic diseases. The ethical considerations surrounding these technologies, including the risks of unintended consequences and the debate over human enhancement, require careful regulation and public discourse to navigate the future of biomedicine responsibly.",
			ja: "バイオテクノロジーの進歩は、医療における画期的な治療法と治療法の道を開いています。CRISPR遺伝子編集などの技術は、遺伝物質の正確な修正を可能にし、遺伝性疾患や慢性疾患の潜在的な治療法を提供します。これらの技術に関する倫理的な考慮事項には、意図しない結果のリスクや人間の強化に関する議論が含まれ、将来のバイオメディシンを責任を持って進めるためには慎重な規制と公の議論が必要です。",
			words: [
				"biotechnology",
				"gene editing",
				"genetic disorders",
				"ethical considerations",
			],
			theme: "Health",
		},
		{
			en: "The impact of climate change on global ecosystems is profound, affecting biodiversity, weather patterns, and sea levels. Mitigating these effects requires international cooperation and comprehensive policies aimed at reducing greenhouse gas emissions, promoting sustainable practices, and protecting vulnerable species and habitats. The transition to a low-carbon economy involves not only technological innovations but also societal shifts towards more sustainable lifestyles and consumption patterns.",
			ja: "気候変動が地球規模の生態系に与える影響は深刻であり、生物多様性、天候パターン、海面に影響を与えます。これらの影響を軽減するには、国際協力と温室効果ガスの排出削減、持続可能な慣行の促進、脆弱な種と生息地の保護を目的とした包括的な政策が必要です。低炭素経済への移行には、技術革新だけでなく、持続可能なライフスタイルと消費パターンへの社会的変化も含まれます。",
			words: [
				"climate change",
				"global ecosystems",
				"biodiversity",
				"greenhouse gas emissions",
				"sustainable practices",
			],
			theme: "Environment",
		},
		{
			en: "The study of quantum mechanics has revolutionized our understanding of the fundamental nature of the universe. Concepts such as wave-particle duality, superposition, and entanglement challenge classical physics and offer new insights into the behavior of particles at the atomic and subatomic levels. These principles are not only crucial for theoretical physics but also have practical applications in developing quantum computing, which promises unprecedented computational power for solving complex problems.",
			ja: "量子力学の研究は、宇宙の基本的な性質に対する理解を革命的に変えました。波動-粒子二重性、重ね合わせ、エンタングルメントなどの概念は古典物理学に挑戦し、原子および亜原子レベルでの粒子の振る舞いに新たな洞察を提供します。これらの原理は理論物理学にとって重要であるだけでなく、複雑な問題を解決するための前例のない計算能力を約束する量子コンピューティングの開発にも実用的な応用があります。",
			words: [
				"quantum mechanics",
				"wave-particle duality",
				"superposition",
				"entanglement",
				"quantum computing",
			],
			theme: "Technology",
		},
		{
			en: "In contemporary art, the use of mixed media has become increasingly prevalent, allowing artists to explore and express complex themes in innovative ways. By combining various materials and techniques, artists can create multifaceted works that challenge traditional boundaries and provoke thought. This approach not only expands the possibilities of artistic expression but also reflects the diverse and interconnected nature of modern life.",
			ja: "現代美術において、ミクストメディアの使用がますます一般的になり、アーティストは複雑なテーマを革新的な方法で探求し表現することができます。さまざまな素材と技法を組み合わせることで、アーティストは伝統的な境界を超え、思考を刺激する多面的な作品を作り出すことができます。このアプローチは、芸術表現の可能性を広げるだけでなく、現代の生活の多様で相互に関連する性質を反映しています。",
			words: [
				"contemporary art",
				"mixed media",
				"innovative ways",
				"complex themes",
				"artistic expression",
			],
			theme: "Art and Literature",
		},
		{
			en: "The rapid urbanization of the world's population presents both opportunities and challenges for sustainable development. Cities are centers of economic activity and innovation, driving growth and creating jobs. However, they also face significant issues such as pollution, infrastructure strain, and social inequality. To achieve sustainable urban development, it is essential to implement policies that balance economic growth with environmental protection and social inclusion.",
			ja: "世界の人口の急速な都市化は、持続可能な発展にとって機会と課題の両方をもたらします。都市は経済活動と革新の中心であり、成長を促進し、雇用を創出します。しかし、汚染、インフラの過剰負担、社会的不平等などの重要な問題にも直面しています。持続可能な都市開発を達成するためには、経済成長と環境保護、社会的包摂をバランスさせる政策の実施が不可欠です。",
			words: [
				"urbanization",
				"sustainable development",
				"economic activity",
				"pollution",
				"social inequality",
			],
			theme: "Daily Life",
		},
		{
			en: "Historical events are often shaped by a complex interplay of cultural, social, and political factors. Understanding these influences requires a multidisciplinary approach, drawing insights from history, sociology, political science, and anthropology. By analyzing these diverse perspectives, we can gain a comprehensive understanding of the forces that have shaped human history and continue to influence contemporary society.",
			ja: "歴史的な出来事は、多くの場合、文化的、社会的、政治的要因の複雑な相互作用によって形成されます。これらの影響を理解するためには、歴史学、社会学、政治学、人類学の洞察を引き出す学際的なアプローチが必要です。これらの多様な視点を分析することで、人類の歴史を形成してきた力を包括的に理解し、現代社会にも影響を与え続ける要因を理解することができます。",
			words: [
				"historical events",
				"cultural factors",
				"social factors",
				"political factors",
				"multidisciplinary approach",
			],
			theme: "History",
		},
	],
};

async function main() {
	const createdUser = await prisma.user.upsert({
		where: { email: user.email },
		update: {},
		create: {
			name: user.name,
			email: user.email,
			password: user.password,
			subscription: user.subscription,
		},
	});

	for (const level of levels) {
		const levelTexts = texts[level];

		const createdLevel = await prisma.level.upsert({
			where: { level },
			update: {},
			create: { level },
		});

		for (const text of levelTexts) {
			const createdTheme = await prisma.theme.upsert({
				where: { theme: text.theme },
				update: {},
				create: { theme: text.theme },
			});

			const { en, ja, words } = text;

			const createdText = await prisma.text.create({
				data: {
					userId: createdUser.id,
					en,
					ja,
				},
			});

			await prisma.textLevel.create({
				data: {
					textId: createdText.id,
					levelId: createdLevel.id,
				},
			});

			await prisma.textTheme.create({
				data: {
					textId: createdText.id,
					themeId: createdTheme.id,
				},
			});

			if (words) {
				for (const word of words) {
					const createdWord = await prisma.word.upsert({
						where: { word },
						update: {},
						create: { word },
					});

					await prisma.textWord.create({
						data: {
							textId: createdText.id,
							wordId: createdWord.id,
						},
					});
				}
			}
		}
	}

	console.log("Sample data inserted.");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
