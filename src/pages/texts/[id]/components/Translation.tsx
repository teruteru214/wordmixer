import { Button } from "@/components/Ui/Button";
import { Textarea } from "@/components/Ui/Textarea";
import { useRef, useState } from "react";

const Translation = () => {
	const [showResults, setShowResults] = useState(false);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const handleCheckAnswer = () => {
		setShowResults(true);
	};

	return (
		<div>
			{!showResults ? (
				<>
					<Textarea
						className="mt-4"
						placeholder="和訳した文章を入力してください"
						ref={textareaRef}
					/>
					<div className="flex justify-center my-4">
						<Button
							className="mt-4 text-2xl"
							size="lg"
							onClick={handleCheckAnswer}
						>
							答え合わせ
						</Button>
					</div>
				</>
			) : (
				<div className="my-6">
					<h2 className="text-xl font-bold">あなたの英訳</h2>
					<p className="mt-2 p-4 bg-gray-100 border rounded break-words">
						{textareaRef.current ? textareaRef.current.value : ""}
					</p>
					<h2 className="text-xl font-bold mt-4">AIの英訳</h2>
					<p className="mt-2 p-4 bg-gray-100 border rounded break-words">
						During the company's annual retreat, employees enjoyed a baseball
						game by the lake, where they also had the chance to fish and discuss
						future business strategies.
					</p>
				</div>
			)}
		</div>
	);
};

export default Translation;
