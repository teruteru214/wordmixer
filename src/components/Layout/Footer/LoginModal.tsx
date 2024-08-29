import { IconBrandGoogle, IconX } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import logo from "../../../public/logo.webp";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogTrigger,
} from "../../Ui/AlertDialog";
import { Button } from "../../Ui/Button";

const LoginModal = () => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button className="mb-10 sm:mb-0 animate-fade-in" size="xs">
					ログイン
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent size="xs">
				<div className="flex justify-between item-center">
					<h2 className="text-lg text-center">ログイン</h2>
					<AlertDialogCancel>
						<IconX />
					</AlertDialogCancel>
				</div>
				<div className="flex justify-center">
					<Image src={logo} alt="logo" width={250} />
				</div>
				<p className="text-sm">
					覚えたい英単語を元に文章を生成し、翻訳して学ぶ学習ツールです
				</p>
				<div className="flex flex-col space-y-2">
					<Button onClick={() => signIn("google")}>
						<IconBrandGoogle className="mr-2" />
						Googleアカウントで新規登録
					</Button>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default LoginModal;
