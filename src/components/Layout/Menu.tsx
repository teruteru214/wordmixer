import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/Ui/Tooltip";
import {
	IconChartBar,
	IconFileTextAi,
	IconHome,
	IconPencil,
	IconSearch,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Menu = () => {
	const { data: session } = useSession();

	if (session) {
		return (
			<nav className="fixed bottom-0 left-0 mb-12 ml-2 sm:ml-6 border flex space-x-2 p-2 rounded-lg drop-shadow-lg animate-fade-in bg-white">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link href="/user">
								<IconHome className="h-7 w-7 text-sm text-gray-400 cursor-pointer hover:bg-gray-100 [stroke-width:1]" />
							</Link>
						</TooltipTrigger>
						<TooltipContent>
							<p className="text-gray-400">作成した例文</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link href="/user/create">
								<IconFileTextAi className="h-7 w-7 text-sm text-gray-400 cursor-pointer hover:bg-gray-100 [stroke-width:1]" />
							</Link>
						</TooltipTrigger>
						<TooltipContent>
							<p className="text-gray-400">例文を作成</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link href="/search">
								<IconSearch className="h-7 w-7 text-sm text-gray-400 cursor-pointer hover:bg-gray-100 [stroke-width:1]" />
							</Link>
						</TooltipTrigger>
						<TooltipContent>
							<p className="text-gray-400">英単語を検索</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link href="/user/memo">
								<IconPencil className="h-7 w-7 text-sm text-gray-400 cursor-pointer hover:bg-gray-100 [stroke-width:1]" />
							</Link>
						</TooltipTrigger>
						<TooltipContent>
							<p className="text-gray-400">メモ</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link href="/user/records">
								<IconChartBar className="h-7 w-7 text-sm text-gray-400 cursor-pointer hover:bg-gray-100 [stroke-width:1]" />
							</Link>
						</TooltipTrigger>
						<TooltipContent>
							<p className="text-gray-400">学習記録</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</nav>
		);
	}
	return null;
};

export default Menu;
