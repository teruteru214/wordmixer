import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import "@/styles/globals.css";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";

const roboto = Roboto({
	weight: "400",
	subsets: ["latin"],
});

export default function App({
	Component,
	pageProps,
}: AppProps<{ session: Session }>) {
	return (
		<main className={roboto.className}>
			<SessionProvider session={pageProps.session}>
				<Header />
				<Component {...pageProps} />
				<Footer />
			</SessionProvider>
		</main>
	);
}
