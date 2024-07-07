import Image from "next/image";

import { Button } from "@/components/Ui/Button";
import communication from "../public/communication.webp";
import developer from "../public/developer.webp";
import student from "../public/study.webp";
import video from "../public/video.webp";

export default function Home() {
	return (
		<div className="max-w-screen-lg mx-auto">
			<h1 className="text-2xl sm:text-4xl text-center mt-14">
				苦手な英単語、まとめて克服
			</h1>
			<p className="text-xs sm:text-base text-gray-400 text-center">
				わからない英単語を元に、AIが英文を作成します。
				<br />
				作成した英文を翻訳して、英単語の使い方を学ぶ学習ツールです。
			</p>
			<div className="flex justify-center">
				<Button className="text-2xl mt-4" size="lg">
					英語学習を始める
				</Button>
			</div>
			<h2 className="text-2xl sm:text-4xl text-center my-8">
				こんな方におすすめ
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="flex flex-col items-center justify-between h-80">
					<Image src={student} alt="student" width={300} height={300} />
					<p className="text-center my-2 text-gray-400">
						試験勉強や日々の学習に
					</p>
				</div>
				<div className="flex flex-col items-center justify-between h-80">
					<Image src={developer} alt="developer" width={350} height={150} />
					<p className="text-center text-gray-400">コードの読解力の向上に</p>
				</div>
				<div className="flex flex-col items-center justify-between h-80">
					<Image
						src={communication}
						alt="communication"
						width={350}
						height={150}
					/>
					<p className="text-center text-gray-400">異文化交流に</p>
				</div>
				<div className="flex flex-col items-center justify-between h-80">
					<Image src={video} alt="video" width={350} height={150} />
					<p className="text-center text-gray-400">
						海外ドラマが聞き取れるように
					</p>
				</div>
			</div>
			<div className="flex justify-center">
				<Button className="text-2xl my-10" size="lg">
					英語学習を始める
				</Button>
			</div>
		</div>
	);
}
