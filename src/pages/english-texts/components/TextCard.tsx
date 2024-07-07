import { Badge } from "@/components/Ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Ui/Card";
import { Checkbox } from "@/components/Ui/Checkbox";

import type { TextProps } from "@/types/text";

import {
	IconLanguageHiragana,
	IconThumbUp,
	IconTrash,
} from "@tabler/icons-react";

export default function TextCard({ text }: TextProps) {
	return (
		<Card className="my-4">
			<CardHeader>
				<CardTitle>{text.english}</CardTitle>
			</CardHeader>
			<hr />
			<CardContent className="space-y-1">
				<div className="flex flex-wrap gap-2 mt-2 text-gray-400">
					{text.words.map((word) => (
						<Badge key={word}>{word}</Badge>
					))}
				</div>
				<p className="text-sm text-gray-400">{text.level}</p>
				<div className="flex items-center justify-between text-gray-400 text-sm">
					<p>{text.theme}</p>
					<div className="flex items-center space-x-2">
						<Checkbox id={`terms-${text.id}`} />
						<label htmlFor={`terms-${text.id}`}>あとで翻訳</label>
						<IconLanguageHiragana className="w-5 h-5 text-gray-400" />
						<IconThumbUp className="w-5 h-5 text-gray-400" />
						<IconTrash className="w-5 h-5 text-gray-400" />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
