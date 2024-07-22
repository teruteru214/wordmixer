import { IconBrandGoogle, IconX } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
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

const LoginModal = () => {
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
				<Input className="rounded" placeholder="メールアドレス" />
				<Input className="rounded" placeholder="パスワード" />
				<AlertDialogDescription className="text-center">
					パスワードを忘れた方はこちら
				</AlertDialogDescription>
				<div className="flex flex-col space-y-2">
					<Button>ログイン</Button>
					<div className="flex items-center">
						<hr className="flex-grow border-gray-300" />
						<p className="px-2 text-gray-400">または</p>
						<hr className="flex-grow border-gray-300" />
					</div>
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
