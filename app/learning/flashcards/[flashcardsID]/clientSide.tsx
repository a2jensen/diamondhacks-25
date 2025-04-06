'use client';

import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export default function Flashcards({ flashcards }: { flashcards: Flashcard[] }) {
  
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    setIndex((prev) => (prev + 1) % flashcards.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setIsFlipped(false);
  };

  const flipCard = () => setIsFlipped((prev) => !prev);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-[#454888] mb-6 -mt-10">Flashcards</h1>
        
      <div className="flex items-center justify-center gap-4">
        {/* Left Arrow */}
        <button
          onClick={prevCard}
          className="p-3 bg-[#D2CBC9] rounded-full hover:bg-[#6D6E93] shadow-lg"
        >
          <FaArrowLeft />
        </button>

        {/* Flashcard */}
        <div
          onClick={flipCard}
          className="mb-4 bg-white shadow-lg border-[#6D6E93] rounded-xl w-[620px] h-[415px] flex items-center justify-center text-center cursor-pointer transition-all duration-300"
        >
          <div>
            <h2 className="text-xl font-semibold">
              {isFlipped ? flashcards[index].back : flashcards[index].front}
            </h2>
            <p className="text-sm text-gray-400 mt-2">Click to flip</p>
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextCard}
          className="p-3 bg-[#D2CBC9] rounded-full hover:bg-[#6D6E93] shadow-lg"
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Optional card index display */}
      <p className="mb-9 text-center mt-4 text-[#6D6E93]">
        Card {index + 1} of {flashcards.length}
      </p>
    </div>
  );
}
