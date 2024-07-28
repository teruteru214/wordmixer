import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/Ui/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconBrandGoogle, IconX } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../../Ui/AlertDialog";
import { Button } from "../../Ui/Button";
import { Input } from "../../Ui/Input";

const schema = z.object({
	email: z
		.string()
		.nonempty({ message: "メールアドレスを入力してください" })
		.email({ message: "有効なメールアドレスを入力してください" }),
	password: z.string().min(8, { message: "パスワードは8文字以上です" }),
});

type FormData = z.infer<typeof schema>;

const LoginModal = () => {
	const methods = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const {
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = methods;

	const onSubmit = (data: FormData) => {
		console.log("Login form submitted", data);
		reset();
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button className="mr-2" variant="ghost" size="xs">
					ログイン
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>ログイン</AlertDialogTitle>
					<AlertDialogCancel>
						<IconX />
					</AlertDialogCancel>
				</AlertDialogHeader>
				<FormProvider {...methods}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<FormField
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											className="rounded"
											placeholder="example@gmail.com"
											{...field}
										/>
									</FormControl>
									{errors.email && (
										<FormMessage>{errors.email.message}</FormMessage>
									)}
								</FormItem>
							)}
						/>

						<FormField
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											type="password"
											className="rounded"
											placeholder="8 characters or more"
											{...field}
										/>
									</FormControl>
									{errors.password && (
										<FormMessage>{errors.password.message}</FormMessage>
									)}
								</FormItem>
							)}
						/>

						<AlertDialogDescription className="text-center">
							パスワードを忘れた方はこちら
						</AlertDialogDescription>
						<div className="flex flex-col space-y-2">
							<Button type="submit" variant={isValid ? "default" : "disabled"}>
								ログイン
							</Button>
						</div>
					</form>
				</FormProvider>
				<div className="flex items-center">
					<hr className="flex-grow border-gray-300" />
					<p className="px-2 text-gray-400">または</p>
					<hr className="flex-grow border-gray-300" />
				</div>
				<div className="flex flex-col space-y-2">
					<Button onClick={() => signIn("google")}>
						<IconBrandGoogle className="mr-2" />
						Googleアカウントで新規登録
					</Button>
				</div>
				<AlertDialogDescription className="text-center">
					新規登録の方はこちら
				</AlertDialogDescription>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default LoginModal;
