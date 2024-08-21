import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	const { email } = req.body;

	if (!email) {
		return res.status(400).json({ message: "Email is required" });
	}

	try {
		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		return res.status(200).json({ user });
	} catch {
		return res.status(500).json({ message: "Internal Server Error" });
	}
}
