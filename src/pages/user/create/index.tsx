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
import {} from "@/components/Ui/RadioGroup";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/Ui/Select";
import { ToastAction } from "@/components/Ui/Toast";
import { useToast } from "@/components/Ui/hooks/useToast";
import { userAtom } from "@/store/userAtom";
import styles from "@/styles/writing.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconArrowRight, IconReload } from "@tabler/icons-react";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputWord from "./components/InputWord";

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

export default function Create() {
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();
	const user = useAtomValue(userAtom);

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
			level: "とても簡単",
			theme: "ビジネス",
		},
	});

	const handleClear = () => {
		form.reset();
	};

	const onSubmit = async (data: FormData) => {
		if (!user?.id) {
			console.error("User not authenticated");
			return;
		}

		const filteredWords = Object.values(data.words).filter(
			(word) => word.trim() !== "",
		);

		try {
			setLoading(true);
			const response = await fetch("/api/texts/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					words: filteredWords,
					level: data.level,
					theme: data.theme,
					userId: user.id,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.message || "Text generation and saving failed",
				);
			}

			setLoading(false);
			toast({
				title: "例文を生成しました🎉",
				description: "Let's Translation",
				action: (
					<ToastAction
						altText="Complate"
						className="p-0 border-none bg-transparent"
					>
						<IconArrowRight />
					</ToastAction>
				),
			});
		} catch {
			setLoading(false);
			toast({
				variant: "destructive",
				title: "例文を生成に失敗しました🙇",
				description: "もう一度生成し直してください",
			});
		}
	};

	return (
		<div>
			<div className="max-w-md mx-auto">
				<div className="mx-2 h-screen flex justify-center items-center">
					<div className="flex-1 h-[700px] w-full">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-3"
							>
								<Button
									className="text-xs rounded-sm"
									size="xs"
									onClick={handleClear}
								>
									<IconReload className="w-4 h-4 mr-1" />
									クリア
								</Button>
								<div className="flex items-center">
									<FormLabel className="text-lg">
										例文に使う英単語(熟語)を入力してください
									</FormLabel>
									<Badge variant="destructive" className="ml-1">
										必須
									</Badge>
								</div>
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
											<FormLabel htmlFor="level" className="text-lg mt-4">
												例文の難易度を選択してください
											</FormLabel>
											<FormControl>
												<Select
													onValueChange={(value) => field.onChange(value)}
													value={field.value}
												>
													<SelectTrigger>
														<SelectValue placeholder="難易度を選択" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="とても簡単">
															とても簡単 (TOEIC 250~400)
														</SelectItem>
														<SelectItem value="簡単">
															簡単 (TOEIC 400~550)
														</SelectItem>
														<SelectItem value="普通">
															普通 (TOEIC 550~700)
														</SelectItem>
														<SelectItem value="難しい">
															難しい (TOEIC 700~850)
														</SelectItem>
														<SelectItem value="とても難しい">
															とても難しい (TOEIC 850~)
														</SelectItem>
													</SelectContent>
												</Select>
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
											<FormLabel htmlFor="themes" className="text-lg mt-4">
												例文のテーマを選択してください
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
														<SelectItem value="ビジネス">ビジネス</SelectItem>
														<SelectItem value="旅行">旅行</SelectItem>
														<SelectItem value="健康">健康</SelectItem>
														<SelectItem value="テクノロジー">
															テクノロジー
														</SelectItem>
														<SelectItem value="教育">教育</SelectItem>
														<SelectItem value="日常生活">日常生活</SelectItem>
														<SelectItem value="アートと文学">
															アートと文学
														</SelectItem>
														<SelectItem value="エンターテイメント">
															エンターテイメント
														</SelectItem>
														<SelectItem value="環境">環境</SelectItem>
														<SelectItem value="歴史">歴史</SelectItem>
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button
									className="w-full rounded-lg text-xl mt-4"
									size="lg"
									type="submit"
									variant={form.formState.isValid ? "default" : "disabled"}
								>
									{loading ? (
										<div className="flex items-center">
											<div className={styles.mikepadLoading}>
												<div className={styles.pad}>
													<div className={`${styles.line} ${styles.line1}`} />
													<div className={`${styles.line} ${styles.line2}`} />
													<div className={`${styles.line} ${styles.line3}`} />
												</div>
											</div>
											<span className="ml-2 animate-pulse">生成中...</span>
										</div>
									) : (
										"例文を生成"
									)}
								</Button>
							</form>
						</Form>
					</div>
				</div>
			</div>
		</div>
	);
}
