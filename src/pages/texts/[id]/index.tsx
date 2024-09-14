import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/Ui/Accordion";

import { Button } from "@/components/Ui/Button";
import type { TranslationTextProps } from "@/types/text";
import {
	IconMicrophone,
	IconPlayerPauseFilled,
	IconPlayerStopFilled,
	IconVolume,
} from "@tabler/icons-react";
import type { GetStaticProps } from "next";
import { useCallback, useRef, useState } from "react";
import Translation from "./components/Translation";

const ModelSentence = ({ textData }: TranslationTextProps) => {
	const [isSpeaking, setIsSpeaking] = useState(false);
	const [isRecording, setIsRecording] = useState(false);
	const [audioUrl, setAudioUrl] = useState<string | null>(null);
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const audioChunksRef = useRef<Blob[]>([]);

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

	const startRecording = useCallback(async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			mediaRecorderRef.current = new MediaRecorder(stream);

			mediaRecorderRef.current.ondataavailable = (event) => {
				audioChunksRef.current.push(event.data);
			};

			mediaRecorderRef.current.onstop = () => {
				const blob = new Blob(audioChunksRef.current, {
					type: "audio/wav",
				});
				const url = URL.createObjectURL(blob);
				setAudioUrl(url);
				audioChunksRef.current = [];
			};

			mediaRecorderRef.current.start();
			setIsRecording(true);
		} catch (error) {
			console.error("Error accessing audio devices.", error);
		}
	}, []);

	const stopRecording = useCallback(() => {
		if (mediaRecorderRef.current) {
			mediaRecorderRef.current.stop();
			setIsRecording(false);
			const stream = mediaRecorderRef.current.stream;
			for (const track of stream.getTracks()) {
				track.stop();
			}
		}
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
					<div className="flex justify-between items-center space-x-2">
						<Button
							className="rounded-full"
							size="icon"
							onClick={isRecording ? stopRecording : startRecording}
						>
							{isRecording ? (
								<IconPlayerStopFilled className="text-white stroke-1" />
							) : (
								<IconMicrophone className="text-white stroke-1" />
							)}
						</Button>
						<audio controls src={audioUrl ?? undefined} className="h-9 w-64">
							<track
								kind="captions"
								srcLang="en"
								label="English captions"
								src="/path/to/captions.vtt"
								default
							/>
						</audio>
					</div>
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
