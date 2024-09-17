import { Button } from "@/components/Ui/Button";
import { IconMicrophone, IconPlayerStopFilled } from "@tabler/icons-react";
import { useCallback, useRef, useState } from "react";

const AudioRecorder = () => {
	const [isRecording, setIsRecording] = useState(false);
	const [audioUrl, setAudioUrl] = useState<string | null>(null);
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const audioChunksRef = useRef<Blob[]>([]);

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
	);
};

export default AudioRecorder;
