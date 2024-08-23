import { useMutation } from "@tanstack/react-query";

export const useSaveTextMutation = () => {
	return useMutation({
		mutationFn: async (data: {
			userId: string;
			enText: string;
			jaText: string;
			words: string[];
			level: string;
			theme: string;
		}) => {
			const response = await fetch("/api/texts/save", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			if (!response.ok) {
				throw new Error("Saving text failed");
			}
			return response.json();
		},
		onError: (error) => {
			console.error("Error saving text:", error);
		},
		onSuccess: (data) => {
			console.log("Text saved successfully:", data);
		},
	});
};
