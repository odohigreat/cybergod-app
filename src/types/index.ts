export interface Option {
  text: string;
  trait: string;
}

export interface QuestionType {
  id: number;
  question: string;
  options: Option[];
}