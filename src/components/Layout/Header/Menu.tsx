import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/Ui/DropdownMenu";
import { Toggle } from "@/components/Ui/Toggle";
import {
	IconBrandGithub,
	IconBrandX,
	IconCalendarMonth,
	IconCheckbox,
	IconEdit,
	IconFileStack,
	IconFileTextAi,
	IconFiles,
	IconLogout,
	IconMenu2,
	IconMessageCircle,
	IconThumbUp,
} from "@tabler/icons-react";
import { signOut } from "next-auth/react";

const Menu = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Toggle aria-label="Toggle bold">
					<IconMenu2 />
				</Toggle>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<IconFileStack className="mr-2 h-4 w-4" />
						<span>例文集</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<IconFileTextAi className="mr-2 h-4 w-4" />
						<span>文章作成</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<IconFiles className="mr-2 h-4 w-4" />
						<span>ライブラリ</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<IconCheckbox className="mr-2 h-4 w-4" />
						<span>あとで翻訳</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<IconThumbUp className="mr-2 h-4 w-4" />
						<span>いいね</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<IconEdit className="mr-2 h-4 w-4" />
						<span>メモ</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<IconCalendarMonth className="mr-2 h-4 w-4" />
						<span>学習記録</span>
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => signOut()}>
						<IconLogout className="mr-2 h-4 w-4" />
						<span>ログアウト</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<IconBrandX className="mr-2 h-4 w-4" />
						<span>Xアカウント</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<IconBrandGithub className="mr-2 h-4 w-4" />
						<span>Github</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<IconMessageCircle className="mr-2 h-4 w-4" />
						<span>サービスへの意見・お便り</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<span>本サービスについて</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<span>利用規約</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<span>プライバシーポリシー</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default Menu;
