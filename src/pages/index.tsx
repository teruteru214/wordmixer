import LoginModal from "@/components/Layout/Footer/LoginModal";
import { Button } from "@/components/Ui/Button";
import worker from "@/public/worker.webp";
import Image from "next/image";

const Home = () => {
	return (
		<div className="max-w-5xl mx-auto">
			<div className="flex flex-col justify-center items-center mx-2 sm:mx-6 min-h-screen space-y-4">
				<h1 className="text-3xl text-center">苦手な英単語、まとめて克服</h1>
				<p className="text-gray-400">
					英単語を元に生成した例文で、翻訳して単語の使い方を学ぶツール
				</p>
				<Image src={worker} alt="worker" height={100} />
				<LoginModal
					triggerButton={
						<Button className="text-lg w-56" size="lg">
							学習を始める
						</Button>
					}
				/>
				<p className="text-gray-400 cursor-pointer hover:underline">
					本アプリの使い方→
				</p>
			</div>
		</div>
	);
};

export default Home;
