import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/Ui/Accordion";
import type { TranslationTextProps } from "@/types/text";
import type { GetStaticProps } from "next";
import AudioRecorder from "./components/AudioRecorder";
import Speech from "./components/Speech";
import Translation from "./components/Translation";

const ModelSentence = ({ textData }: TranslationTextProps) => {
	return (
		<div className="max-w-screen-lg mx-auto flex flex-col justify-center items-center h-screen">
			<div className="mx-2 py-5 sm:mx-6 space-y-4">
				<p className="text-xl">{textData.en}</p>
				<div className="flex justify-between items-center">
					<Speech text={textData.en} />
					<AudioRecorder />
				</div>
				<Translation id={textData.id} ja={textData.ja} flag={textData.flag} />
				<Accordion type="single" collapsible className="w-full">
					<AccordionItem value="item-1">
						<AccordionTrigger>使われた英単語・レベル・テーマ</AccordionTrigger>
						<AccordionContent>
							<ul className="ml-2 space-y-2">
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

	if (!textData || !textData.words || !Array.isArray(textData.words)) {
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
