// pages/api/translate.ts

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Only POST requests are allowed" });
	}

	const { words } = req.body;

	if (!words || !Array.isArray(words)) {
		return res.status(400).json({ message: "Invalid request" });
	}

	const params = new URLSearchParams();
	for (const word of words) {
		params.append("text", word);
	}
	params.append("target_lang", "JA");

	try {
		const deeplResponse = await fetch(
			"https://api-free.deepl.com/v2/translate",
			{
				method: "POST",
				headers: {
					Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: params.toString(),
			},
		);

		const data = await deeplResponse.json();
		return res.status(200).json({ translations: data.translations });
	} catch (error) {
		console.error("Error translating words:", error);
		return res.status(500).json({ message: "Translation failed" });
	}
}
