import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "GET") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	const { q } = req.query;

	if (!q || typeof q !== "string") {
		return res.status(400).json({ message: "Invalid query parameter" });
	}

	try {
		const texts = await prisma.text.findMany({
			where: {
				textWords: {
					some: {
						word: {
							word: {
								contains: q,
								mode: "insensitive",
							},
						},
					},
				},
			},
			include: {
				textLevels: {
					include: {
						level: true,
					},
				},
				textThemes: {
					include: {
						theme: true,
					},
				},
				textWords: {
					include: {
						word: true,
					},
				},
			},
		});

		const formattedTexts = texts.map((text) => ({
			id: text.id,
			level: text.textLevels[0]?.level.level || "",
			theme: text.textThemes[0]?.theme.theme || "",
			words: text.textWords.map((tw) => tw.word.word),
		}));

		res.status(200).json(formattedTexts);
	} catch (error) {
		console.error("Error fetching texts:", error);
		res.status(500).json({ message: "Internal server error" });
	}
}
