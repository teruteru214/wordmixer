export interface SelectText {
	id: number;
	user_id: number;
	level: string;
	theme: string;
	en: string;
	ja: string;
	words: string[];
}
export interface Text {
	id: number;
	user_id: number;
	words: string[];
	level: string;
	theme: string;
}
export interface TextProp {
	text: Text;
}

export interface TextProps {
	texts: Text[];
}
export interface UserTextProps {
	username: string;
	texts: Text[];
	currentPage: number;
}

interface TranslationText {
	id: number;
	en: string;
	ja: string;
	words: string[];
	level: string;
	theme: string;
	flag: boolean;
}

export interface TranslationTextProps {
	textData: TranslationText;
}
