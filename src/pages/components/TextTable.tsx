import { Button } from "@/components/Ui/Button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/Ui/Table";
import reading from "@/public/reading.webp";
import type { TextProps } from "@/types/text";
import { IconFileTextAi, IconFlag } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/router";

const TextTable = ({ texts = [] }: TextProps) => {
	const router = useRouter();

	const handlePageCreate = () => {
		router.push("/user/create");
	};

	const handleRowClick = (id: number) => {
		router.push(`/texts/${id}`);
	};

	if (texts.length === 0) {
		return (
			<div className="mt-16 mb-96">
				<div className="flex justify-center">
					<Image src={reading} alt="No results" height={150} />
				</div>
				<p className="mt-16 text-center">
					英単語をまとめて文章にして覚えよう！
				</p>
				<div className="flex justify-center">
					<Button className="mt-4" size="lg" onClick={handlePageCreate}>
						<IconFileTextAi className="h-6 w-6 mr-2" />
						例文を生成する
					</Button>
				</div>
			</div>
		);
	}

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
					<TableRow
						key={text.id}
						onClick={() => handleRowClick(text.id)}
						className="cursor-pointer hover:bg-gray-100"
					>
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
