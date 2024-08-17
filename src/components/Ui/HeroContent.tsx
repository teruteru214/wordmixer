import type React from "react";

interface HeroContentProps {
	icon: React.ReactNode;
	title: string;
}

const HeroContent = ({ icon, title }: HeroContentProps) => {
	return (
		<div className="h-[100px] sm:h-[150px]">
			<div className="bg-blue-100 w-full h-full">
				<div className="max-w-5xl mx-auto flex items-center p-2 sm:p-6 justify-start h-full">
					<div className="text-2xl mr-3 bg-white rounded-lg w-[60px] h-[60px] sm:w-[100px] sm:h-[100px] flex items-center justify-center">
						{icon}
					</div>
					<h1 className="font-bold text-lg sm:text-2xl sm:ml-4">{title}</h1>
				</div>
			</div>
		</div>
	);
};

export default HeroContent;
