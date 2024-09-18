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

const Material = ({ words = [], level, theme }: MaterialProps) => {
	const [translatedWords, setTranslatedWords] = useState<{
		[key: string]: string;
	}>({});

	useEffect(() => {
		if (words.length > 0) {
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

					const translations = Object.fromEntries(
						words.map((word, index) => [
							word,
							data.translations[index]?.text || "翻訳失敗",
						]),
					);

					setTranslatedWords(translations);
				} catch (error) {
					console.error("Error fetching translation:", error);
				}
			};

			translateWords();
		}
	}, [words]);

	if (!words || words.length === 0) {
		return <p>英単語のデータがありません。</p>;
	}

	return (
		<Accordion type="single" collapsible className="w-full">
			<AccordionItem value="item-1">
				<AccordionTrigger>使われた英単語・レベル・テーマ</AccordionTrigger>
				<AccordionContent>
					<ul className="ml-2 space-y-4">
						<li className="text-xl font-bold">英単語</li>
						{words.map((word) => (
							<li key={word}>
								{word}: {translatedWords[word] || "翻訳中..."}
							</li>
						))}
						<li className="text-xl font-bold">レベル</li>
						<li>{level}</li>
						<li className="text-xl font-bold">テーマ</li>
						<li>{theme}</li>
					</ul>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default Material;
