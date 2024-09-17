import { Button } from "@/components/Ui/Button";
import { Textarea } from "@/components/Ui/Textarea";
import { userAtom } from "@/store/userAtom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface TranslationProps {
	id: number;
	ja: string;
	flag: boolean;
}

const schema = z.object({
	translation: z.string().min(1, "和訳を入力してください"),
});

type FormData = z.infer<typeof schema>;

const Translation = ({ id, ja, flag }: TranslationProps) => {
	const [showResults, setShowResults] = useState(false);
	const [userTranslation, setUserTranslation] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const user = useAtomValue(userAtom);

	const {
		handleSubmit,
		control,
		formState: { errors },
		getValues,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const onSubmit = async () => {
		const inputText = getValues("translation");
		setUserTranslation(inputText);
		setIsLoading(true);
		if (user && !flag) {
			try {
				const response = await fetch("/api/texts/flag-create", {
					method: "POST",
					body: JSON.stringify({ userId: user.id, textId: id }),
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (!response.ok) {
					throw new Error("Flag registration failed");
				}

				const data = await response.json();
				console.log("Flag successfully registered", data);
			} catch (error) {
				console.error("Error registering flag:", error);
			}
		} else if (flag) {
			console.log("Flag is already registered for this text.");
		}
		setShowResults(true);
		setIsLoading(false);
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
							{isLoading ? (
								<div className="flex items-center justify-center">
									<div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent mr-2" />
									答え合わせ
								</div>
							) : (
								"答え合わせ"
							)}
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
