import HeroContent from "@/components/Ui/HeroContent";
import { IconFileTextAi } from "@tabler/icons-react";
import TextForm from "./components/TextForm";

export default function Create() {
	return (
		<div>
			<HeroContent
				icon={<IconFileTextAi className="w-8 h-8 sm:w-14 sm:h-14" />}
				title="文章作成"
			/>
			<div className="max-w-5xl mx-auto">
				<div className="mx-2 sm:mx-6 mt-10">
					<TextForm />
				</div>
			</div>
		</div>
	);
}
