import Footer from "@/components/Layout/Footer/Footer";
import Header from "@/components/Layout/Header/Header";
import Menu from "@/components/Layout/Menu";
import Providers from "@/provider/Providers";
import "@/styles/globals.css";
import type { Session } from "next-auth";
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
		<main className={`${roboto.className}`}>
			<Providers session={pageProps.session}>
				<Header />
				<div className="bg-blue-100">
					<Component {...pageProps} />
				</div>
				<Footer />
				<Menu />
			</Providers>
		</main>
	);
}
