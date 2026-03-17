"use client";

import { useRef } from "react";
import { motion, useInView, type UseInViewOptions } from "framer-motion";

import { cn } from "@/lib/utils";

interface BlurFadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  inViewMargin?: UseInViewOptions["margin"];
}

const hidden = {
  opacity: 0,
  filter: "blur(6px)",
  y: 6,
} as const;

export function BlurFadeIn({
  children,
  className,
  delay = 0,
  duration = 0.4,
  yOffset = 6,
  inViewMargin = "-50px",
}: BlurFadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: inViewMargin });

  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={
        isInView
          ? { opacity: 1, filter: "blur(0px)", y: 0 }
          : { ...hidden, y: yOffset }
      }
      transition={{
        delay: 0.04 + delay,
        duration,
        ease: "easeOut",
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
