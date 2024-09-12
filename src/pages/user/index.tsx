import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from "@/components/Ui/Pagination";
import type { UserTextProps } from "@/types/text";
import type { GetServerSideProps } from "next";
import TextTable from "../components/TextTable";

const User = ({ username, texts, currentPage }: UserTextProps) => {
	const handlePageChange = (newPage: number) => {
		window.location.href = newPage === 1 ? "/user" : `/user?page=${newPage}`;
	};

	const showNext = texts.length === 30;

	return (
		<div className="max-w-screen-lg mx-auto">
			<div className="mx-2 py-5 sm:mx-6 h-screen">
				<div className="flex justify-between items-center">
					<h1 className="text-2xl font-bold">{username}の文章</h1>
				</div>
				<div className="my-4">
					<TextTable texts={texts} />
				</div>
				<Pagination>
					<PaginationContent>
						{currentPage > 1 && (
							<PaginationItem key="prev">
								<PaginationPrevious
									onClick={() => handlePageChange(currentPage - 1)}
								/>
							</PaginationItem>
						)}
						{showNext && (
							<PaginationItem key="next">
								<PaginationNext
									onClick={() => handlePageChange(currentPage + 1)}
								/>
							</PaginationItem>
						)}
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	);
};

export default User;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const page = Number(context.query.page) || 1;

	const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/texts/user-texts?page=${page}`;

	const res = await fetch(apiUrl, {
		method: "GET",
		headers: {
			Cookie: context.req.headers.cookie || "",
		},
	});

	const userText = await res.json();

	return {
		props: {
			username: userText.username,
			texts: userText.texts,
			currentPage: page,
		},
	};
};
