import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from "@/components/Ui/Pagination";
import type { TextProps } from "@/types/text";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import InputWithSearch from "./components/InputWithSearch";
import SearchTable from "./components/SearchTable";

interface SearchPageProps extends TextProps {
	q: string;
	currentPage: number;
}

const Search = ({ texts, q, currentPage }: SearchPageProps) => {
	if (!q) {
		return (
			<div className="max-w-5xl mx-auto">
				<div className="mx-2 sm:mx-6">
					<div className="pt-5 min-h-screen">
						<InputWithSearch q={q} />
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-5xl mx-auto">
			<div className="mx-2 sm:mx-6">
				<div className="pt-5 min-h-screen">
					<InputWithSearch q={q} />
					{texts.length > 0 ? (
						<div className="animate-fade-up">
							<h3 className="text-3xl mt-7 font-bold">#{q}</h3>
							<div className="pt-2">
								<SearchTable texts={texts} />
							</div>
							<div className="py-4">
								<Pagination>
									<PaginationContent>
										{currentPage > 1 && (
											<PaginationItem>
												<Link
													href={`/search?q=${q}&page=${currentPage - 1}`}
													passHref
												>
													<PaginationPrevious />
												</Link>
											</PaginationItem>
										)}
										{texts.length === 30 && (
											<PaginationItem>
												<Link
													href={`/search?q=${q}&page=${currentPage + 1}`}
													passHref
												>
													<PaginationNext />
												</Link>
											</PaginationItem>
										)}
									</PaginationContent>
								</Pagination>
							</div>
						</div>
					) : (
						<p
							className="text-gray-400 font-bold text-center mt-12 animate-fade-up"
							key={q}
						>
							{q}
							の検索結果が見つかりませんでした。
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { query } = context;
	const { q, page } = query;

	const limit = 30;
	const currentPage = page ? Number(page) : 1;
	const skip = (currentPage - 1) * limit;

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
		`${baseUrl}/api/texts/texts-search?q=${encodeURIComponent(q)}&skip=${skip}&limit=${limit}`,
	);

	if (!res.ok) {
		return {
			props: {
				texts: [],
				q,
				currentPage,
			},
		};
	}

	const texts = await res.json();

	return {
		props: {
			texts,
			q,
			currentPage,
		},
	};
};

export default Search;
