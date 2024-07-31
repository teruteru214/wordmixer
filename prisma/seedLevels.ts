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
			words: ["drinking", "water", "health", "well-being", "hydrated"],
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
			words: ["exercise", "physical", "health", "mental", "well-being"],
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
			theme: "Technology",
		},
		{
			en: "Effective time management is essential for balancing work responsibilities and personal life commitments. By prioritizing tasks and setting realistic goals, individuals can achieve a better work-life balance and reduce stress.",
			ja: "効果的な時間管理は、仕事の責任と個人の生活のコミットメントのバランスを取るために不可欠です。タスクに優先順位を付け、現実的な目標を設定することで、より良いワークライフバランスを達成し、ストレスを軽減できます。",
			theme: "Business",
		},
		{
			en: "The implementation of sustainable practices can significantly reduce environmental impact and promote long-term ecological balance. Businesses and individuals alike must adopt eco-friendly habits to ensure a sustainable future.",
			ja: "持続可能な慣行の導入は、環境への影響を大幅に削減し、長期的な生態系のバランスを促進することができます。企業と個人の両方が、持続可能な未来を確保するためにエコフレンドリーな習慣を採用する必要があります。",
			theme: "Environment",
		},
		{
			en: "Developing critical thinking skills is crucial for academic success and informed decision-making in everyday life. It involves analyzing information, evaluating evidence, and making reasoned conclusions.",
			ja: "批判的思考スキルの開発は、学業の成功と日常生活における情報に基づいた意思決定にとって非常に重要です。情報を分析し、証拠を評価し、合理的な結論を出すことを含みます。",
			theme: "Education",
		},
		{
			en: "Advancements in medical technology have improved patient outcomes and expanded treatment options. These innovations have led to better diagnosis, more effective treatments, and improved quality of life for patients.",
			ja: "医療技術の進歩は、患者の治療結果を改善し、治療の選択肢を拡大しました。これらの革新により、より良い診断、より効果的な治療、そして患者の生活の質の向上が実現しました。",
			theme: "Health",
		},
		{
			en: "Cultural exchange programs provide valuable opportunities for students to broaden their horizons and gain global perspectives. By interacting with people from different cultures, students can develop a deeper understanding of the world.",
			ja: "文化交流プログラムは、学生が視野を広げ、グローバルな視点を得るための貴重な機会を提供します。異なる文化の人々と交流することで、学生は世界についてより深く理解することができます。",
			theme: "Education",
		},
		{
			en: "The study of history helps us understand the present and shape the future by learning from past events. It teaches us about the successes and failures of previous generations, providing valuable lessons for today's world.",
			ja: "歴史の研究は、過去の出来事から学ぶことで、現在を理解し、未来を形作るのに役立ちます。それは、前世代の成功と失敗について教えてくれ、今日の世界にとって貴重な教訓を提供します。",
			theme: "History",
		},
		{
			en: "Creative problem-solving involves thinking outside the box and exploring innovative solutions. This approach encourages individuals to look at challenges from different perspectives and come up with unique ideas.",
			ja: "創造的な問題解決は、枠を超えて考え、革新的な解決策を探ることを伴います。このアプローチは、個人が異なる視点から課題を見て、ユニークなアイデアを思いつくことを奨励します。",
			theme: "Business",
		},
		{
			en: "Regular physical activity and a nutritious diet are key components of a healthy lifestyle. These habits not only improve physical health but also enhance mental well-being and overall quality of life.",
			ja: "定期的な運動と栄養のある食事は、健康的なライフスタイルの重要な要素です。これらの習慣は、身体の健康を向上させるだけでなく、精神的な健康と全体的な生活の質を向上させます。",
			theme: "Health",
		},
		{
			en: "The effective use of digital tools can enhance productivity and streamline workflow processes. By leveraging technology, individuals and businesses can achieve greater efficiency and better results.",
			ja: "デジタルツールの効果的な使用は、生産性を向上させ、ワークフローのプロセスを効率化することができます。テクノロジーを活用することで、個人や企業はより高い効率性とより良い結果を達成できます。",
			theme: "Technology",
		},
	],
	Hard: [
		{
			en: "The intricate relationship between economic growth and environmental sustainability poses a significant challenge for policymakers. Balancing the demands of economic development with the need to protect natural resources requires innovative solutions and a commitment to long-term planning. This involves not only regulatory measures but also fostering public awareness and encouraging sustainable practices at all levels of society.",
			ja: "経済成長と環境の持続可能性の複雑な関係は、政策立案者にとって重大な課題を提起しています。経済発展の要求と自然資源の保護の必要性をバランスさせるには、革新的な解決策と長期的な計画へのコミットメントが必要です。これには、規制措置だけでなく、公共の認識を高め、社会のすべてのレベルで持続可能な慣行を奨励することも含まれます。",
			theme: "Environment",
		},
		{
			en: "Effective leadership requires the ability to inspire and motivate team members while also providing clear direction and support. Leaders must navigate complex organizational dynamics and make strategic decisions that align with the long-term goals of the organization. This includes managing conflicts, fostering collaboration, and creating a culture of continuous improvement.",
			ja: "効果的なリーダーシップは、チームメンバーを鼓舞し、動機付ける能力と、明確な方向性とサポートを提供する能力を必要とします。リーダーは、複雑な組織のダイナミクスをナビゲートし、組織の長期目標に一致する戦略的な決定を下さなければなりません。これには、対立の管理、コラボレーションの促進、継続的改善の文化の創造が含まれます。",
			theme: "Business",
		},
		{
			en: "The integration of artificial intelligence into various sectors has the potential to drive innovation and efficiency. However, it also raises ethical concerns regarding privacy, security, and the displacement of human workers. Addressing these challenges requires a comprehensive approach that includes regulatory oversight, ethical guidelines, and ongoing public discourse.",
			ja: "人工知能のさまざまな分野への統合は、イノベーションと効率を促進する可能性を秘めています。しかし、それはプライバシー、セキュリティ、および人間の労働者の移転に関する倫理的懸念も引き起こします。これらの課題に対処するには、規制の監視、倫理的ガイドライン、および継続的な公共の議論を含む包括的なアプローチが必要です。",
			theme: "Technology",
		},
		{
			en: "The exploration of space not only expands our understanding of the universe but also drives technological advancements. Space missions have led to the development of new materials, improved telecommunications, and innovative solutions to engineering challenges. These advancements have applications beyond space exploration, benefiting various industries on Earth.",
			ja: "宇宙の探査は、宇宙に対する理解を深めるだけでなく、技術の進歩も促進します。宇宙ミッションは、新素材の開発、通信の改善、および工学的課題に対する革新的な解決策につながりました。これらの進歩は、宇宙探査を超えて、地球上のさまざまな産業に利益をもたらします。",
			theme: "Science",
		},
		{
			en: "The study of ancient civilizations provides insights into the cultural and technological achievements of early societies. By examining artifacts, historical records, and architectural remains, researchers can reconstruct the lifestyles, beliefs, and innovations of past cultures. This knowledge contributes to our understanding of human development and cultural evolution.",
			ja: "古代文明の研究は、初期の社会の文化的および技術的な成果についての洞察を提供します。研究者は、遺物、歴史記録、および建築の遺跡を調査することで、過去の文化の生活様式、信念、および革新を再構築することができます。この知識は、人類の発展と文化の進化についての理解に貢献します。",
			theme: "History",
		},
		{
			en: "Implementing effective cybersecurity measures is essential for protecting sensitive data and maintaining privacy. With the increasing prevalence of cyber threats, organizations must adopt comprehensive strategies that include encryption, access controls, and continuous monitoring. Educating employees about security best practices is also crucial to mitigating risks.",
			ja: "効果的なサイバーセキュリティ対策の実施は、機密データを保護し、プライバシーを維持するために不可欠です。サイバー脅威の増加に伴い、組織は暗号化、アクセス制御、および継続的な監視を含む包括的な戦略を採用する必要があります。従業員にセキュリティのベストプラクティスについて教育することも、リスクを軽減するために重要です。",
			theme: "Technology",
		},
		{
			en: "The development of renewable energy sources is crucial for reducing dependence on fossil fuels and mitigating climate change. Innovations in solar, wind, and hydroelectric power have made renewable energy more accessible and cost-effective. Governments and industries must work together to promote the adoption of sustainable energy solutions.",
			ja: "再生可能エネルギー源の開発は、化石燃料への依存を減らし、気候変動を緩和するために非常に重要です。太陽光、風力、水力発電の革新により、再生可能エネルギーはよりアクセスしやすく、コスト効率が高くなりました。政府と産業界は、持続可能なエネルギーソリューションの採用を促進するために協力する必要があります。",
			theme: "Environment",
		},
		{
			en: "Advancements in genetic research have opened new avenues for the treatment of previously incurable diseases. Gene therapy, personalized medicine, and CRISPR technology offer promising possibilities for addressing genetic disorders and improving patient outcomes. These breakthroughs highlight the importance of continued investment in scientific research.",
			ja: "遺伝子研究の進歩は、これまで治療不可能だった病気の治療に新しい道を開きました。遺伝子治療、個別化医療、およびCRISPR技術は、遺伝子疾患に対処し、患者の治療結果を改善するための有望な可能性を提供します。これらのブレークスルーは、科学研究への継続的な投資の重要性を強調しています。",
			theme: "Health",
		},
		{
			en: "The role of education in fostering innovation and creativity cannot be overstated. Educational institutions must provide students with the tools and opportunities to think critically, solve problems, and develop new ideas. By encouraging a culture of curiosity and experimentation, schools can help cultivate the next generation of innovators.",
			ja: "イノベーションと創造性を育む教育の役割は、いくら強調してもしすぎることはありません。教育機関は、学生が批判的に考え、問題を解決し、新しいアイデアを発展させるためのツールと機会を提供する必要があります。好奇心と実験の文化を奨励することで、学校は次世代の革新者を育成するのに役立ちます。",
			theme: "Education",
		},
		{
			en: "Sustainable urban development requires careful planning and consideration of environmental impacts. Cities must balance the need for growth with the preservation of green spaces and natural resources. Innovative urban design and smart infrastructure can help create more livable and resilient communities.",
			ja: "持続可能な都市開発には、環境への影響を考慮した慎重な計画が必要です。都市は、成長の必要性と緑地や天然資源の保全をバランスさせなければなりません。革新的な都市デザインとスマートインフラストラクチャーは、より住みやすく回復力のあるコミュニティの創造に役立ちます。",
			theme: "Urban Planning",
		},
	],
	"Very Hard": [
		{
			en: "The philosophical debate on the nature of consciousness continues to challenge our understanding of the human mind. Philosophers and scientists alike grapple with questions about the subjective experience, the mind-body problem, and the possibility of artificial consciousness. These inquiries not only push the boundaries of cognitive science but also have profound implications for ethics, artificial intelligence, and our conception of what it means to be human.",
			ja: "意識の本質に関する哲学的な議論は、人間の心の理解に挑戦し続けています。哲学者と科学者は、主観的経験、心身問題、および人工意識の可能性についての問いと格闘しています。これらの探求は、認知科学の境界を押し広げるだけでなく、倫理、人工知能、および人間であることの意味に深い影響を与えます。",
			theme: "Philosophy",
		},
		{
			en: "The complex interplay between genetics and environment shapes individual behavior and development. While genetic predispositions provide a framework for potential traits and tendencies, environmental factors such as upbringing, culture, and personal experiences can significantly modify these outcomes. This dynamic interaction underscores the importance of considering both nature and nurture in understanding human development.",
			ja: "遺伝子と環境の複雑な相互作用が、個々の行動と発達を形作ります。遺伝的な素因は、潜在的な特性や傾向の枠組みを提供しますが、育成、文化、個人的な経験などの環境要因は、これらの結果を大きく修正する可能性があります。この動的な相互作用は、人間の発達を理解する上で、自然と育成の両方を考慮する重要性を強調しています。",
			theme: "Genetics",
		},
		{
			en: "Quantum mechanics, with its counterintuitive principles, has revolutionized our understanding of the physical world. Concepts such as superposition, entanglement, and wave-particle duality challenge classical notions of reality and causality. These principles have not only led to groundbreaking technological advancements, such as quantum computing and cryptography, but also continue to provoke deep philosophical questions about the nature of reality itself.",
			ja: "直感に反する原理を持つ量子力学は、物理世界に対する理解を革命的に変えました。重ね合わせ、エンタングルメント、波動粒子二重性などの概念は、古典的な現実と因果関係の概念に挑戦します。これらの原理は、量子コンピューティングや暗号化などの画期的な技術の進歩をもたらしただけでなく、現実の本質そのものについての深い哲学的問いを引き続き引き起こしています。",
			theme: "Physics",
		},
		{
			en: "The ethical implications of artificial intelligence and machine learning are subjects of ongoing scholarly discourse. As AI systems become increasingly autonomous, questions arise about accountability, transparency, and the potential for bias. Ensuring that these technologies are developed and deployed responsibly requires interdisciplinary collaboration among ethicists, technologists, policymakers, and the public.",
			ja: "人工知能と機械学習の倫理的な影響は、現在進行中の学術的な議論の主題です。AIシステムがますます自律的になるにつれて、責任、透明性、偏見の可能性についての問いが生じます。これらの技術が責任を持って開発および展開されることを保証するには、倫理学者、技術者、政策立案者、および一般市民の間の学際的な協力が必要です。",
			theme: "Ethics",
		},
		{
			en: "The study of black holes provides profound insights into the nature of space, time, and gravity. These enigmatic objects, with their extreme densities and gravitational pulls, challenge our understanding of the cosmos. Research in this area has led to the confirmation of Einstein's theory of general relativity and has opened up new avenues for exploring the origins and fate of the universe.",
			ja: "ブラックホールの研究は、空間、時間、重力の本質について深い洞察を提供します。極端な密度と重力を持つこれらの謎めいた天体は、宇宙に対する理解に挑戦します。この分野の研究は、アインシュタインの一般相対性理論の確認につながり、宇宙の起源と運命を探る新たな道を開きました。",
			theme: "Astronomy",
		},
		{
			en: "Advanced economic theories explore the intricate dynamics of global markets and financial systems. Topics such as market equilibrium, international trade, and monetary policy are analyzed through sophisticated models that account for various economic variables. These theories not only inform policymakers but also help businesses and investors navigate the complexities of the global economy.",
			ja: "先進的な経済理論は、グローバル市場と金融システムの複雑な動態を探求します。市場均衡、国際貿易、金融政策などのトピックは、さまざまな経済変数を考慮した洗練されたモデルを通じて分析されます。これらの理論は、政策立案者に情報を提供するだけでなく、企業や投資家がグローバル経済の複雑さをナビゲートするのに役立ちます。",
			theme: "Economics",
		},
		{
			en: "The interplay of cultural, social, and political factors influences historical events and their interpretations. Understanding this complex web of influences requires a multidisciplinary approach, combining insights from history, sociology, political science, and anthropology. By analyzing these diverse perspectives, we can gain a comprehensive understanding of the forces that shape human history and appreciate the interconnectedness of past events and current realities.",
			ja: "文化的、社会的、政治的要因の相互作用が、歴史的な出来事とその解釈に影響を与えます。この複雑な影響の網を理解するには、歴史学、社会学、政治学、人類学からの洞察を組み合わせた学際的なアプローチが必要です。これらの多様な視点を分析することで、人類の歴史を形作る力を包括的に理解し、過去の出来事と現在の現実との相互関係を評価することができます。",
			theme: "History",
		},
		{
			en: "The development of nanotechnology holds the potential to transform various industries, from medicine to manufacturing. By manipulating matter at the atomic and molecular levels, scientists can create new materials with unprecedented properties. These innovations promise to revolutionize fields such as drug delivery, materials science, and electronics, offering groundbreaking solutions to complex problems and paving the way for future technological advancements.",
			ja: "ナノテクノロジーの発展は、医療から製造業に至るさまざまな産業を変革する可能性を秘めています。科学者は、原子および分子レベルで物質を操作することで、前例のない特性を持つ新しい材料を作り出すことができます。これらの革新は、薬物送達、材料科学、およびエレクトロニクスなどの分野に革命をもたらし、複雑な問題に対する画期的な解決策を提供し、将来の技術進歩への道を開きます。",
			theme: "Nanotechnology",
		},
		{
			en: "Philosophical inquiries into the nature of reality question the fundamental assumptions of our existence. These investigations delve into topics such as the nature of perception, the concept of free will, and the existence of alternate realities. By challenging our basic beliefs about the world, philosophy encourages a deeper exploration of the human experience, fostering critical thinking and broadening our understanding of what it means to be human.",
			ja: "現実の本質に関する哲学的な探求は、私たちの存在に関する基本的な仮定に疑問を投げかけます。これらの調査は、知覚の本質、自由意志の概念、代替現実の存在などのトピックに深く掘り下げます。哲学は、世界に対する基本的な信念に挑戦することで、人間の経験をより深く探求し、批判的思考を育み、人間であることの意味についての理解を広げることを奨励します。",
			theme: "Philosophy",
		},
		{
			en: "The role of literature in shaping societal values and norms cannot be understated. Through storytelling, authors reflect the cultural, social, and political contexts of their times, influencing public opinion and contributing to social change. Literature serves as a powerful tool for examining the human condition and promoting empathy across diverse communities, helping readers to understand different perspectives and fostering a sense of shared humanity.",
			ja: "社会的価値観や規範を形成する上での文学の役割は、軽視できません。物語を通じて、作家はその時代の文化的、社会的、政治的な文脈を反映し、世論に影響を与え、社会変革に貢献します。文学は、人間の状態を検証し、多様なコミュニティ間で共感を促進するための強力なツールとして機能し、読者が異なる視点を理解し、共通の人間性を育むのに役立ちます。",
			theme: "Literature",
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
