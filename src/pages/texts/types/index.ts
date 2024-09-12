export interface Text {
	id: number;
	en: string;
	ja: string;
	words: string[];
	level: string;
	theme: string;
}

export interface ModelSentenceProps {
	textData: Text; // textData の型を Text に指定
}
