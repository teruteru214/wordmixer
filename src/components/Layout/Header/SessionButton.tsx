import { Button } from "@/components/Ui/Button";
import { IconFileTextAi, IconSearch } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import LoginModal from "./LoginModal";
import Menu from "./Menu";

const SessionButton = () => {
	const router = useRouter();
	const { data: session, status } = useSession();

	if (status === "loading") {
		return null;
	}

	const handleSearchClick = () => {
		router.push("/search");
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Enter" || e.key === " ") {
			handleSearchClick();
		}
	};

	return (
		<div className="flex items-center space-x-1 animate-fade-in">
			<div
				className="p-1 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-400"
				onClick={handleSearchClick}
				onKeyDown={handleKeyDown}
				role="button"
				tabIndex={0}
				aria-label="Search"
			>
				<IconSearch size={24} />
			</div>

			{!session ? (
				<LoginModal />
			) : (
				<>
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
