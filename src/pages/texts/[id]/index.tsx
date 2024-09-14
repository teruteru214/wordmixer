import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/Ui/Accordion";

import { Button } from "@/components/Ui/Button";
import type { TranslationTextProps } from "@/types/text";
import { IconPlayerPauseFilled, IconVolume } from "@tabler/icons-react";
import type { GetStaticProps } from "next";
import { useCallback, useState } from "react";
import Translation from "./components/Translation";

const ModelSentence = ({ textData }: TranslationTextProps) => {
	const [isSpeaking, setIsSpeaking] = useState(false);

	const speakText = useCallback(() => {
		const utterance = new SpeechSynthesisUtterance(textData.en);
		utterance.lang = "en-US";
		utterance.rate = 1;

		setIsSpeaking(true);

		utterance.onend = () => {
			setIsSpeaking(false);
		};

		speechSynthesis.speak(utterance);
	}, [textData.en]);

	const stopSpeaking = useCallback(() => {
		speechSynthesis.cancel();
		setIsSpeaking(false);
	}, []);

	return (
		<div className="max-w-screen-lg mx-auto flex flex-col justify-center items-center h-screen">
			<div className="mx-2 py-5 sm:mx-6 space-y-4">
				<p className="text-xl">{textData.en}</p>
				<div className="flex justify-between items-center">
					<Button
						className="rounded-md"
						size="icon"
						onClick={isSpeaking ? stopSpeaking : speakText}
					>
						{isSpeaking ? (
							<IconPlayerPauseFilled className="text-white stroke-1" />
						) : (
							<IconVolume className="text-white stroke-1" />
						)}
					</Button>
				</div>
				<Translation ja={textData.ja} />
				<Accordion type="single" collapsible className="w-full">
					<AccordionItem value="item-1">
						<AccordionTrigger>使われた英単語・レベル・テーマ</AccordionTrigger>
						<AccordionContent>
							<ul className=" ml-2 space-y-2">
								<li>英単語: {textData.words.join(", ")}</li>
								<li>レベル: {textData.level}</li>
								<li>テーマ: {textData.theme}</li>
							</ul>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	);
};

export default ModelSentence;

export const getStaticProps: GetStaticProps = async (context) => {
	if (!context.params || !context.params.id) {
		return {
			notFound: true,
		};
	}

	const { id } = context.params;

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/texts/${id}`,
	);

	const textData = await res.json();

	if (!textData) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			textData,
		},
	};
};

export const getStaticPaths = async () => {
	return {
		paths: [],
		fallback: "blocking",
	};
};
