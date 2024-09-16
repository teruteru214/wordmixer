import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { email } = req.body;

	if (!email) {
		return res.status(400).json({ message: "Bad Request: Email is required" });
	}

	const page =
		typeof req.query.page === "string"
			? Number.parseInt(req.query.page, 10)
			: 1;
	const limit = 30;
	const skip = (page - 1) * limit;

	try {
		const user = await prisma.user.findUnique({
			where: { email },
			select: {
				name: true,
			},
		});

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const texts = await prisma.text.findMany({
			where: {
				user: {
					email: email,
				},
			},
			select: {
				id: true,
				userId: true,
				textWords: {
					select: {
						word: true,
					},
				},
				textLevels: {
					select: {
						level: true,
					},
				},
				textThemes: {
					select: {
						theme: true,
					},
				},
			},
			orderBy: {
				id: "desc",
			},
			skip: skip,
			take: limit,
		});

		const userTexts = texts.map((text) => ({
			id: text.id,
			user_id: text.userId,
			words: text.textWords.map((tw) => tw.word.word),
			level: text.textLevels[0]?.level?.level || "",
			theme: text.textThemes[0]?.theme?.theme || "",
		}));

		return res.status(200).json({
			username: user.name,
			texts: userTexts,
		});
	} catch (error) {
		console.error("Error fetching texts:", error);
		return res.status(500).json({
			message: "Internal Server Error",
			error: error instanceof Error ? error.message : "Unknown error",
		});
	}
}
