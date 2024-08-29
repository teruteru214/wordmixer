import { Tabs, TabsList, TabsTrigger } from "@/components/Ui/Tabs";
import { IconSearch } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/router";
import logo from "../../../public/logo.webp";

const Header = () => {
	const router = useRouter();

	const handleSearchClick = () => {
		router.push("/search");
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Enter" || e.key === " ") {
			handleSearchClick();
		}
	};

	return (
		<header className="sticky top-0 left-0 right-0 z-20 bg-white">
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 items-center p-2 sm:mx-4">
					<div className="flex justify-between w-full">
						<div className="flex items-center">
							<Image src={logo} alt="logo" height={35} />
						</div>
						<div className="flex item-center">
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
							<Tabs defaultValue="ja" className="w-[100px]">
								<TabsList className="grid w-full grid-cols-2 bg-white">
									<TabsTrigger value="ja">和訳</TabsTrigger>
									<TabsTrigger value="en">英訳</TabsTrigger>
								</TabsList>
							</Tabs>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
