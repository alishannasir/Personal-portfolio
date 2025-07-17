import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';

interface HoverWordProps {
  word: string;
  className?: string;
  showTooltip?: boolean;
  tooltipContent?: React.ReactNode;
}

const HoverWord = ({ 
  word, 
  className = "",
  showTooltip = false,
  tooltipContent
}: HoverWordProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [displayText, setDisplayText] = useState(word);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  
  useEffect(() => {
    if (isHovered) {
      let iteration = 0;
      const maxIterations = 10;
      const interval = 30;
      
      // Clear any existing animation interval
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
      
      // Start new scramble animation
      animationRef.current = setInterval(() => {
        setDisplayText(
          word.split("").map((char, index) => {
            // If the character is a space or punctuation, keep it as is
            if (char === " " || char === "," || char === "." || char === "!" || char === "?") 
              return char;
            
            // If we've gone past this index in our iterations, show the actual character
            if (index < iteration / 3) 
              return word[index];
            
            // Otherwise show a random character
            return characters[Math.floor(Math.random() * characters.length)];
          }).join("")
        );
        
        if (iteration >= maxIterations) {
          clearInterval(animationRef.current!);
          setDisplayText(word);
        }
        
        iteration += 1;
      }, interval);
    } else {
      // Clear animation and reset to original word when not hovered
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
      setDisplayText(word);
    }
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [isHovered, word]);

  if (showTooltip && tooltipContent) {
    return (
      <HoverCard openDelay={100} closeDelay={100}>
        <HoverCardTrigger asChild>
          <motion.span
            className={cn(
              "inline-block transition-all duration-200 cursor-pointer", 
              isHovered ? "text-primary font-medium scale-110" : "",
              className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            animate={{
              y: isHovered ? -2 : 0,
              color: isHovered ? "var(--primary)" : "currentColor",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            {displayText}
          </motion.span>
        </HoverCardTrigger>
        <HoverCardContent className="p-3 max-w-sm">
          {tooltipContent}
        </HoverCardContent>
      </HoverCard>
    );
  }

  return (
    <motion.span
      className={cn(
        "inline-block transition-all duration-200", 
        isHovered ? "text-primary font-medium scale-110" : "",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        y: isHovered ? -2 : 0,
        color: isHovered ? "var(--primary)" : "currentColor",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
    >
      {displayText}
    </motion.span>
  );
};

export default HoverWord;