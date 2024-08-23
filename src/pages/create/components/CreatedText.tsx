import TextCard from "@/pages/components/TextCard";
import styles from "@/styles/writing.module.css";
import type { Text } from "@/types/text";

interface CreatedTextProps {
	isPending: boolean;
	isError: boolean;
	isSuccess: boolean;
	text?: Text;
}

const CreatedText: React.FC<CreatedTextProps> = ({
	isPending,
	isError,
	isSuccess,
	text,
}) => {
	console.log("CreatedText", text);
	if (isPending) {
		return (
			<div className="flex flex-col items-center">
				<div className={styles.mikepadLoading}>
					<div className={styles.pad}>
						<div className={`${styles.line} ${styles.line1}`} />
						<div className={`${styles.line} ${styles.line2}`} />
						<div className={`${styles.line} ${styles.line3}`} />
						<div className={`${styles.line} ${styles.line4}`} />
						<div className={`${styles.line} ${styles.line5}`} />
					</div>
				</div>
				<p className="text-sm text-gray-400 mt-1">生成中...</p>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex flex-col items-center">
				<div className="bg-gray-400 text-white text-sm rounded-full flex items-center justify-center h-44 w-44 animate-blob">
					<p className="text-center">
						生成に失敗しました
						<br />
						もういちどお試しください
					</p>
				</div>
			</div>
		);
	}

	if (isSuccess && text) {
		if (!text) {
			<div className="flex flex-col items-center">
				<div className="bg-gray-400 text-white text-sm rounded-full flex items-center justify-center h-48 w-48 animate-blob">
					<p className="text-center">テキストが見つかりません</p>
				</div>
			</div>;
		}
		return (
			<div className="flex justify-center">
				<div className="w-64 animate-fade-up">
					<TextCard text={text} />
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center">
			<div className="bg-gray-400 text-white text-sm rounded-full flex items-center justify-center h-28 w-28 animate-blob">
				<p className="text-center">待機中...</p>
			</div>
		</div>
	);
};

export default CreatedText;
