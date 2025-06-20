import { QuestionType } from "../types";

interface Props {
  question: QuestionType;
  onAnswer: (trait: string) => void;
}

function Question({ question, onAnswer }: Props) {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
      <div className="space-y-2">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(option.trait)}
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;