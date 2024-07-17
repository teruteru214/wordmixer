import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/Ui/Accordion";
import { Checkbox } from "@/components/Ui/Checkbox";
import {
	IconEdit,
	IconFlag,
	IconThumbUp,
	IconTrash,
	IconVolume,
} from "@tabler/icons-react";
import Image from "next/image";
import imagination from "../../../public/imagination.webp";
import Translation from "./components/Translation";

const Ja = () => {
	return (
		<div className="max-w-screen-lg mx-auto">
			<div className="mx-2 my-10">
				<h1 className="text-2xl font-bold">和訳問題</h1>
				<p className="text-xl">
					年に一度の保養期間中、社員たちは湖畔で野球を楽しみ、釣りをしたり、将来の事業戦略について話し合ったりした。
				</p>
				<div className="flex justify-end items-center space-x-1 my-4">
					<div className="flex items-center space-x-1 text-gray-400 text-sm">
						<Checkbox id="terms" />
						<label htmlFor="terms" className="cursor-pointer">
							あとで翻訳
						</label>
					</div>
					<IconFlag className="w-5 h-5 text-gray-400" />
					<IconVolume className="w-5 h-5 text-gray-400" />
					<IconThumbUp className="w-5 h-5 text-gray-400" />
					<IconEdit className="w-5 h-5 text-gray-400" />
					<IconTrash className="w-5 h-5 text-gray-400" />
				</div>
				<Translation />
				<Accordion type="single" collapsible className="w-full">
					<AccordionItem value="item-1">
						<AccordionTrigger>使われた英単語・テーマ</AccordionTrigger>
						<AccordionContent>
							<p className="text-center">
								英単語:annual, retreat, employees, enjoyed, baseball,
								テーマ:ビジネス
							</p>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger>上達のコツ</AccordionTrigger>
						<AccordionContent>
							<div className="flex justify-center">
								<Image src={imagination} alt="imagination" height={300} />
							</div>
							<p className="text-center">
								英文のシチュエーションを頭の中でイメージしてみましょう。
								<br />
								具体的な場面を想像することで、頭に入ってくるようになります。
								<br />
								英文からシチュエーションを読み取れない場合は英単語やテーマから掴みましょう。
							</p>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	);
};

export default Ja;
