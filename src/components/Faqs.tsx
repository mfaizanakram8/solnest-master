'use client'
import { useState } from "react";

const faqs = [
  {
    question: "What is a Mevbot, and how does it work?",
    answer:
      "MEV (Maximal Extractable Value) refers to the profits that can be captured by reordering, including, or excluding transactions within a block. Solnest automates this process for you, ensuring optimal profits.",
  },
  {
    question: "How do I get started with Solnest?",
    answer: "To get started, sign up, connect your wallet, and make a minimum deposit to begin automated trading.",
  },
  {
    question: "Is there a minimum deposit requirement?",
    answer: "Yes, the minimum deposit is 2 SOL to access Solnest trading services.",
  },
  {
    question: "What fees does Solnest charge?",
    answer: "Solnest charges a 2% profit fee with no hidden costs, ensuring full transparency.",
  },
  {
    question: "Can beginners use Solnest?",
    answer: "Yes, Solnest is designed for both beginners and experienced traders, offering automated strategies and user-friendly features.",
  },
];

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white text-black py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold"> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-green-400">FAQs</span>  – New to MEV bots?</h2>
        <p className="mt-4 text-gray-600">
          Our FAQ section is here to guide you through the basics of automated trading and MEV bots, helping you get started with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-green-400 text-xl font-bold">Solnest</span> quickly.
        </p>
      </div>

      <div className="mt-10 max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-xl shadow-sm">
            <button
              className="w-full text-left p-4 font-medium flex justify-between items-center focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="text-lg">{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <div className="p-4 border-t text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faqs;
