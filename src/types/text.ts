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
}

export interface TextsProps {
	texts: Text[];
}
