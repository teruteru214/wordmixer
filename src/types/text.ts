export interface Text {
	id: number;
	user_id: number;
	level: string;
	theme: string;
	en: string;
	ja: string;
	words: string[];
}

export interface TextProps {
	text: Text;
	translation: "ja" | "en";
}

export interface TextsProps {
	texts: Text[];
}
