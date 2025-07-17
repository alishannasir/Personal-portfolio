import React, { useRef, useState, useEffect } from "react";

interface ScrollingTextProps {
  text: string;
  direction: "left" | "right";
  className?: string;
  separator?: string;
  speed?: "slow" | "normal" | "fast";
}

const ScrollingText: React.FC<ScrollingTextProps> = ({
  text,
  direction,
  className = "",
  separator = "✳︎",
  speed = "normal"
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Create a repeated text pattern with separators
  const repeatedText = `${text} ${separator} `.repeat(10);

  // Determine animation class based on direction and speed
  const getAnimationClass = () => {
    const directionClass = direction === "left" ? "scroll-left" : "scroll-right";
   
    // Dynamic speed based on scroll progress
    const baseDurations = {
      slow: 60,
      normal: 40,
      fast: 20
    };
    
    const adjustedDuration = baseDurations[speed] / (1 + scrollProgress);
    
    const animationStyle = {
      animation: `${directionClass} ${adjustedDuration}s linear infinite`,
      animationPlayState: isVisible ? 'running' : 'paused'
    };
   
    return animationStyle;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Scroll event handler to calculate scroll progress
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate scroll progress based on how much of the component is in view
        const visiblePercent = Math.min(
          1, 
          Math.max(
            0, 
            (windowHeight - rect.top) / rect.height
          )
        );
        
        setScrollProgress(visiblePercent);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`scrolling-container overflow-hidden ${className}`}
    >
      <div
        ref={wrapperRef}
        className="scrolling-wrapper"
        style={{
          width: "fit-content",
          display: "inline-flex",
          willChange: "transform",
          ...getAnimationClass()
        }}
      >
        <div className="scrolling-text text-black">
          {repeatedText}
        </div>
        <div className="scrolling-text text-black">
          {repeatedText}
        </div>
      </div>
    </div>
  );
};

export default ScrollingText;

// CSS to be added to your global stylesheet
const styles = `
@keyframes scroll-left {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes scroll-right {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}
`;