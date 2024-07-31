import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

const user = {
	name: "Test User",
	email: "testuser@example.com",
	password: "password123",
	subscription: UserRole.FREE,
};

const levels = ["Very Easy", "Easy", "Medium", "Hard", "Very Hard"];

const texts = [
	{
		theme: "Business",
		texts: [
			{
				en: "The meeting starts at 10 AM.",
				ja: "会議は午前10時に始まります。",
				words: ["meeting", "starts", "10 AM"],
			},
			{
				en: "Please prepare the report.",
				ja: "レポートを準備してください。",
				words: ["prepare", "report"],
			},
			{
				en: "We need to discuss the budget.",
				ja: "予算について話し合う必要があります。",
				words: ["discuss", "budget"],
			},
			{
				en: "The client is very important.",
				ja: "クライアントは非常に重要です。",
				words: ["client", "important"],
			},
			{
				en: "We will have a conference call.",
				ja: "会議電話を行います。",
				words: ["conference", "call"],
			},
			{
				en: "The project deadline is near.",
				ja: "プロジェクトの締め切りが近づいています。",
				words: ["project", "deadline", "near"],
			},
			{
				en: "We achieved our sales target.",
				ja: "販売目標を達成しました。",
				words: ["achieved", "sales", "target"],
			},
			{
				en: "The team works very hard.",
				ja: "チームは非常に頑張っています。",
				words: ["team", "works", "hard"],
			},
			{
				en: "We need more resources.",
				ja: "もっとリソースが必要です。",
				words: ["need", "resources"],
			},
			{
				en: "Please schedule the meeting.",
				ja: "会議をスケジュールしてください。",
				words: ["schedule", "meeting"],
			},
		],
	},
	{
		theme: "Travel",
		texts: [
			{
				en: "I love traveling to new places.",
				ja: "新しい場所を旅行するのが大好きです。",
				words: ["traveling", "places"],
			},
			{
				en: "The flight was very comfortable.",
				ja: "飛行機の旅は非常に快適でした。",
				words: ["flight", "comfortable"],
			},
			{
				en: "We visited many historical sites.",
				ja: "多くの歴史的な場所を訪れました。",
				words: ["visited", "historical", "sites"],
			},
			{
				en: "The hotel service was excellent.",
				ja: "ホテルのサービスは素晴らしかったです。",
				words: ["hotel", "service", "excellent"],
			},
			{
				en: "We enjoyed the local cuisine.",
				ja: "地元の料理を楽しみました。",
				words: ["enjoyed", "local", "cuisine"],
			},
			{
				en: "The weather was perfect for sightseeing.",
				ja: "観光に最適な天気でした。",
				words: ["weather", "perfect", "sightseeing"],
			},
			{
				en: "We took a lot of photos.",
				ja: "たくさんの写真を撮りました。",
				words: ["took", "photos"],
			},
			{
				en: "The tour guide was very knowledgeable.",
				ja: "ツアーガイドは非常に知識が豊富でした。",
				words: ["tour", "guide", "knowledgeable"],
			},
			{
				en: "We bought some souvenirs.",
				ja: "お土産を買いました。",
				words: ["bought", "souvenirs"],
			},
			{
				en: "The trip was unforgettable.",
				ja: "旅行は忘れられないものになりました。",
				words: ["trip", "unforgettable"],
			},
		],
	},
	{
		theme: "Health",
		texts: [
			{
				en: "Exercise is important for health.",
				ja: "運動は健康に重要です。",
				words: ["exercise", "important", "health"],
			},
			{
				en: "Eat a balanced diet every day.",
				ja: "毎日バランスの取れた食事を摂りましょう。",
				words: ["balanced", "diet", "every day"],
			},
			{
				en: "Drink plenty of water.",
				ja: "たくさんの水を飲みましょう。",
				words: ["drink", "water"],
			},
			{
				en: "Get enough sleep each night.",
				ja: "毎晩十分な睡眠をとりましょう。",
				words: ["sleep", "night"],
			},
			{
				en: "Visit the doctor regularly.",
				ja: "定期的に医者に行きましょう。",
				words: ["visit", "doctor", "regularly"],
			},
			{
				en: "Avoid smoking and excessive drinking.",
				ja: "喫煙と過度の飲酒を避けましょう。",
				words: ["avoid", "smoking", "drinking"],
			},
			{
				en: "Take care of your mental health.",
				ja: "メンタルヘルスを大切にしましょう。",
				words: ["care", "mental health"],
			},
			{
				en: "Practice stress management techniques.",
				ja: "ストレス管理の技術を実践しましょう。",
				words: ["practice", "stress management", "techniques"],
			},
			{
				en: "Stay active and exercise daily.",
				ja: "毎日活動的に運動しましょう。",
				words: ["active", "exercise", "daily"],
			},
			{
				en: "Maintain a healthy weight.",
				ja: "健康的な体重を維持しましょう。",
				words: ["maintain", "healthy", "weight"],
			},
		],
	},
	{
		theme: "Technology",
		texts: [
			{
				en: "Technology is advancing rapidly.",
				ja: "テクノロジーは急速に進歩しています。",
				words: ["technology", "advancing", "rapidly"],
			},
			{
				en: "The new software is very efficient.",
				ja: "新しいソフトウェアは非常に効率的です。",
				words: ["software", "efficient"],
			},
			{
				en: "We need to upgrade our systems.",
				ja: "システムをアップグレードする必要があります。",
				words: ["upgrade", "systems"],
			},
			{
				en: "Cybersecurity is a major concern.",
				ja: "サイバーセキュリティは大きな懸念事項です。",
				words: ["cybersecurity", "concern"],
			},
			{
				en: "Artificial intelligence is fascinating.",
				ja: "人工知能は魅力的です。",
				words: ["artificial intelligence", "fascinating"],
			},
			{
				en: "The internet has changed our lives.",
				ja: "インターネットは私たちの生活を変えました。",
				words: ["internet", "changed", "lives"],
			},
			{
				en: "We rely on technology every day.",
				ja: "毎日テクノロジーに依存しています。",
				words: ["rely", "technology", "every day"],
			},
			{
				en: "The device has many features.",
				ja: "そのデバイスには多くの機能があります。",
				words: ["device", "features"],
			},
			{
				en: "We are developing new applications.",
				ja: "新しいアプリケーションを開発しています。",
				words: ["developing", "applications"],
			},
			{
				en: "Technology can improve efficiency.",
				ja: "テクノロジーは効率を改善できます。",
				words: ["technology", "improve", "efficiency"],
			},
		],
	},
	{
		theme: "Education",
		texts: [
			{
				en: "Education is the key to success.",
				ja: "教育は成功の鍵です。",
				words: ["education", "key", "success"],
			},
			{
				en: "Students need to study hard.",
				ja: "学生は一生懸命勉強する必要があります。",
				words: ["students", "study", "hard"],
			},
			{
				en: "Teachers play an important role.",
				ja: "教師は重要な役割を果たします。",
				words: ["teachers", "important", "role"],
			},
			{
				en: "Learning is a lifelong process.",
				ja: "学習は生涯続くプロセスです。",
				words: ["learning", "lifelong", "process"],
			},
			{
				en: "Online courses are becoming popular.",
				ja: "オンラインコースが人気になっています。",
				words: ["online courses", "popular"],
			},
			{
				en: "Education opens up opportunities.",
				ja: "教育は機会を広げます。",
				words: ["education", "opportunities"],
			},
			{
				en: "Reading books is very beneficial.",
				ja: "本を読むことは非常に有益です。",
				words: ["reading", "books", "beneficial"],
			},
			{
				en: "We should encourage critical thinking.",
				ja: "批判的思考を奨励すべきです。",
				words: ["encourage", "critical thinking"],
			},
			{
				en: "Education helps in personal development.",
				ja: "教育は個人の発展に役立ちます。",
				words: ["education", "personal development"],
			},
			{
				en: "Students should participate in activities.",
				ja: "学生は活動に参加すべきです。",
				words: ["students", "participate", "activities"],
			},
		],
	},
	{
		theme: "Daily Life",
		texts: [
			{
				en: "I wake up early in the morning.",
				ja: "朝早く起きます。",
				words: ["wake up", "early", "morning"],
			},
			{
				en: "I usually have breakfast at 7 AM.",
				ja: "通常、朝食は午前7時に食べます。",
				words: ["breakfast", "7 AM"],
			},
			{
				en: "I commute to work by bus.",
				ja: "バスで通勤します。",
				words: ["commute", "work", "bus"],
			},
			{
				en: "I enjoy cooking dinner.",
				ja: "夕食を作るのが好きです。",
				words: ["cooking", "dinner"],
			},
			{
				en: "I like to read before bed.",
				ja: "寝る前に読書が好きです。",
				words: ["read", "before bed"],
			},
			{
				en: "I go for a walk every evening.",
				ja: "毎晩散歩に行きます。",
				words: ["walk", "every evening"],
			},
			{
				en: "I clean the house on weekends.",
				ja: "週末に家を掃除します。",
				words: ["clean", "house", "weekends"],
			},
			{
				en: "I do the laundry on Sundays.",
				ja: "日曜日に洗濯をします。",
				words: ["laundry", "Sundays"],
			},
			{
				en: "I like to watch movies.",
				ja: "映画を見るのが好きです。",
				words: ["watch", "movies"],
			},
			{
				en: "I relax at home on weekends.",
				ja: "週末は家でリラックスします。",
				words: ["relax", "home", "weekends"],
			},
		],
	},
	{
		theme: "Environment",
		texts: [
			{
				en: "We should protect the environment.",
				ja: "環境を保護すべきです。",
				words: ["protect", "environment"],
			},
			{
				en: "Recycling is very important.",
				ja: "リサイクルは非常に重要です。",
				words: ["recycling", "important"],
			},
			{
				en: "We need to reduce pollution.",
				ja: "汚染を減らす必要があります。",
				words: ["reduce", "pollution"],
			},
			{
				en: "Climate change is a global issue.",
				ja: "気候変動は世界的な問題です。",
				words: ["climate change", "global", "issue"],
			},
			{
				en: "We should save energy.",
				ja: "エネルギーを節約すべきです。",
				words: ["save", "energy"],
			},
			{
				en: "Planting trees is beneficial.",
				ja: "木を植えることは有益です。",
				words: ["planting", "trees", "beneficial"],
			},
			{
				en: "We must conserve water.",
				ja: "水を節約しなければなりません。",
				words: ["conserve", "water"],
			},
			{
				en: "Sustainable living is crucial.",
				ja: "持続可能な生活は非常に重要です。",
				words: ["sustainable living", "crucial"],
			},
			{
				en: "We should reduce waste.",
				ja: "廃棄物を減らすべきです。",
				words: ["reduce", "waste"],
			},
			{
				en: "Protecting wildlife is essential.",
				ja: "野生生物の保護は不可欠です。",
				words: ["protecting", "wildlife", "essential"],
			},
		],
	},
	{
		theme: "Entertainment",
		texts: [
			{
				en: "I enjoy watching movies.",
				ja: "映画を見るのが好きです。",
				words: ["watching", "movies"],
			},
			{
				en: "Listening to music is relaxing.",
				ja: "音楽を聴くことはリラックスできます。",
				words: ["listening", "music", "relaxing"],
			},
			{
				en: "I love going to concerts.",
				ja: "コンサートに行くのが大好きです。",
				words: ["concerts", "love"],
			},
			{
				en: "Playing video games is fun.",
				ja: "ビデオゲームをするのは楽しいです。",
				words: ["playing", "video games", "fun"],
			},
			{
				en: "Reading books is a great hobby.",
				ja: "読書は素晴らしい趣味です。",
				words: ["reading", "books", "hobby"],
			},
			{
				en: "I like to watch sports.",
				ja: "スポーツを見るのが好きです。",
				words: ["watch", "sports"],
			},
			{
				en: "Going to the theater is enjoyable.",
				ja: "劇場に行くのは楽しいです。",
				words: ["theater", "enjoyable"],
			},
			{
				en: "I enjoy painting and drawing.",
				ja: "絵を描くことが好きです。",
				words: ["painting", "drawing"],
			},
			{
				en: "Photography is a creative hobby.",
				ja: "写真撮影は創造的な趣味です。",
				words: ["photography", "creative", "hobby"],
			},
			{ en: "I like to dance.", ja: "ダンスが好きです。", words: ["dance"] },
		],
	},
	{
		theme: "Art and Literature",
		texts: [
			{
				en: "Art is a form of expression.",
				ja: "アートは表現の一形態です。",
				words: ["art", "expression"],
			},
			{
				en: "Literature enriches the mind.",
				ja: "文学は心を豊かにします。",
				words: ["literature", "enriches", "mind"],
			},
			{
				en: "I enjoy visiting art galleries.",
				ja: "美術館を訪れるのが好きです。",
				words: ["visiting", "art galleries"],
			},
			{
				en: "Reading novels is very enjoyable.",
				ja: "小説を読むのはとても楽しいです。",
				words: ["reading", "novels", "enjoyable"],
			},
			{
				en: "Poetry is a beautiful form of art.",
				ja: "詩は美しい芸術の一形態です。",
				words: ["poetry", "beautiful", "art"],
			},
			{
				en: "I like to write short stories.",
				ja: "短編小説を書くのが好きです。",
				words: ["write", "short stories"],
			},
			{
				en: "Drawing and painting are relaxing.",
				ja: "絵を描くことはリラックスできます。",
				words: ["drawing", "painting", "relaxing"],
			},
			{
				en: "Classical music is very soothing.",
				ja: "クラシック音楽は非常に癒されます。",
				words: ["classical music", "soothing"],
			},
			{
				en: "I enjoy sculpting and pottery.",
				ja: "彫刻や陶芸を楽しんでいます。",
				words: ["sculpting", "pottery"],
			},
			{
				en: "Art can inspire and motivate.",
				ja: "アートはインスピレーションを与え、動機づけることができます。",
				words: ["art", "inspire", "motivate"],
			},
		],
	},
	{
		theme: "History",
		texts: [
			{
				en: "History teaches us valuable lessons.",
				ja: "歴史は貴重な教訓を教えてくれます。",
				words: ["history", "valuable", "lessons"],
			},
			{
				en: "I enjoy learning about ancient civilizations.",
				ja: "古代文明について学ぶのが好きです。",
				words: ["learning", "ancient", "civilizations"],
			},
			{
				en: "World War II had a significant impact.",
				ja: "第二次世界大戦は大きな影響を与えました。",
				words: ["World War II", "significant", "impact"],
			},
			{
				en: "Historical events shape our present.",
				ja: "歴史的な出来事が現在を形作っています。",
				words: ["historical", "events", "shape"],
			},
			{
				en: "Visiting historical sites is educational.",
				ja: "歴史的な場所を訪れることは教育的です。",
				words: ["visiting", "historical sites", "educational"],
			},
			{
				en: "Reading history books is fascinating.",
				ja: "歴史の本を読むのは魅力的です。",
				words: ["reading", "history books", "fascinating"],
			},
			{
				en: "Documentaries provide historical insights.",
				ja: "ドキュメンタリーは歴史的な洞察を提供します。",
				words: ["documentaries", "provide", "insights"],
			},
			{
				en: "Museums are great places to learn history.",
				ja: "博物館は歴史を学ぶのに最適な場所です。",
				words: ["museums", "learn", "history"],
			},
			{
				en: "History helps us understand the world.",
				ja: "歴史は世界を理解するのに役立ちます。",
				words: ["history", "understand", "world"],
			},
			{
				en: "Historical figures inspire us.",
				ja: "歴史的人物は私たちにインスピレーションを与えます。",
				words: ["historical figures", "inspire"],
			},
		],
	},
];

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

	// Levelsのアップサート
	for (const level of levels) {
		await prisma.level.upsert({
			where: { level },
			update: {},
			create: { level },
		});
	}

	// テーマごとにユニークなテキストを作成
	for (const { theme, texts: themeTexts } of texts) {
		const createdTheme = await prisma.theme.upsert({
			where: { theme },
			update: {},
			create: { theme },
		});

		// テキストの作成
		for (const { en, ja, words } of themeTexts) {
			const createdText = await prisma.text.create({
				data: {
					userId: createdUser.id,
					en,
					ja,
				},
			});

			// "Very Easy"レベルに関連付け
			const createdLevel = await prisma.level.upsert({
				where: { level: "Very Easy" },
				update: {},
				create: { level: "Very Easy" },
			});

			await prisma.textLevel.create({
				data: {
					textId: createdText.id,
					levelId: createdLevel.id,
				},
			});

			// テーマに関連付け
			await prisma.textTheme.create({
				data: {
					textId: createdText.id,
					themeId: createdTheme.id,
				},
			});

			// 単語の関連付け
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
