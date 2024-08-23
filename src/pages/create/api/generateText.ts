import { useMutation } from "@tanstack/react-query";

const useGenerateTextMutation = () => {
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
				const errorData = await response.json();
				throw new Error(errorData.message || "Text generation failed");
			}
			return response.json();
		},
		onError: (error) => {
			console.error("Error generating text:", error);
		},
	});
};

export default useGenerateTextMutation;
