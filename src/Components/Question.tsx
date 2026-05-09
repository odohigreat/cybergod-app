import { QuestionType } from "../types";
import { motion } from "framer-motion";

interface Props {
  question: QuestionType;
  onAnswer: (trait: string) => void;
}

function Question({ question, onAnswer }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="p-8 border border-neutral-200/80 dark:border-neutral-800/80 rounded-[2.5rem] shadow-2xl shadow-neutral-200/50 dark:shadow-none bg-white/70 dark:bg-neutral-950/70 backdrop-blur-md transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="px-3 py-1 text-[11px] font-black tracking-widest uppercase bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-full">
          Question {question.id}
        </span>
      </div>
      
      <h2 className="text-2xl md:text-3xl font-black mb-8 tracking-tight text-neutral-900 dark:text-white leading-tight">
        {question.question}
      </h2>

      <div className="grid grid-cols-1 gap-4">
        {question.options.map((option, idx) => (
          <motion.button
            key={idx}
            onClick={() => onAnswer(option.trait)}
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group w-full p-5 bg-white dark:bg-neutral-900/40 text-left rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-white dark:hover:from-blue-950/10 dark:hover:to-neutral-900/40 transition-all duration-300 shadow-sm hover:shadow-md relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center rounded-l-2xl" />
            <div className="flex flex-col pl-2">
              <span className="text-lg font-black text-neutral-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {option.text}
              </span>
              {option.description && (
                <span className="text-sm font-light text-neutral-500 dark:text-neutral-400 mt-1.5 leading-relaxed group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors duration-300">
                  {option.description}
                </span>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

export default Question;