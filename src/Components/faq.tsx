import { useState } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "What does Cybergod do?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tellus ipsum, tincidunt a maximus at, interdum.",
  },
  {
    question: "How does our software work?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tellus ipsum, tincidunt a maximus at, interdum.",
  },
  {
    question: "Does Cybergod have a youtube chanel?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tellus ipsum, tincidunt a maximus at, interdum.",
  },
  {
    question: "How do I get started?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tellus ipsum, tincidunt a maximus at, interdum.",
  }
];

function Faq() {
  const [openStates, setOpenStates] = useState(Array(faqs.length).fill(false));

  const toggleOpenState = (index: number) => {
    setOpenStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
    <>
      <div id="faq" className="mx-auto max-w-7xl px-3 md:px-20 pb-3 md:pb-10 bg-white dark:bg-black transition-colors duration-300 pt-10">
        <section className="flex flex-col space-y-3 md:space-y-5 justify-between items-center">
          <h2 className="text-3xl md:text-4xl text-center font-semibold text-slate-900 dark:text-white transition-colors duration-300">Some Frequently Asked
            <b className="text-blue-400"> Questions</b>
          </h2>
        </section>
        <main className="flex flex-col space-y-5 mx-0 md:mx-10 my-10">
          {faqs.map((faq: FaqItem, index: number) => (
            <Disclosure key={index} >
              <div className={`${openStates[index] ? "border-2 border-blue-400 dark:border-neutral-700/60 rounded-3xl" : "border-none"}`}>
                <div className={`${openStates[index] ? "rounded-t-3xl hover:bg-neutral-100 dark:hover:bg-[#0a0a0a]" : "rounded-2xl"} flex space-x-5 items-center justify-between w-full p-3 md:p-5 cursor-pointer transition-colors ease-in-out duration-300 hover:bg-neutral-100 dark:hover:bg-[#0a0a0a] bg-neutral-50 dark:bg-black`}>
                  <h4 className="font-bold text-base md:text-xl pl-2 text-slate-900 dark:text-white transition-colors duration-300">{faq.question}</h4>
                  <DisclosureButton
                    onClick={() => toggleOpenState(index)}
                    className="p-2 rounded-full btn text-blue-500 shadow-md bg-white dark:bg-neutral-900 dark:text-white border border-transparent dark:border-neutral-800 transition-all ease-in-out duration-100 hover:scale-105 active:scale-95">
                    {openStates[index] ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    )}
                  </DisclosureButton>
                </div>
                <DisclosurePanel className={`px-5 pb-5 bg-neutral-50 dark:bg-black rounded-b-3xl transition-colors duration-300`}>
                  <p className="text-slate-600 dark:text-neutral-400">{faq.answer}</p>
                </DisclosurePanel>
              </div>
            </Disclosure>
          ))}
        </main>
      </div >
    </>
  )
}

export default Faq;