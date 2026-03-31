import { QuestionType } from "../types";

interface Props {
  question: QuestionType;
  onAnswer: (trait: string) => void;
}

function Question({ question, onAnswer }: Props) {
  return (
    <div className="p-8 border border-neutral-200 dark:border-neutral-800 rounded-[2rem] shadow-xl shadow-neutral-200/50 dark:shadow-none bg-white dark:bg-[#0a0a0a] transition-all duration-300">
      <h2 className="text-2xl font-black mb-8 tracking-tight text-gray-900 dark:text-white">{question.question}</h2>
      <div className="grid grid-cols-1 gap-4">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(option.trait)}
            className="w-full p-4 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-bold transition-all duration-300 text-left px-6 shadow-sm hover:shadow-md"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;