import type { TextsProps } from "@/types/text";
import { IconUsersGroup } from "@tabler/icons-react";
import type { GetServerSideProps } from "next";
import {} from "react";
import FilterTexts from "./components/FilterTexts";

export default function EnglishTexts({ texts }: TextsProps) {
	return (
		<div className="max-w-screen-lg mx-auto">
			<div className="flex items-center justify-center text-2xl mt-4">
				<IconUsersGroup className="w-7 h-7" />
				<h1>みんなの英文</h1>
			</div>
			<div className="mx-2 my-2">
				<FilterTexts texts={texts} />
			</div>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	try {
		const res = await fetch("http://localhost:3005/texts");
		const texts: Text[] = await res.json();

		return {
			props: {
				texts,
			},
		};
	} catch (error) {
		console.error("Error fetching data:", error);

		return {
			props: {
				texts: [],
			},
		};
	}
};
