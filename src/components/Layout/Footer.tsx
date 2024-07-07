import Image from "next/image";
import logo from "../../public/logo.webp";

const Footer = () => {
	return (
		<footer className="p-2 border-t border-gray-200">
			<div className="flex justify-between">
				<menu className="text-left text-xs sm:text-base">
					<li className="text-gray-400 hover:underline">本サービスについて</li>
				</menu>
				<menu className="text-left text-xs sm:text-base">
					<li className="text-gray-400 hover:underline">利用規約</li>
					<li className="text-gray-400 hover:underline">
						プライバシーポリシー
					</li>
					<li className="text-gray-400 hover:underline">お問い合わせ</li>
				</menu>
				<menu className="text-left text-xs sm:text-base">
					<li className="text-gray-400 hover:underline">Xアカウント</li>
					<li className="text-gray-400 hover:underline">Github</li>
					<li className="text-gray-400 hover:underline">Qiita記事</li>
				</menu>
			</div>
			<div className="flex justify-center my-3">
				<Image src={logo} alt="logo" width={240} height={80} />
			</div>
			<p className="text-xs sm:text-base text-center text-gray-400 mb-3">
				@2024 VocabPractice All Rights
			</p>
		</footer>
	);
};

export default Footer;
