import { Tabs, TabsList, TabsTrigger } from "@/components/Ui/Tabs";
import {} from "@tabler/icons-react";
import Image from "next/image";
import logo from "../../../public/logo.webp";
import { HeaderNavigation } from "./HeaderNavigation";
import SessionButton from "./SessionButton";

const Header = () => {
	return (
		<header className="sticky top-0 left-0 right-0 z-50 grid grid-cols-1 gap-4 items-center px-2 pt-2 bg-white h-[100px]">
			<div className="flex justify-between w-full">
				<div className="flex items-center">
					<Image src={logo} alt="logo" height={35} />
				</div>
				<SessionButton />
			</div>
			<div className="flex justify-between w-full">
				<HeaderNavigation />
				<Tabs defaultValue="ja" className="w-[100px]">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="ja">和訳</TabsTrigger>
						<TabsTrigger value="en">英訳</TabsTrigger>
					</TabsList>
				</Tabs>
			</div>
		</header>
	);
};

export default Header;
