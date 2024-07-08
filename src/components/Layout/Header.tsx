import Image from "next/image";
import logo from "../../public/logo.webp";
import { Button } from "../Ui/Button";

const Header = () => {
	return (
		<header className="flex justify-end items-center border-b border-gray-200 p-2">
			<Image src={logo} alt="logo" height={30} />
			<div className="ml-auto">
				<Button className="mr-2" variant="ghost" size="xs">
					ログイン
				</Button>
				<Button size="xs">新規登録</Button>
			</div>
		</header>
	);
};

export default Header;
