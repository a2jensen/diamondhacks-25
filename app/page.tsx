"use client";

import Hero from "@/components/hero";
import { motion } from "motion/react"
export default function Home() {
  return (
    <>
      <Hero />
      <main className="flex-1 flex flex-col gap-6 px-4">
        
        <motion.div
          className="flex gap-5 justify-center items-center"
          initial={{opacity: 0, y:20}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 1}}
        >
           <p className="text-lg">
          Welcome to Memo, a study tool that blends the intelligence of AI chatbots with Obsidian-inspired knowledge management. Chat with our AI to explore any topic, then instantly transform conversations into flashcards, customized quizzes, and interconnected markdown notes. Visualize your learning journey with our powerful node editor, revealing connections between ideas and enabling you to build your personal knowledge graph. Unlike traditional note apps or standalone AI assistants, Memo creates a complete learning ecosystem that adapts to your style and grows with you. Study smarter, not harder, with Memo. 
        </p>
        </motion.div>

       {/* Need to update with more images/interactive elements */}
      </main>
    </>
  );
}

