import { levelConfig } from "@/config/levelConfig";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "POST") {
		const { words, level, theme } = req.body;

		const apiKey = process.env.GEMINI_API_KEY;
		if (!apiKey) {
			return res.status(500).json({ error: "APIキーが設定されていません" });
		}

		const genAI = new GoogleGenerativeAI(apiKey);
		const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
		const config = levelConfig[level] ?? levelConfig.medium;

		try {
			const prompt = `
        Please generate an English text followed by its Japanese translation, strictly adhering to the following criteria:
        Theme: ${theme}
        Level: ${level}
				Words to use: ${words.join(", ")}

        Text Constraints:
				- The text must use **all of the provided words** in context.
        - The length of the English text **must not exceed** ${config.characterCount}. Please ensure the text remains concise and clear.
        - Grammar Complexity: Use ${config.grammarComplexity}.
        - If the text exceeds the length constraint, please shorten the text while maintaining clarity.

        The text is invalid if it does not follow these constraints.
        Please generate the English text first, followed by the Japanese translation, separated by the special marker "---".
      `;

			const result = await model.generateContent({
				contents: [
					{
						role: "user",
						parts: [
							{
								text: prompt,
							},
						],
					},
				],
				generationConfig: {
					maxOutputTokens: config.maxTokens,
					temperature: 0.2,
				},
			});

			const generatedText = result.response.text();

			const [enText, jaText] = generatedText.split("---");

			res.status(200).json({ en: enText.trim(), ja: jaText.trim() });
		} catch (error) {
			console.error("AIリクエストに失敗しました:", error);
			res.status(500).json({ error: "AIリクエストに失敗しました" });
		}
	} else {
		res.status(405).json({ error: "メソッドが許可されていません" });
	}
}
