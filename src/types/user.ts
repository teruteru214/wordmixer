export interface User {
	name: string;
	subscription: "FREE" | "STANDARD" | "ADMIN";
	id: string; // IDフィールドを追加
}
