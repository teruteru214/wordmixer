import { useSession } from "next-auth/react";
import LoginModal from "./LoginModal";
import Menu from "./Menu";
import RegisterModal from "./RegisterModal";

const SessionContent = () => {
	const { data: session, status } = useSession();

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
