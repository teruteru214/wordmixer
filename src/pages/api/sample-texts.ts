import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	_req: NextApiRequest,
	res: NextApiResponse,
) {
	const texts = await prisma.text.findMany({
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
		take: 30,
	});

	const formattedTexts = texts.map((text) => ({
		id: text.id,
		level: text.textLevels[0]?.level.level || "",
		theme: text.textThemes[0]?.theme.theme || "",
		words: text.textWords.map((tw) => tw.word.word),
	}));

	res.status(200).json(formattedTexts);
}
