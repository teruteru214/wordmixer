export interface User {
	id: string;
	name: string;
	subscription: "FREE" | "STANDARD" | "ADMIN";
}
