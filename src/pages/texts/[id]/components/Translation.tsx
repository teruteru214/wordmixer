import { Button } from "@/components/Ui/Button";
import {} from "@/components/Ui/Form";
import { Textarea } from "@/components/Ui/Textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import DiffMatchPatch from "diff-match-patch";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface TranslationProps {
	ja: string;
}

const schema = z.object({
	translation: z.string().min(1, "和訳を入力してください"),
});

type FormData = z.infer<typeof schema>;

const Translation = ({ ja }: TranslationProps) => {
	const [showResults, setShowResults] = useState(false);
	const [highlightedResult, setHighlightedResult] =
		useState<JSX.Element | null>(null);

	const {
		handleSubmit,
		control,
		formState: { errors },
		getValues,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const highlightMatchWithDiff = (inputText: string, correctText: string) => {
		const dmp = new DiffMatchPatch();
		const diff = dmp.diff_main(inputText, correctText);
		dmp.diff_cleanupSemantic(diff);

		return diff.map((part, index) => {
			const [operation, text] = part;
			const uniqueKey = `${text}-${index}`;

			if (operation === DiffMatchPatch.DIFF_EQUAL) {
				return (
					<span key={uniqueKey} className="bg-yellow-200">
						{text}
					</span>
				);
			}
			return <span key={uniqueKey}>{text}</span>;
		});
	};

	const onSubmit = () => {
		const inputText = getValues("translation");
		const highlightedHTML = (
			<p className="mt-2 p-4 bg-white border rounded break-words">
				{highlightMatchWithDiff(inputText, ja)}
			</p>
		);
		setHighlightedResult(highlightedHTML);
		setShowResults(true);
	};

	return (
		<div>
			{!showResults ? (
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="mt-4">
						<Textarea
							{...control.register("translation")}
							className="mt-4"
							placeholder="和訳した文章を入力してください"
						/>
						{errors.translation && (
							<p className="text-red-500 mt-2">{errors.translation.message}</p>
						)}
					</div>
					<div className="flex justify-center my-4">
						<Button className="w-full" size="lg" type="submit">
							答え合わせ
						</Button>
					</div>
				</form>
			) : (
				<div className="my-6">
					<h2 className="text-xl font-bold">あなたの和訳</h2>
					{highlightedResult}
					<h2 className="text-xl font-bold mt-4">答え</h2>
					<p className="mt-2 p-4 bg-white border rounded break-words">{ja}</p>
				</div>
			)}
		</div>
	);
};

export default Translation;
