import type { TextsProps } from "@/types/text";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import InputWithSearch from "../components/InputWithSearch";
import TextCard from "../components/TextCard";

interface SearchPageProps extends TextsProps {
	q: string;
}

const Search = ({ texts, q }: SearchPageProps) => {
	const router = useRouter();

	if (!router.query.q) {
		return (
			<div className="mt-5 min-h-screen">
				<InputWithSearch />
			</div>
		);
	}

	return (
		<div className="my-5 min-h-screen">
			<InputWithSearch />
			{texts.length > 0 ? (
				<>
					<h3 className="text-3xl mt-7 mb-3 font-bold">#{q}</h3>
					<div
						className="grid grid-cols-2 md:grid-cols-3 gap-3 animate-fade-up"
						key={q}
					>
						{texts.map((text) => (
							<TextCard key={text.id} text={text} />
						))}
					</div>
				</>
			) : (
				<p
					className="text-gray-400 font-bold text-center mt-12 animate-fade-up"
					key={q}
				>
					{q}の検索結果が見つかりませんでした
				</p>
			)}
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { query } = context;
	const { q } = query;

	if (!q || typeof q !== "string") {
		return {
			props: {
				texts: [],
				q: "",
			},
		};
	}

	const baseUrl = `http://${context.req.headers.host}`;
	const res = await fetch(
		`${baseUrl}/api/texts/texts-search?q=${encodeURIComponent(q)}`,
	);

	if (!res.ok) {
		return {
			props: {
				texts: [],
				q,
			},
		};
	}

	const texts = await res.json();

	return {
		props: {
			texts,
			q,
		},
	};
};

export default Search;
