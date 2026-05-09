import { useState } from "react";
import { questions } from "../data/questions";
import Question from "../Components/Question";
import { useNavigate } from "react-router-dom";
import Header from "../Components/header";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

function Quiz() {
  const [current, setCurrent] = useState(0);
  const [traits, setTraits] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleAnswer = (trait: string) => {
    const updatedTraits = [...traits, trait];
    setTraits(updatedTraits);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      localStorage.setItem("traits", JSON.stringify(updatedTraits));
      navigate("/result");
    }
  };

  const handleBack = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setTraits(traits.slice(0, -1));
    }
  };

  const progressPercent = ((current) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black text-neutral-900 dark:text-neutral-100 transition-colors duration-300 relative overflow-hidden flex flex-col">
      <div className="fixed top-0 w-full z-50">
        <Header />
      </div>

      {/* Premium background radial mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-blue-400/20 blur-[120px]" />
        <div className="absolute top-[40%] right-[10%] w-[350px] h-[350px] rounded-full bg-green-400/20 blur-[100px]" />
      </div>

      <main className="flex-1 flex flex-col justify-center max-w-xl w-full mx-auto px-4 pt-24 pb-16 relative z-10">
        {/* Progress header */}
        <div className="mb-8 flex flex-col gap-3">
          <div className="flex justify-between items-center px-1">
            {current > 0 ? (
              <button
                onClick={handleBack}
                className="flex items-center gap-1 text-sm font-bold text-neutral-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
              >
                <ChevronLeftIcon className="size-4 group-hover:-translate-x-1 transition-transform" />
                Back
              </button>
            ) : (
              <div className="text-sm font-bold text-neutral-400">Aura Assessment</div>
            )}
            <div className="text-sm font-black text-neutral-500">
              {current + 1} of {questions.length}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Card containing current question */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <Question
              key={current}
              question={questions[current]}
              onAnswer={handleAnswer}
            />
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default Quiz;