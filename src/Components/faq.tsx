import { useState } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';

interface Faq {
  question: string;
  answer: string;
}

const faqs: Faq[] = [
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
      <div id="faq" className="mx-auto max-w-7xl px-3 md:px-20 pb-3 md:pb-10">
        <section className="flex flex-col space-y-3 md:space-y-5 justify-between items-center">
          <h2 className="text-4xl md:text-5xl text-center font-semibold">Some Frequently Asked
            <b className="text-blue-400"> Questions</b>
          </h2>
        </section>
        <main className="flex flex-col space-y-5 mx-0 md:mx-10 my-10">
          {faqs.map((faq: Faq, index: number) => (
            <Disclosure key={index} >
              <div className={`${openStates[index] ? "border-2 border-blue-300 rounded-3xl" : "border-none"}`}>
                <div className={`${openStates[index] ? "rounded-t-3xl hover:bg-neutral-50" : "rounded-2xl"} flex space-x-5 items-center justify-between w-full p-3 md:p-5 cursor-pointer transition-colors ease-in-out duration-300 hover:bg-neutral-100 bg-neutral-50`}>
                  <h4 className="font-bold text-base md:text-xl pl-2">{faq.question}</h4>
                  <DisclosureButton className={`${openStates[index] ? "" : ""}`}>
                    <button
                      onClick={() => toggleOpenState(index)}
                      className="p-2 rounded-full btn text-atlas_orange shadow-md bg-white transition-all ease-in-out duration-100 hover:scale-105 active:scale-95">
                      {openStates[index] ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                      )}
                    </button>
                  </DisclosureButton>
                </div>
                <DisclosurePanel className={`px-5 pb-5 bg-neutral-50 rounded-b-3xl`}>
                  <p className="">{faq.answer}</p>
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