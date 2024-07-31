import prisma from "@/lib/prisma";
import NextAuth, { type NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			email: string;
			name: string;
		};
	}
	interface User {
		id: string;
		email: string;
		name: string;
	}
}

export const authOptions: NextAuthOptions = {
	providers: [
		Google({
			clientId: process.env.GOOGLE_ID || "",
			clientSecret: process.env.GOOGLE_SECRET || "",
		}),
	],
	session: {
		strategy: "jwt",
		maxAge: 90 * 24 * 60 * 60,
	},
	callbacks: {
		async session({ session }) {
			if (session.user?.email) {
				const userInfo = await prisma.user.findUnique({
					where: { email: session.user.email },
				});
				if (userInfo) {
					session.user.id = String(userInfo.id);
				}
			}
			return session;
		},

		async jwt({ token, user }) {
			if (user) {
				const userEmail = user.email as string;
				const existingUser = await prisma.user.findUnique({
					where: { email: userEmail },
				});

				if (!existingUser) {
					const userName = user.name as string;
					const newUser = await prisma.user.create({
						data: {
							email: userEmail,
							name: userName,
							password: "",
						},
					});
					token.id = newUser.id;
				} else {
					token.id = existingUser.id;
				}
			}
			return token;
		},
	},
	events: {
		signIn: async ({ user }) => {
			const userEmail = user.email as string;
			const existingUser = await prisma.user.findUnique({
				where: { email: userEmail },
			});

			if (!existingUser) {
				const userName = user.name as string;
				await prisma.user.create({
					data: {
						email: userEmail,
						name: userName,
						password: "",
					},
				});
			}
		},
	},
};

export default NextAuth(authOptions);
