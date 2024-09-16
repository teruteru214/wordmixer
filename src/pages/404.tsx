import { Button } from "@/components/Ui/Button";
import learn from "@/public/learn.webp";
import Image from "next/image";
import Link from "next/link";

const Custom404 = () => {
	return (
		<div className="h-screen flex flex-col justify-center items-center space-y-4">
			<Image src={learn} width="200" alt="404" />
			<p className="text-gray-400">ページは見つかりませんでした。</p>
			<Link href="/">
				<Button>ホームに戻る</Button>
			</Link>
		</div>
	);
};

export default Custom404;
