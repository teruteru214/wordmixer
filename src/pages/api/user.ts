import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession({ req });

	if (!session?.user?.email) {
		res.status(401).json({ message: "Unauthorized" });
		return;
	}

	const user = await prisma.user.findUnique({
		where: { email: session.user.email },
	});

	if (!user) {
		res.status(404).json({ message: "User not found" });
		return;
	}

	res.status(200).json({ user });
};
