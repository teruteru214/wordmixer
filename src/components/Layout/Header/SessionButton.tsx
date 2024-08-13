import { Button } from "@/components/Ui/Button";
import { IconFileTextAi, IconSearch } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import LoginModal from "./LoginModal";
import Menu from "./Menu";

const SessionButton = () => {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return null;
	}

	return (
		<div className="flex items-center space-x-1 animate-fade-in">
			{!session ? (
				<>
					<div className="p-1 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-400">
						<IconSearch size={24} />
					</div>
					<LoginModal />
				</>
			) : (
				<>
					<div className="p-1 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-400">
						<IconSearch size={24} />
					</div>
					<Menu />
					<Button size="xs">
						<IconFileTextAi size={16} />
						文章作成
					</Button>
				</>
			)}
		</div>
	);
};

export default SessionButton;
