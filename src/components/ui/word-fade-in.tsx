"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

import { cn } from "@/lib/utils";

interface WordFadeInProps {
  words: string;
  className?: string;
  delay?: number;
  variants?: Variants;
}

export function WordFadeIn({
  words,
  className,
  delay = 0.15,
  variants = {
    hidden: { opacity: 0, y: 10, filter: "blur(8px)" },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { delay: i * delay, duration: 0.4, ease: "easeOut" },
    }),
  },
}: WordFadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const wordArray = words.split(" ");

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn("flex flex-wrap justify-center", className)}
    >
      {wordArray.map((word, i) => (
        <motion.span key={`${word}-${i}`} variants={variants} custom={i} className="mr-[0.25em]">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
