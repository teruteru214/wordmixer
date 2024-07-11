import { Card } from "@/components/Ui/Card";
import { Checkbox } from "@/components/Ui/Checkbox";

import type { TextProps } from "@/types/text";

import {
	IconEdit,
	IconLanguageHiragana,
	IconThumbUp,
	IconTrash,
} from "@tabler/icons-react";

export default function TextCard({ text }: TextProps) {
	return (
		<Card className="space-y-1 p-2 text-gray-400 text-sm">
			<div className="flex flex-wrap gap-2 overflow-hidden">
				<div className="truncate">
					{text?.words.map((word) => `#${word}`).join(" ")}
				</div>
			</div>
			<p>{text?.level}</p>
			<p>{text?.theme}</p>
			<hr />
			<div className="flex items-center justify-between gap-2">
				<div className="flex items-center gap-2">
					<Checkbox id={`terms-${text?.id}`} />
					<label htmlFor={`terms-${text?.id}`}>あとで翻訳</label>
				</div>
				<div className="flex items-center gap-2 ml-auto">
					<IconLanguageHiragana className="w-5 h-5 text-gray-400" />
					<IconEdit className="w-5 h-5 text-gray-400" />
					<IconThumbUp className="w-5 h-5 text-gray-400" />
					<IconTrash className="w-5 h-5 text-gray-400" />
				</div>
			</div>
		</Card>
	);
}
