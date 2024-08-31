import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { signOut } from "next-auth/react";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTrigger,
} from "../../Ui/AlertDialog";
import { Button } from "../../Ui/Button";

const LogoutModal = () => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<p className="pb-10 sm:p-0 text-gray-400 animate-fade-in hover:cursor-pointer">
					ログアウト
				</p>
			</AlertDialogTrigger>
			<AlertDialogContent size="xs">
				<p className="text-center">ログアウトしますか？</p>
				<div className="flex flex-col space-y-2">
					<Button
						onClick={() => signOut({ callbackUrl: "/" })}
						variant="outline"
					>
						ログアウト
					</Button>
					<AlertDialogCancel>
						<Button className="w-full" variant="outline">
							キャンセル
						</Button>
					</AlertDialogCancel>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default LogoutModal;
