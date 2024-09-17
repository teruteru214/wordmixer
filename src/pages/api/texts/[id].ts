import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { id } = req.query;

	if (!id || typeof id !== "string") {
		return res.status(400).json({ error: "IDが無効です。" });
	}

	try {
		const textData = await prisma.text.findUnique({
			where: { id: Number.parseInt(id) },
			include: {
				textWords: {
					include: {
						word: true,
					},
				},
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
				flags: true,
			},
		});

		if (!textData) {
			return res.status(404).json({ error: "データが見つかりませんでした。" });
		}

		const formattedData = {
			id: textData.id,
			en: textData.en,
			ja: textData.ja,
			level:
				textData.textLevels.map((levelObj) => levelObj.level.level)[0] || "N/A",
			theme:
				textData.textThemes.map((themeObj) => themeObj.theme.theme)[0] || "N/A",
			words: textData.textWords.map((wordObj) => wordObj.word.word),
			flag: textData.flags.length > 0, // Flagが存在するかどうか
		};

		res.status(200).json(formattedData);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "サーバーエラーが発生しました。" });
	}
}
