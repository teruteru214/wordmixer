import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	_req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		const texts = await prisma.text.findMany({
			take: 30,
			orderBy: {
				id: "desc",
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
	} catch {
		res.status(500).json("Internal Server Error");
	}
}
