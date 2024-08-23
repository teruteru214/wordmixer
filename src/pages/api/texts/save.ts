import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	const { userId, enText, jaText, words, level, theme } = req.body;

	if (!userId || !enText || !jaText || !words || !level || !theme) {
		return res.status(400).json({ message: "Missing required fields" });
	}

	try {
		const newText = await prisma.text.create({
			data: {
				userId,
				en: enText,
				ja: jaText,
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
				textWords: { include: { word: true } }, // 関連する単語を含む
				textLevels: { include: { level: true } }, // 関連するレベルを含む
				textThemes: { include: { theme: true } }, // 関連するテーマを含む
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
		console.error("Error saving text:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
}
