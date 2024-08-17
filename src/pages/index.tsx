import {} from "@/components/Ui/Tabs";
import type { TextsProps } from "@/types/text";
import type { GetServerSideProps } from "next";
import InputWithSearch from "./components/InputWithSearch";
import TextCard from "./components/TextCard";

const Home = ({ texts }: TextsProps) => {
	return (
		<div className="max-w-5xl mx-auto">
			<div className="mx-2 sm:mx-6">
				<div className="my-5">
					<InputWithSearch />
					<h3 className="text-2xl mt-7 mb-3 font-bold">Latest</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-fade-up">
						{texts.map((text) => (
							<TextCard key={text.id} text={text} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { req } = context;
	const baseUrl = req ? `http://${req.headers.host}` : "";

	const res = await fetch(`${baseUrl}/api/texts/texts-latest`);
	const texts = await res.json();

	return {
		props: {
			texts,
		},
	};
};

export default Home;
