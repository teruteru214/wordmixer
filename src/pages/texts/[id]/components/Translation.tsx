import { Button } from "@/components/Ui/Button";
import { Textarea } from "@/components/Ui/Textarea";
import { zodResolver } from "@hookform/resolvers/zod";
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
	const [userTranslation, setUserTranslation] = useState<string | null>(null);

	const {
		handleSubmit,
		control,
		formState: { errors },
		getValues,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const onSubmit = () => {
		const inputText = getValues("translation");
		setUserTranslation(inputText);
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
					<p className="mt-2 p-4 bg-white border rounded break-words">
						{userTranslation}
					</p>
					<h2 className="text-xl font-bold mt-4">答え</h2>
					<p className="mt-2 p-4 bg-white border rounded break-words">{ja}</p>
				</div>
			)}
		</div>
	);
};

export default Translation;
