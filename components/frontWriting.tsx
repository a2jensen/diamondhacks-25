"use client";

import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

export default function Header() {
  return (
    <div className="flex items-center justify-center min-h-[15vh]">
      <motion.div
        className="flex items-center gap-4 text-4xl lg:text-5xl font-bold text-[#5E3023] font-mono text-center -mb-4 -mt-32 text-shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <span>
        <Typewriter
          words={["A Fun Way To Learn !"]}
          loop={false}
          cursor
          cursorStyle="|"
          typeSpeed={90}
          deleteSpeed={50}
          delaySpeed={4000}
        />
        
        </span>

     
      </motion.div>
    </div>
  );
}