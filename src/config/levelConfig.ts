export const levelConfig: Record<
	string,
	{
		characterCount: string;
		grammarComplexity: string;
		maxTokens: number;
	}
> = {
	"very-easy": {
		characterCount: "0-150 characters",
		grammarComplexity:
			"very short and simple sentences using basic conjunctions.",
		maxTokens: 120,
	},
	easy: {
		characterCount: "150-250 characters",
		grammarComplexity:
			"short sentences using basic conjunctions and minimal descriptions.",
		maxTokens: 200,
	},
	medium: {
		characterCount: "250-350 characters",
		grammarComplexity:
			"compound sentences with basic conjunctions (because, so)",
		maxTokens: 300,
	},
	hard: {
		characterCount: "350-450 characters",
		grammarComplexity:
			"compound sentences using basic conjunctions (because, so) with some descriptive phrases.",
		maxTokens: 400,
	},
	"very-hard": {
		characterCount: "400-550 characters",
		grammarComplexity: "complex sentences with varied structures",
		maxTokens: 500,
	},
};
