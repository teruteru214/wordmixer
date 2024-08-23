import { useMutation } from "@tanstack/react-query";

export const useGenerateTextMutation = () => {
	return useMutation({
		mutationFn: async (data: {
			words: string[];
			level: string;
			theme: string;
		}) => {
			const response = await fetch("/api/texts/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			if (!response.ok) {
				throw new Error("Text generation failed");
			}
			return response.json();
		},
		onError: (error) => {
			console.error("Error generating text:", error);
		},
	});
};
