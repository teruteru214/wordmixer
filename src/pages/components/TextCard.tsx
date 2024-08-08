import { Card, CardContent } from "@/components/Ui/Card";
import type { TextProps } from "@/types/text";
import { IconFlag, IconThumbUp } from "@tabler/icons-react";

export default function TextCard({ text }: TextProps) {
	// const router = useRouter();

	// const handleClick = () => {
	// 	router.push(`/texts/${text.id}/${translation}`);
	// };

	return (
		<Card
			className="space-y-1 p-2 text-gray-400 text-sm shadow-md cursor-pointer"
			// onClick={handleClick}
		>
			<CardContent className="m-1">
				<div className="flex flex-wrap gap-2 overflow-hidden">
					<div className="truncate">
						{text?.words.map((word) => `#${word}`).join(" ")}
					</div>
				</div>
				<p>{text?.level}</p>
				<div className="flex justify-between items-center">
					<div>
						<p>{text?.theme}</p>
					</div>
					<div className="flex items-center">
						<IconFlag className="w-5 h-5 text-gray-400" />
						<IconThumbUp className="w-5 h-5 text-gray-400" />
						<p className="text-xs">64</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
