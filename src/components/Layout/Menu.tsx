import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/Ui/Tooltip";
import { userAtom } from "@/store/userAtom";
import {
	IconCards,
	IconChartBar,
	IconFileTextAi,
	IconFlag,
	IconHome,
	IconPencil,
	IconSquareCheck,
} from "@tabler/icons-react";
import { useAtomValue } from "jotai";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Menu = () => {
	const { data: session } = useSession();
	const user = useAtomValue(userAtom);
	const router = useRouter();

	const normalizedUserName = user?.name.replace(/\s+/g, "").toLowerCase();

	const navigateTo = (path: string) => {
		router.push(path);
	};

	if (session) {
		return (
			<menu className="fixed bottom-0 left-0 mb-12 ml-2 sm:ml-6 border flex space-x-2 p-2 rounded-lg drop-shadow-lg animate-fade-in bg-white">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<IconHome
								className="h-7 w-7 text-sm text-gray-400 cursor-pointer hover:bg-gray-100 [stroke-width:1]"
								onClick={() => navigateTo(`/${normalizedUserName}`)}
							/>
						</TooltipTrigger>
						<TooltipContent>
							<p className="text-gray-400">作成した例文</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<IconFileTextAi
								className="h-7 w-7 text-sm text-gray-400 cursor-pointer hover:bg-gray-100 [stroke-width:1]"
								onClick={() => navigateTo(`/${normalizedUserName}/create`)}
							/>
						</TooltipTrigger>
						<TooltipContent>
							<p className="text-gray-400">例文を作成</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<IconSquareCheck
								className="h-7 w-7 text-sm text-gray-400 cursor-pointer hover:bg-gray-100 [stroke-width:1]"
								onClick={() => navigateTo(`/${normalizedUserName}/check`)}
							/>
						</TooltipTrigger>
						<TooltipContent>
							<p className="text-gray-400">あとで翻訳</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<IconFlag
								className="h-7 w-7 text-sm text-gray-400 cursor-pointer hover:bg-gray-100 [stroke-width:1]"
								onClick={() => navigateTo(`/${normalizedUserName}/flags`)}
							/>
						</TooltipTrigger>
						<TooltipContent>
							<p className="text-gray-400">翻訳した例文</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<IconPencil
								className="h-7 w-7 text-sm text-gray-400 cursor-pointer hover:bg-gray-100 [stroke-width:1]"
								onClick={() => navigateTo(`/${normalizedUserName}/memo`)}
							/>
						</TooltipTrigger>
						<TooltipContent>
							<p className="text-gray-400">メモした例文</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<IconCards
								className="h-7 w-7 text-sm text-gray-400 cursor-pointer hover:bg-gray-100 [stroke-width:1]"
								onClick={() => navigateTo(`/${normalizedUserName}/vocaburary`)}
							/>
						</TooltipTrigger>
						<TooltipContent>
							<p className="text-gray-400">単語帳</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<IconChartBar
								className="h-7 w-7 text-sm text-gray-400 cursor-pointer hover:bg-gray-100 [stroke-width:1]"
								onClick={() => navigateTo(`/${normalizedUserName}/records`)}
							/>
						</TooltipTrigger>
						<TooltipContent>
							<p className="text-gray-400">学習記録</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</menu>
		);
	}
	return null;
};

export default Menu;
