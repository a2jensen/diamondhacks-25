'use client';

import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { cn } from '@/lib/utils'; // adjust path as needed

export default function Flashcards() {
  const cards = [
    { front: 'Front of Card 1', back: 'Back of Card 1' },
    { front: 'Front of Card 2', back: 'Back of Card 2' },
    { front: 'Front of Card 3', back: 'Back of Card 3' },
  ];

  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    setIndex((prev) => (prev + 1) % cards.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setIndex((prev) => (prev - 1 + cards.length) % cards.length);
    setIsFlipped(false);
  };

  const flipCard = () => setIsFlipped((prev) => !prev);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-[#454888] mb-6 -mt-10">Flashcards</h1>

      <div className="flex items-center justify-center gap-4">
        <button onClick={prevCard} className="p-3 bg-[#D2CBC9] rounded-full hover:bg-[#6D6E93] shadow-lg">
          <FaArrowLeft />
        </button>

        <button
          type="button"
          onClick={flipCard}
          className="w-[520px] h-[340px] outline-none [perspective:1000px] "
        >
          <div
            className={cn(
              'relative w-full h-full transition duration-700 [transform-style:preserve-3d]',
              isFlipped && '[transform:rotateY(180deg)]'
            )}
          >
            {/* Front Side */}
            <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-white text-[#000000] rounded-xl flex items-center border border-[#6D6E93] justify-center text-xl font-semibold">
              {cards[index].front}
            </div>

            {/* Back Side */}
            <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white text-[#454888] border border-[#6D6E93] rounded-xl flex items-center justify-center text-xl font-semibold">
              {cards[index].back}
            </div>
          </div>
        </button>

        <button onClick={nextCard} className="p-3 bg-[#D2CBC9] rounded-full hover:bg-[#6D6E93] shadow-lg">
          <FaArrowRight />
        </button>
      </div>

      <p className="mt-4 text-center text-[#6D6E93]">
        Card {index + 1} of {cards.length}
      </p>
    </div>
  );
}
