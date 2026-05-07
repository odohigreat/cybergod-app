export interface Spec {
  label: string;
  value?: string;
  subSpecs?: { label: string; value: string }[];
}

export interface Device {
  id: string;
  name: string;
  imageSrc: string;
  isTrending?: boolean;
  isNew?: boolean;
  brand: string;
  specs: Spec[];
  quickSpecs?: Spec[];
}

export interface Option {
  text: string;
  trait: string;
}

export interface QuestionType {
  id: number;
  question: string;
  options: Option[];
}