import { Button } from "@/components/Ui/Button";
import { Input } from "@/components/Ui/Input";
import ai from "@/public/ai.webp";
import type { TextProps, TextsProps } from "@/types/text";
import Image from "next/image";
import { useState } from "react";
import TextCard from "./TextCard";

const FilterTexts = ({ texts }: TextsProps) => {
	const [filter, setFilter] = useState("");
	const [filteredTexts, setFilteredTexts] = useState<TextProps["text"][]>(
		texts || [],
	);

	const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.toLowerCase();
		setFilter(value);

		const filtered = (texts || []).filter(
			(text) =>
				text.english.toLowerCase().includes(value) ||
				text.level.toLowerCase().includes(value) ||
				text.theme.toLowerCase().includes(value),
		);
		setFilteredTexts(filtered);
	};

	return (
		<>
			<Input
				placeholder="英単語、難易度、テーマなど絞り込めます"
				value={filter}
				onChange={handleFilterChange}
			/>
			{filteredTexts.length > 0 ? (
				filteredTexts.map((text) => <TextCard key={text?.id} text={text} />)
			) : (
				<div className="my-28">
					<div className="flex justify-center">
						<Image src={ai} alt="ai" height={300} />
					</div>
					<p className="text-gray-400 text-center mt-2">
						英文が作成されていません・・
						<br />
						AIと一緒に英文を作成しましょう！
					</p>
					<Button
						className="flex justify-center text-2xl mt-4 mx-auto"
						size="lg"
					>
						英文を作成する
					</Button>
				</div>
			)}
		</>
	);
};

export default FilterTexts;
