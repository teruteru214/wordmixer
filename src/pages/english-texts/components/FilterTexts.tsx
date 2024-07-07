import { Input } from "@/components/Ui/Input";
import { useState } from "react";

import type { TextProps, TextsProps } from "@/types/text";
import TextCard from "./TextCard";

const FilterTexts = ({ texts }: TextsProps) => {
	const [filter, setFilter] = useState("");
	const [filteredTexts, setFilteredTexts] = useState(texts);

	const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.toLowerCase();
		setFilter(value);

		const filtered = texts.filter(
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
			{filteredTexts.map((text: TextProps["text"]) => (
				<TextCard key={text.id} text={text} />
			))}
		</>
	);
};

export default FilterTexts;
