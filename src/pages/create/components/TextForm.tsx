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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/Ui/Select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputWord from "./InputWord";

const formSchema = z
	.object({
		words: z.object({
			word1: z
				.string()
				.regex(/^[a-zA-Z]*$/, { message: "英単語を入力してください" }),
			word2: z
				.string()
				.regex(/^[a-zA-Z]*$/, { message: "英単語を入力してください" }),
			word3: z
				.string()
				.regex(/^[a-zA-Z]*$/, { message: "英単語を入力してください" }),
			word4: z
				.string()
				.regex(/^[a-zA-Z]*$/, { message: "英単語を入力してください" }),
			word5: z
				.string()
				.regex(/^[a-zA-Z]*$/, { message: "英単語を入力してください" }),
		}),
		level: z.string().nonempty({ message: "難易度を選択してください" }),
		theme: z.string().nonempty({ message: "テーマを選択してください" }),
	})
	.refine(
		(data) =>
			Object.values(data.words).some(
				(word) => word.trim() !== "" && /^[a-zA-Z]+$/.test(word),
			),
		{
			message: "少なくとも1つの英単語を入力してください",
			path: ["words.word1"],
		},
	);

type FormData = z.infer<typeof formSchema>;

const TextForm = () => {
	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			words: {
				word1: "",
				word2: "",
				word3: "",
				word4: "",
				word5: "",
			},
			level: "very-easy",
			theme: "business",
		},
	});

	const onSubmit = (data: FormData) => {
		console.log(data);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
				<FormLabel className="text-lg flex items-center">
					1つ以上の英単語(熟語)を入力してください
				</FormLabel>
				<FormField
					name="words.word1"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<InputWord
									{...field}
									placeholder="１つ目の英単語を入力してください"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="words.word2"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<InputWord
									{...field}
									placeholder="２つ目の英単語を入力してください"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="words.word3"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<InputWord
									{...field}
									placeholder="３つ目の英単語を入力してください"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="words.word4"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<InputWord
									{...field}
									placeholder="４つ目の英単語を入力してください"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="words.word5"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<InputWord
									{...field}
									placeholder="５つ目の英単語を入力してください"
								/>
							</FormControl>
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
											<RadioGroupItem value="very-easy" id="r1" />
											<Label htmlFor="r1" className="cursor-pointer">
												Very Easy
											</Label>
										</div>
										<div className="flex items-center space-x-1">
											<RadioGroupItem value="easy" id="r2" />
											<Label htmlFor="r2" className="cursor-pointer">
												Easy
											</Label>
										</div>
										<div className="flex items-center space-x-1">
											<RadioGroupItem value="medium" id="r3" />
											<Label htmlFor="r3" className="cursor-pointer">
												Medium
											</Label>
										</div>
										<div className="flex items-center space-x-1">
											<RadioGroupItem value="hard" id="r4" />
											<Label htmlFor="r4" className="cursor-pointer">
												Hard
											</Label>
										</div>
										<div className="flex items-center space-x-1">
											<RadioGroupItem value="very-hard" id="r5" />
											<Label htmlFor="r5" className="cursor-pointer">
												Very Hard
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
							<FormLabel htmlFor="themes" className="text-lg">
								テーマを選択してください
							</FormLabel>
							<FormControl>
								<Select
									onValueChange={(value) => field.onChange(value)}
									value={field.value}
								>
									<SelectTrigger>
										<SelectValue placeholder="テーマを選択" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="business">ビジネス</SelectItem>
										<SelectItem value="travel">旅行</SelectItem>
										<SelectItem value="health">健康</SelectItem>
										<SelectItem value="technology">テクノロジー</SelectItem>
										<SelectItem value="education">教育</SelectItem>
										<SelectItem value="daily-life">日常生活</SelectItem>
										<SelectItem value="art-and-literature">
											アートと文学
										</SelectItem>
										<SelectItem value="entertainment">
											エンターテイメント
										</SelectItem>
										<SelectItem value="environment">環境</SelectItem>
										<SelectItem value="history">歴史</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className="w-full text-2xl my-4" size="lg" type="submit">
					文章を作成する
				</Button>
			</form>
		</Form>
	);
};

export default TextForm;
