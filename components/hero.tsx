"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Typewriter } from 'react-simple-typewriter';

export default function Header() {
  return (
    <div className = "flex flex-col gap-9 items-center">
        <motion.div
          className="flex gap-4 justify-center items-center"
          initial = {{opacity: 0, y: 20}}
          animate = {{opacity: 1, y: 0}}
          transition = {{duration: 1, ease: "easeOut"}}
          >
        <Image src = {"/images/fish.png"} alt = "Memo Logo" width={300} height={300} />
        <span className = "border-1 rotate-45 h-6" />
        </motion.div>

      <motion.div
        className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center"
        initial={{opacity: 0}}
        animate = {{opacity: 1}}
        transition={{duration: 1, delay: 0.2, ease: "easeOut"}}
        >
        <Typewriter
          words={['Smarter notes, smarter you.']}
          loop={false}
          cursor
          cursorStyle="|"
          typeSpeed={90}
          deleteSpeed={50}
          delaySpeed={4000}
          />  
      </motion.div>
    </div>
  );
}
