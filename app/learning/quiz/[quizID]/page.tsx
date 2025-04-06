"use client"
import { useState } from "react";

const quizData = [
    {
      question: "What instrument has strings and is played with a bow?",
      correctAnswer: "Violin",
      options: ["Guitar", "Piano", "Trumpet", "Violin"],
    },
    {
      question: "Which instrument has keys and pedals?",
      correctAnswer: "Piano",
      options: ["Drums", "Flute", "Piano", "Saxophone"],
    },
  ];

export default function Quiz() {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(Array(quizData.length).fill(""));
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qIndex: number, option: string) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[qIndex] = option;
    setSelectedAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const score = selectedAnswers.filter((answer, idx) => answer === quizData[idx].correctAnswer).length;

  return (
    <div className="p-4 max-w-xl mx-auto bg-white shadow-lg shadow-[#6D6E93] rounded border border-[#6D6E93] h-full">
      <h1 className="text-2xl font-bold mb-4 text-[#454888]">Quiz: Music Instruments</h1>

      {quizData.map((q, idx) => (
        <div key={idx} className="mb-6">
          <h2 className="font-semibold mb-2">{q.question}</h2>
          <div className="grid grid-cols-2 gap-2">
            {q.options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(idx, option)}
                className={`p-2 border rounded ${
                  selectedAnswers[idx] === option
                    ? "bg-[#454888] text-white"
                    : "bg-white"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}

      {!submitted ? (
        <button
          onClick={handleSubmit}
          className="mt-4 bg-[#454888] text-white px-4 py-2 rounded shadow-md"
        >
          Submit Quiz
        </button>
      ) : (
        <div className="mt-4 text-lg font-bold">
          You scored {score} / {quizData.length}
        </div>
      )}
    </div>
  );
}