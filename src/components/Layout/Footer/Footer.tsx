import { userAtom } from "@/store/userAtom";
import { useSetAtom } from "jotai";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import LoginModal from "./LoginModal";
import LogoutModal from "./LogoutModal";

const Footer = () => {
	const { data: session, status } = useSession();

	const setUser = useSetAtom(userAtom);

	useEffect(() => {
		if (session?.user?.email) {
			fetch("/api/user", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email: session.user.email }),
			})
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

	return (
		<footer className="h-[400px] sm:h-[200px]">
			<div className="max-w-7xl mx-auto h-full flex items-center justify-center">
				<div className="w-full mx-2 sm:mx-7">
					<div className="sm:flex">
						{status !== "loading" &&
							(session ? <LogoutModal /> : <LoginModal />)}
						<div className="ml-auto flex space-x-7 sm:space-x-20">
							<menu className="text-left">
								<li className="text-gray-400 hover:underline hover:cursor-pointer">
									本サービスについて
								</li>
							</menu>
							<menu className="text-left space-y-3">
								<li className="text-gray-400 hover:underline hover:cursor-pointer">
									利用規約
								</li>
								<li className="text-gray-400 hover:underline hover:cursor-pointer">
									プライバシーポリシー
								</li>
								<li className="text-gray-400 hover:underline hover:cursor-pointer">
									お問い合わせ
								</li>
							</menu>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
