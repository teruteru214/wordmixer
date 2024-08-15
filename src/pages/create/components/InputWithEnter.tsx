import { Badge } from "@/components/Ui/Badge";
import { Input as BaseInput } from "@/components/Ui/Input";
import { cn } from "@/lib/utils";
import words from "an-array-of-english-words";
import React, { useState } from "react";

export interface InputWithEnterProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	onEnter: (value: string) => void;
}

const InputWithEnter = React.forwardRef<HTMLInputElement, InputWithEnterProps>(
	({ className, onEnter, ...props }, ref) => {
		const [inputValue, setInputValue] = useState("");
		const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>(
			[],
		);

		const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Enter") {
				onEnter(inputValue);
				setInputValue("");
				e.preventDefault();
			}
		};

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value;
			setInputValue(value);
			if (value) {
				const filtered = words
					.filter((word) => word.toLowerCase().startsWith(value.toLowerCase()))
					.slice(0, 10);
				setFilteredSuggestions(filtered);
			} else {
				setFilteredSuggestions([]);
			}
		};

		const handleSuggestionClick = (word: string) => {
			onEnter(word);
			setInputValue("");
			setFilteredSuggestions([]);
		};

		const handleSuggestionKeyDown = (
			e: React.KeyboardEvent<HTMLButtonElement>,
			word: string,
		) => {
			if (e.key === "Enter" || e.key === " ") {
				onEnter(word);
				setInputValue("");
				setFilteredSuggestions([]);
				e.preventDefault();
			}
		};

		return (
			<div className="relative w-full">
				<BaseInput
					value={inputValue}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					className={cn(
						"flex h-10 rounded w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
						className,
					)}
					placeholder="英単語を入力してください"
					ref={ref}
					{...props}
				/>
				{inputValue && (
					<Badge
						className="absolute right-2 top-1/2 transform -translate-y-1/2 hidden md:block"
						variant="secondary"
					>
						Enterで追加
					</Badge>
				)}
				{filteredSuggestions.length > 0 && (
					<ul className="absolute z-10 -mt-0.5 w-full bg-white border-r border-l border-b rounded-b-md">
						{filteredSuggestions.map((word) => (
							<li key={word}>
								<button
									type="button"
									className="w-full text-left p-2 cursor-pointer hover:bg-gray-100"
									onClick={() => handleSuggestionClick(word)}
									onKeyDown={(e) => handleSuggestionKeyDown(e, word)}
								>
									{word}
								</button>
							</li>
						))}
					</ul>
				)}
			</div>
		);
	},
);

InputWithEnter.displayName = "InputWithEnter";

export default InputWithEnter;
