import { QuestionType } from "../types";

export const questions: QuestionType[] = [
  {
    id: 1,
    question: "How important is camera quality to you?",
    options: [
      { text: "Very important", trait: "camera" },
      { text: "Not so much", trait: "basic" },
    ],
  },
  {
    id: 2,
    question: "Do you play a lot of mobile games?",
    options: [
      { text: "Yes", trait: "performance" },
      { text: "No", trait: "basic" },
    ],
  },
  {
    id: 3,
    question: "Do you prefer Apple or Android?",
    options: [
      { text: "Apple", trait: "apple" },
      { text: "Android", trait: "android" },
    ],
  },
];