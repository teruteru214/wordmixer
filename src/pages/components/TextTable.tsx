import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/Ui/Table";
import type { TextProps } from "@/types/text";
import { IconFlag } from "@tabler/icons-react";

const TextTable = ({ texts }: TextProps) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-3/4 md:w-2/3">Words</TableHead>
					<TableHead className="hidden md:table-cell">Level</TableHead>
					<TableHead className="hidden md:table-cell">Theme</TableHead>
					<TableHead>Flag</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{texts.map((text) => (
					<TableRow key={text.id}>
						<TableCell className="max-w-[18rem] truncate">
							{text?.words.map((word) => `#${word}`).join(" ")}
						</TableCell>
						<TableCell className="hidden md:table-cell">{text.level}</TableCell>
						<TableCell className="hidden md:table-cell">{text.theme}</TableCell>
						<TableCell>
							<IconFlag className="h-6 w-6 opacity-0" />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default TextTable;
