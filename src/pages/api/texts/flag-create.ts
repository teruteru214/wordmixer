import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	const { userId, textId } = req.body;

	const parsedUserId = Number(userId);
	const parsedTextId = Number(textId);

	if (
		!userId ||
		!textId ||
		Number.isNaN(parsedUserId) ||
		Number.isNaN(parsedTextId)
	) {
		return res.status(400).json({ message: "Invalid userId or textId" });
	}

	try {
		const flag = await prisma.flag.create({
			data: {
				userId: Number(userId),
				textId: Number(textId),
				date: new Date(),
			},
		});

		return res.status(200).json(flag);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Failed to register flag" });
	}
}
