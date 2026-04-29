// components/ui/hero-section.tsx

import * as React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility
import { Button } from "@/components/ui/button"; // Assuming shadcn Button component

// Props interface for type safety
interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: React.ReactNode | string;
  subtitle: string;
  primaryButtonText: string;
  primaryButtonHref?: string;
  primaryButtonOnClick?: () => void;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  secondaryButtonOnClick?: () => void;
  imageUrl: string;
}

// Animation variants for the container to orchestrate staggered animations
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

// Animation variants for child elements (text and buttons)
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    {
      className,
      title,
      subtitle,
      primaryButtonText,
      primaryButtonHref,
      primaryButtonOnClick,
      secondaryButtonText,
      secondaryButtonHref,
      secondaryButtonOnClick,
      imageUrl,
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          "relative flex h-screen min-h-[700px] w-full items-center justify-center overflow-hidden",
          className
        )}
        {...props}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 z-[-1] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${imageUrl})` }}
          aria-hidden="true"
        />

        {/* Optional: Add a subtle overlay for better text readability */}
        <div className="absolute inset-0 z-0 bg-[#050505]/70" aria-hidden="true" />

        {/* Content Container */}
        <motion.div
          className="z-10 flex max-w-4xl flex-col items-center justify-center text-center text-zinc-100"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Animated Title */}
          <motion.h1
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-white"
            variants={itemVariants}
          >
            {title}
          </motion.h1>

          {/* Animated Subtitle */}
          <motion.p
            className="mt-6 max-w-2xl text-lg leading-8 md:text-xl text-zinc-300"
            variants={itemVariants}
          >
            {subtitle}
          </motion.p>

          {/* Animated Button Group */}
          <motion.div className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-x-6" variants={itemVariants}>
            <Button size="lg" className="w-full sm:w-auto bg-amber-500 text-black hover:bg-amber-600 font-bold" onClick={primaryButtonOnClick}>
              {primaryButtonHref ? <a href={primaryButtonHref}>{primaryButtonText}</a> : primaryButtonText}
            </Button>
            {secondaryButtonText && (
              <Button variant="outline" size="lg" className="w-full sm:w-auto mt-4 sm:mt-0 text-white border-zinc-500 hover:bg-zinc-800 hover:text-white" onClick={secondaryButtonOnClick}>
                {secondaryButtonHref ? <a href={secondaryButtonHref}>{secondaryButtonText}</a> : secondaryButtonText}
              </Button>
            )}
          </motion.div>
        </motion.div>
      </section>
    );
  }
);

HeroSection.displayName = "HeroSection";

export { HeroSection };
