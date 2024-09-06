import type { TextProps } from "@/types/text";

import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from "@/components/Ui/Pagination";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import TextTable from "../components/TextTable";
import InputWithSearch from "./components/InputWithSearch";

interface SearchPageProps extends TextProps {
	q: string;
	currentPage: number;
}

const Search = ({ texts, q, currentPage }: SearchPageProps) => {
	const router = useRouter();
	console.log(currentPage);

	const handlePageChange = (newPage: number) => {
		router.push(`/search?q=${q}&page=${newPage}`);
	};

	if (!q) {
		return (
			<div className="max-w-5xl mx-auto">
				<div className="mx-2 sm:mx-6">
					<div className="pt-5 min-h-screen">
						<InputWithSearch />
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-5xl mx-auto">
			<div className="mx-2 sm:mx-6">
				<div className="pt-5 min-h-screen">
					<InputWithSearch />
					{texts.length > 0 ? (
						<div className="animate-fade-up">
							<h3 className="text-3xl mt-7 font-bold">#{q}</h3>
							<div className="pt-2">
								<TextTable texts={texts} />
							</div>
							<div className="py-4">
								<Pagination>
									<PaginationContent>
										{currentPage > 1 && (
											<PaginationItem>
												<PaginationPrevious
													onClick={() => handlePageChange(currentPage - 1)}
												/>
											</PaginationItem>
										)}
										{texts.length === 30 && (
											<PaginationItem>
												<PaginationNext
													onClick={() => handlePageChange(currentPage + 1)}
												/>
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
