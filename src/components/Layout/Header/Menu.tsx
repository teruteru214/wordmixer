import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/Ui/DropdownMenu";
import {
	IconAlertCircle,
	IconDotsCircleHorizontal,
	IconLogout,
} from "@tabler/icons-react";
import { signOut } from "next-auth/react";

const Menu = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className="text-gray-400 p-1 rounded hover:bg-gray-100 cursor-pointer">
					<IconDotsCircleHorizontal size={24} />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-40">
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<IconAlertCircle className="mr-2 h-4 w-4" />
						<span>アプリの使い方</span>
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => signOut()}>
						<IconLogout className="mr-2 h-4 w-4" />
						<span>ログアウト</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default Menu;
