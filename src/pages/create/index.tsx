import HeroContent from "@/components/Ui/HeroContent";
import { IconFileTextAi } from "@tabler/icons-react";
import TextForm from "./components/TextForm";

export default function TextCreate() {
	return (
		<div>
			<HeroContent
				icon={<IconFileTextAi className="w-16 h-16" />}
				title="文章作成"
			/>
			<div className="max-w-5xl mx-auto">
				<div className="mx-2">
					<TextForm />
				</div>
			</div>
		</div>
	);
}
