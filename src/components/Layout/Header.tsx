import { IconBrandGoogle, IconX } from "@tabler/icons-react";
import Image from "next/image";
import logo from "../../public/logo.webp";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../Ui/AlertDialog";
import { Button } from "../Ui/Button";
import { Input } from "../Ui/Input";

const Header = () => {
	return (
		<header className="flex justify-end items-center border-b border-gray-200 p-2">
			<Image src={logo} alt="logo" height={30} />
			<div className="ml-auto">
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
							<Button>
								<IconBrandGoogle className="mr-2" />
								Googleアカウントでログイン
							</Button>
						</div>
						<AlertDialogDescription className="text-center">
							新規登録の方はこちら
						</AlertDialogDescription>
					</AlertDialogContent>
				</AlertDialog>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button className="mr-2" size="xs">
							新規登録
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>新規登録</AlertDialogTitle>
							<AlertDialogCancel>
								<IconX />
							</AlertDialogCancel>
						</AlertDialogHeader>
						<Input className="rounded" placeholder="メールアドレス" />
						<Input className="rounded" placeholder="パスワード" />
						<Input className="rounded" placeholder="パスワード(確認)" />
						<AlertDialogDescription>
							利用規約およびプライバシーポリシーに同意した上で、
							以下の「登録」ボタンを押してください。
						</AlertDialogDescription>
						<div className="flex flex-col space-y-2">
							<Button>新規登録</Button>
							<div className="flex items-center">
								<hr className="flex-grow border-gray-300" />
								<p className="px-2 text-gray-400">または</p>
								<hr className="flex-grow border-gray-300" />
							</div>
							<Button>
								<IconBrandGoogle className="mr-2" />
								Googleアカウントで新規登録
							</Button>
						</div>
						<AlertDialogDescription className="text-center">
							登録済みの方はこちら
						</AlertDialogDescription>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</header>
	);
};

export default Header;
