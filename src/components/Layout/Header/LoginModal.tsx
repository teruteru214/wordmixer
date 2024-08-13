import {} from "@/components/Ui/Form";
import { IconBrandGoogle, IconX } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import logo from "../../../public/logo.webp";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../../Ui/AlertDialog";
import { Button } from "../../Ui/Button";

const LoginModal = () => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button className="mr-2" size="xs">
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
				<div className="flex justify-center">
					<Image src={logo} alt="logo" width={300} />
				</div>
				<p className="text-sm">
					覚えたい英単語を元に文章を作成し、翻訳するサービスです
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
