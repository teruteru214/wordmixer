import type { TextsProps } from "@/types/text";
import { IconUsersGroup } from "@tabler/icons-react";
import type { GetServerSideProps } from "next";
import FilterTexts from "./components/FilterTexts";

export default function EnglishTexts({ texts }: TextsProps) {
	return (
		<div className="max-w-screen-lg mx-auto">
			<div className="mx-2 my-2">
				<div className="flex text-2xl font-bold my-4">
					<IconUsersGroup className="w-7 h-7" />
					<h1>みんなの文章</h1>
				</div>
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
