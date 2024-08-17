import { Input as BaseInput } from "@/components/Ui/Input";
import { cn } from "@/lib/utils";
import { IconTextPlus, IconX } from "@tabler/icons-react";
import words from "an-array-of-english-words";
import React, { useState } from "react";

export interface InputWordProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	placeholder?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputWord = React.forwardRef<HTMLInputElement, InputWordProps>(
	({ className, placeholder, value, onChange, ...props }, ref) => {
		const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>(
			[],
		);

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			onChange(e);
			const inputValue = e.target.value;
			if (inputValue) {
				const filtered = words
					.filter((word) =>
						word.toLowerCase().startsWith(inputValue.toLowerCase()),
					)
					.slice(0, 10);
				setFilteredSuggestions(filtered);
			} else {
				setFilteredSuggestions([]);
			}
		};

		const handleClearInput = () => {
			const event = {
				target: { value: "" },
			} as React.ChangeEvent<HTMLInputElement>;
			onChange(event);
			setFilteredSuggestions([]);
		};

		const handleSuggestionClick = (word: string) => {
			const event = {
				target: { value: word },
			} as React.ChangeEvent<HTMLInputElement>;
			onChange(event);
			setFilteredSuggestions([]);
		};

		return (
			<div className="relative w-full">
				<BaseInput
					value={value}
					onChange={handleChange} // React Hook Form の onChange を利用
					className={cn(
						"flex h-9 rounded w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
						className,
					)}
					placeholder={placeholder}
					ref={ref}
					{...props}
				/>
				{value && (
					<IconX
						className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
						onClick={handleClearInput}
					/>
				)}
				{filteredSuggestions.length > 0 && (
					<ul
						className="absolute z-10 -mt-0.5 w-full bg-white border-r border-l border-b rounded-b-md"
						aria-label="Search suggestions"
					>
						{filteredSuggestions.map((word) => (
							<li key={word}>
								<button
									type="button"
									className="w-full flex items-center text-left p-2 cursor-pointer hover:bg-gray-100"
									onClick={() => handleSuggestionClick(word)}
								>
									<IconTextPlus className="w-4 h-4 mr-4" />
									<span>{word}</span>
								</button>
							</li>
						))}
					</ul>
				)}
			</div>
		);
	},
);

InputWord.displayName = "InputWord";

export default InputWord;
