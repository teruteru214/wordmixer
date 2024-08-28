import { levelConfig } from "@/config/levelConfig";
import prisma from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	const { words, level, theme, userId } = req.body;

	if (!userId || !words || !level || !theme) {
		return res.status(400).json({ message: "Missing required fields" });
	}

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

		const newText = await prisma.text.create({
			data: {
				userId,
				en: enText.trim(),
				ja: jaText.trim(),
				textWords: {
					create: words.map((word: string) => ({
						word: {
							connectOrCreate: {
								where: { word },
								create: { word },
							},
						},
					})),
				},
				textLevels: {
					create: {
						level: {
							connectOrCreate: {
								where: { level },
								create: { level },
							},
						},
					},
				},
				textThemes: {
					create: {
						theme: {
							connectOrCreate: {
								where: { theme },
								create: { theme },
							},
						},
					},
				},
			},
			include: {
				textWords: { include: { word: true } },
				textLevels: { include: { level: true } },
				textThemes: { include: { theme: true } },
			},
		});

		const responseText = {
			id: newText.id,
			userId: newText.userId,
			en: newText.en,
			ja: newText.ja,
			words: newText.textWords.map((tw) => tw.word.word),
			level: newText.textLevels[0]?.level.level || null,
			theme: newText.textThemes[0]?.theme.theme || null,
		};

		return res.status(201).json({ result: responseText });
	} catch (error) {
		console.error("Error during AI request or saving text:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
}
