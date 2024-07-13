import { Badge } from "@/components/Ui/Badge";
import { Input as BaseInput } from "@/components/Ui/Input";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

export interface InputWithEnterProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	onEnter: (value: string) => void;
}

const InputWithEnter = React.forwardRef<HTMLInputElement, InputWithEnterProps>(
	({ className, onEnter, ...props }, ref) => {
		const [inputValue, setInputValue] = useState("");

		const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Enter") {
				onEnter(inputValue);
				setInputValue("");
				e.preventDefault();
			}
		};

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			setInputValue(e.target.value);
		};

		return (
			<div className="relative">
				<BaseInput
					value={inputValue}
					placeholder="learn, study, read..."
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					className={cn(
						"flex h-10 w-full rounded-full border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
						className,
					)}
					ref={ref}
					{...props}
				/>
				{inputValue && (
					<Badge className="absolute right-2 top-1/2 transform -translate-y-1/2">
						Enterで追加
					</Badge>
				)}
			</div>
		);
	},
);
InputWithEnter.displayName = "InputWithEnter";

export { InputWithEnter };
