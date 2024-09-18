import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/Ui/Accordion";
import { useEffect, useState } from "react";

interface MaterialProps {
	words: string[];
	level: string;
	theme: string;
}

const Material = ({ words, level, theme }: MaterialProps) => {
	const [translatedWords, setTranslatedWords] = useState<{
		[key: string]: string;
	}>({});

	useEffect(() => {
		const translateWords = async () => {
			try {
				const response = await fetch("/api/texts/words", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ words }),
				});

				const data = await response.json();

				const translations = words.reduce(
					(acc, word, index) => {
						acc[word] = data.translations[index].text;
						return acc;
					},
					{} as { [key: string]: string },
				);

				setTranslatedWords(translations);
			} catch (error) {
				console.error("Error fetching translation:", error);
			}
		};

		translateWords();
	}, [words]);

	return (
		<Accordion type="single" collapsible className="w-full">
			<AccordionItem value="item-1">
				<AccordionTrigger>使われた英単語・レベル・テーマ</AccordionTrigger>
				<AccordionContent>
					<ul className="ml-2 space-y-2">
						<li>
							<strong>英単語:</strong>
						</li>
						{words.map((word) => (
							<li key={word}>
								{word}: {translatedWords[word] || "翻訳中..."}
							</li>
						))}
						<li>レベル: {level}</li>
						<li>テーマ: {theme}</li>
					</ul>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default Material;
