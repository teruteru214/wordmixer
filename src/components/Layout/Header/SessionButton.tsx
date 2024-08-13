import { Button } from "@/components/Ui/Button";
import { userAtom } from "@/store/userAtom";
import { IconFileTextAi, IconSearch } from "@tabler/icons-react";
import { useSetAtom } from "jotai";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import LoginModal from "./LoginModal";
import Menu from "./Menu";

const SessionButton = () => {
	const { data: session, status } = useSession();
	const setUser = useSetAtom(userAtom);

	useEffect(() => {
		if (session?.user?.email) {
			fetch("/api/user")
				.then((res) => res.json())
				.then((data) => {
					setUser(data.user);
				})
				.catch(() => {
					setUser(null);
				});
		} else {
			setUser(null);
		}
	}, [session, setUser]);

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
