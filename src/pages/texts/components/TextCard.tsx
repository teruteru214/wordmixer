import { Card, CardContent } from "@/components/Ui/Card";
import { Checkbox } from "@/components/Ui/Checkbox";

import type { TextProps } from "@/types/text";

import {
	IconEdit,
	IconFlag,
	IconThumbUp,
	IconTrash,
} from "@tabler/icons-react";
import { useRouter } from "next/router";

export default function TextCard({ text, translation }: TextProps) {
	const router = useRouter();

	const handleClick = () => {
		router.push(`/texts/${text.id}/${translation}`);
	};

	return (
		<Card className="space-y-1 p-2 text-gray-400 text-sm shadow-md">
			<CardContent className="m-1 cursor-pointer" onClick={handleClick}>
				<div className="flex flex-wrap gap-2 overflow-hidden">
					<div className="truncate">
						{text?.words.map((word) => `#${word}`).join(" ")}
					</div>
				</div>
				<p>{text?.level}</p>
				<p>{text?.theme}</p>
			</CardContent>
			<hr />
			<div className="flex items-center justify-between gap-2 m-1">
				<div className="flex items-center gap-1">
					<Checkbox id={`terms-${text?.id}`} />
					<label className="cursor-pointer" htmlFor={`terms-${text?.id}`}>
						あとで翻訳
					</label>
				</div>
				<div className="flex items-center gap-2 ml-auto">
					<IconFlag className="w-5 h-5 text-gray-400" />
					<IconEdit className="w-5 h-5 text-gray-400" />
					<IconThumbUp className="w-5 h-5 text-gray-400" />
					<IconTrash className="w-5 h-5 text-gray-400" />
				</div>
			</div>
		</Card>
	);
}
