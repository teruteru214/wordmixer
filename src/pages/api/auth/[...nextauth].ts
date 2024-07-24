import NextAuth, { type NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
	providers: [
		Google({
			clientId: process.env.GOOGLE_ID || "",
			clientSecret: process.env.GOOGLE_SECRET || "",
		}),
	],
	session: { strategy: "jwt", maxAge: 90 * 24 * 60 * 60 },
};

export default NextAuth(authOptions);
