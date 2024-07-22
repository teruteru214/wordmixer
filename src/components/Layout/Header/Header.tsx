import Image from "next/image";
import logo from "../../../public/logo.webp";
import SessionContent from "./SessionContext";

const Header = () => {
	return (
		<header className="flex justify-end items-center border-b border-gray-200 p-2">
			<Image src={logo} alt="logo" height={30} />
			<div className="ml-auto">
				<SessionContent />
			</div>
		</header>
	);
};

export default Header;
