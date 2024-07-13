import { Badge } from "@/components/Ui/Badge";
import { Button } from "@/components/Ui/Button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/Ui/Form";

import { Label } from "@/components/Ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/Ui/RadioGroup";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { InputWithEnter } from "./InputWithEnter";

const formSchema = z.object({
	words: z
		.array(
			z.string().regex(/^[a-zA-Z]+$/, { message: "英文字のみ入力できます" }),
		)
		.min(1, { message: "英単語を入力してください" })
		.max(5, { message: "英単語は５つまで選択できます" }),
	level: z.string().nonempty({ message: "難易度を選択してください" }),
	theme: z.string().nonempty({ message: "テーマを選択してください" }),
});

type FormData = z.infer<typeof formSchema>;

const TextForm = () => {
	const [wordList, setWordList] = useState<string[]>([]);
	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			words: [],
			level: "225",
			theme: "business",
		},
	});

	const onSubmit: SubmitHandler<FormData> = (data) => {
		console.log(data);
	};

	const handleEnter = (word: string) => {
		const isValidWord = /^[a-zA-Z]+$/.test(word);
		if (!isValidWord) {
			return;
		}
		if (wordList.length >= 5) {
			return;
		}
		if (wordList.includes(word)) {
			return;
		}
		const newWordList = [...wordList, word];
		setWordList(newWordList);
		form.setValue("words", newWordList);
	};

	const handleRemoveWord = (word: string) => {
		const newWordList = wordList.filter((w) => w !== word);
		setWordList(newWordList);
		form.setValue("words", newWordList);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
				<FormField
					name="words"
					control={form.control}
					render={() => (
						<FormItem>
							<FormLabel htmlFor="words" className="text-lg flex items-center">
								使用する英単語を入力してください(5つまで)
							</FormLabel>
							<FormControl>
								<InputWithEnter id="words" onEnter={handleEnter} />
							</FormControl>
							<ul className="flex flex-wrap gap-2 mt-2">
								{wordList.map((word) => (
									<Badge
										key={word}
										className="text-sm flex items-center max-w-xs break-words"
									>
										{word}
										<IconX
											className="w-4 h-4 ml-1 cursor-pointer"
											onClick={() => handleRemoveWord(word)}
										/>
									</Badge>
								))}
							</ul>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="level"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor="level" className="text-lg">
								難易度を選択してください
							</FormLabel>
							<FormControl>
								<RadioGroup
									id="level"
									name="level"
									value={field.value}
									onValueChange={(value) => field.onChange(value)}
								>
									<div className="space-y-2">
										<div className="flex items-center space-x-1">
											<RadioGroupItem value="225" id="r1" />
											<Label htmlFor="r1" className="cursor-pointer">
												TOEIC(~225)
											</Label>
										</div>
										<div className="flex items-center space-x-1">
											<RadioGroupItem value="226-550" id="r2" />
											<Label htmlFor="r2" className="cursor-pointer">
												TOEIC(226~550)
											</Label>
										</div>
										<div className="flex items-center space-x-1">
											<RadioGroupItem value="551-750" id="r3" />
											<Label htmlFor="r3" className="cursor-pointer">
												TOEIC(551~750)
											</Label>
										</div>
										<div className="flex items-center space-x-1">
											<RadioGroupItem value="751-900" id="r4" />
											<Label htmlFor="r4" className="cursor-pointer">
												TOEIC(751~900)
											</Label>
										</div>
										<div className="flex items-center space-x-1">
											<RadioGroupItem value="901" id="r5" />
											<Label htmlFor="r5" className="cursor-pointer">
												TOEIC(901~)
											</Label>
										</div>
									</div>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="theme"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor="theme" className="text-lg">
								テーマを選択してください
							</FormLabel>
							<FormControl>
								<RadioGroup
									id="theme"
									name="theme"
									value={field.value}
									onValueChange={(value) => field.onChange(value)}
								>
									<div className="space-y-2">
										<div className="flex items-center space-x-1">
											<RadioGroupItem value="business" id="r6" />
											<Label htmlFor="r6" className="cursor-pointer">
												ビジネス
											</Label>
										</div>
										<div className="flex items-center space-x-1">
											<RadioGroupItem value="travel" id="r7" />
											<Label htmlFor="r7" className="cursor-pointer">
												旅行
											</Label>
										</div>
										<div className="flex items-center space-x-1">
											<RadioGroupItem value="health" id="r8" />
											<Label htmlFor="r8" className="cursor-pointer">
												健康
											</Label>
										</div>
										<div className="flex items-center space-x-1">
											<RadioGroupItem value="technology" id="r9" />
											<Label htmlFor="r9" className="cursor-pointer">
												テクノロジー
											</Label>
										</div>
										<div className="flex items-center space-x-1">
											<RadioGroupItem value="education" id="r10" />
											<Label htmlFor="r10" className="cursor-pointer">
												教育
											</Label>
										</div>
										<div className="flex items-center space-x-1">
											<RadioGroupItem value="daily-life" id="r11" />
											<Label htmlFor="r11" className="cursor-pointer">
												日常生活
											</Label>
										</div>
										<div className="flex items-center space-x-1">
											<RadioGroupItem value="art-literature" id="r12" />
											<Label htmlFor="r12" className="cursor-pointer">
												アートと文学
											</Label>
										</div>
										<div className="flex items-center space-x-1">
											<RadioGroupItem value="entertainment" id="r13" />
											<Label htmlFor="r13" className="cursor-pointer">
												エンターテイメント
											</Label>
										</div>
										<div className="flex items-center space-x-1">
											<RadioGroupItem value="environment" id="r14" />
											<Label htmlFor="r14" className="cursor-pointer">
												環境
											</Label>
										</div>
										<div className="flex items-center space-x-1">
											<RadioGroupItem value="history" id="r15" />
											<Label htmlFor="r15" className="cursor-pointer">
												歴史
											</Label>
										</div>
									</div>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex justify-center space-x-1">
					<Button className="text-2xl my-4" size="lg" type="submit">
						文章を作成する
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default TextForm;