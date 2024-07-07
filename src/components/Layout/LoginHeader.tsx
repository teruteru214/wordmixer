import Image from "next/image";

import { IconMenu2, IconX } from "@tabler/icons-react";
import logo from "../../public/logo.webp";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../Ui/Drawer";
import { Tabs, TabsList, TabsTrigger } from "../Ui/Tabs";

const LoginHeader = () => {
	return (
		<header className="border-b border-gray-200 p-2">
			<div className="flex justify-end items-center">
				<Image src={logo} alt="logo" width={150} height={50} />
				<div className="ml-auto">
					<Drawer>
						<DrawerTrigger>
							<IconMenu2 className="w-9 h-9 pt-2" />
						</DrawerTrigger>
						<DrawerContent>
							<DrawerHeader className="flex justify-between items-center">
								<Image src={logo} alt="logo" width={150} height={37} />
								<DrawerClose className="ml-auto">
									<IconX className="w-8 h-8" />
								</DrawerClose>
							</DrawerHeader>
							<DrawerTitle className="sr-only">Menu</DrawerTitle>
							<div className="px-3">
								<dl className="text-xs text-gray-400 my-1">English Text</dl>
								<menu className="space-y-2">
									<li>みんなの英文</li>
									<li>英文を作る</li>
									<li>あなたの英文</li>
									<li>あとで解く</li>
									<li>いいね</li>
								</menu>
								<dl className="text-xs text-gray-400 my-1">User</dl>
								<menu className="space-y-2">
									<li>学習記録</li>
									<li>ログアウト</li>
								</menu>
								<dl className="text-xs text-gray-400 my-1">About</dl>
								<menu className="space-y-2">
									<li>本サービス</li>
								</menu>
								<dl className="text-xs text-gray-400 my-1">Others</dl>
								<menu className="space-y-2">
									<li>利用規約</li>
									<li>プライバシーポリシー</li>
									<li>お問い合わせ</li>
								</menu>
								<dl className="text-xs text-gray-400 my-1">Related sites</dl>
								<menu className="space-y-2">
									<li>Xアカウント</li>
									<li>Github</li>
									<li>Qiita記事</li>
								</menu>
							</div>
						</DrawerContent>
					</Drawer>
				</div>
			</div>
			<Tabs>
				<TabsList className="grid w-full grid-cols-4">
					<TabsTrigger value="all">みんなの英文</TabsTrigger>
					<TabsTrigger value="create">英文を作る</TabsTrigger>
					<TabsTrigger value="index">あなたの英文</TabsTrigger>
					<TabsTrigger value="user">学習記録</TabsTrigger>
				</TabsList>
			</Tabs>
		</header>
	);
};

export default LoginHeader;
