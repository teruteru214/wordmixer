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
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async session({ session }) {
			if (session.user?.email) {
				const userInfo = await prisma.user.findUnique({
					where: { email: session.user.email },
				});
				if (userInfo) {
					session.user.id = userInfo.id.toString();
				}
			}
			return session;
		},
		async jwt({ token, user }) {
			if (user) {
				const existingUser = await prisma.user.findUnique({
					where: { email: user.email },
				});

				if (!existingUser) {
					const newUser = await prisma.user.create({
						data: {
							email: user.email,
							name: user.name,
							password: "",
						},
					});
					token.id = newUser.id.toString();
				} else {
					token.id = existingUser.id.toString();
				}
			}
			return token;
		},
	},
	events: {
		signIn: async ({ user }) => {
			const existingUser = await prisma.user.findUnique({
				where: { email: user.email },
			});

			if (!existingUser) {
				await prisma.user.create({
					data: {
						email: user.email,
						name: user.name,
						password: "",
					},
				});
			}
		},
	},
};

export default NextAuth(authOptions);
