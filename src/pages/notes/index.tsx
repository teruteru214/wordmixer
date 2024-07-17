// pages/notes.tsx
import type { GetServerSideProps } from "next";
import { supabase } from "../api/supabase";

type Note = {
	id: number;
	title: string;
};

type NotesPageProps = {
	notes: Note[];
};

export const getServerSideProps: GetServerSideProps = async () => {
	const { data: notes, error } = await supabase.from("notes").select("*");

	if (error) {
		console.error(error);
		return { props: { notes: [] as Note[] } };
	}

	return { props: { notes: notes || [] } };
};

const NotesPage: React.FC<NotesPageProps> = ({ notes }) => {
	return (
		<div>
			<h1>Notes</h1>
			<ul>
				{notes.map((note) => (
					<li key={note.id}>{note.title}</li>
				))}
			</ul>
		</div>
	);
};

export default NotesPage;
