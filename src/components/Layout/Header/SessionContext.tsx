import { userAtom } from "@/store/userAtom";
import { useSetAtom } from "jotai";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import LoginModal from "./LoginModal";
import Menu from "./Menu";
import RegisterModal from "./RegisterModal";

const SessionContent = () => {
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

	return session ? (
		<Menu />
	) : (
		<>
			<LoginModal />
			<RegisterModal />
		</>
	);
};

export default SessionContent;
