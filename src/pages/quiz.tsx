import { useState } from "react";
import { questions } from "../data/questions";
import Question from "../Components/Question";
import { useNavigate } from "react-router-dom";
import Header from "../Components/header";

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

  return (
    <>
      <Header />
      <div className="max-w-xl mx-auto mt-10">
        <Question question={questions[current]} onAnswer={handleAnswer} />
      </div>
    </>
  );
}

export default Quiz;