import { IconFileTextAi } from "@tabler/icons-react";
import TextForm from "./components/TextForm";

export default function TextCreate() {
	return (
		<div className="max-w-screen-lg mx-auto">
			<div className="mx-2">
				<div className="flex text-2xl font-bold my-5">
					<IconFileTextAi className="w-7 h-7" />
					<h1>文章作成</h1>
				</div>
				<TextForm />
			</div>
		</div>
	);
}
