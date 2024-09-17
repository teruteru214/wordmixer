import { Button } from "@/components/Ui/Button";
import { IconPlayerPauseFilled, IconVolume } from "@tabler/icons-react";
import { useCallback, useState } from "react";

interface SpeechProps {
	text: string;
}

const Speech = ({ text }: SpeechProps) => {
	const [isSpeaking, setIsSpeaking] = useState(false);

	const speakText = useCallback(() => {
		const utterance = new SpeechSynthesisUtterance(text);
		utterance.lang = "en-US";
		utterance.rate = 1;

		setIsSpeaking(true);

		utterance.onend = () => {
			setIsSpeaking(false);
		};

		speechSynthesis.speak(utterance);
	}, [text]);

	const stopSpeaking = useCallback(() => {
		speechSynthesis.cancel();
		setIsSpeaking(false);
	}, []);

	return (
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
	);
};

export default Speech;
