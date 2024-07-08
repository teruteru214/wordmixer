export interface Text {
	id: number;
	user_id: number;
	level: string;
	theme: string;
	english: string;
	japanese: string;
	words: string[];
}

export interface TextProps {
	text: Text;
}

export interface TextsProps {
	texts: Text[];
}
