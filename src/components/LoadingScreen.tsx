
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 150);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        y: -50,
        transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }
      }}
    >
      
      {/* <div className="w-64 h-[1px] bg-foreground/20 relative">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-foreground"
          style={{ width: `${progress}%` }}
        />
      </div> */}
      
      <motion.div 
        className="mt-4 text-sm text-foreground/70"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          transition: { delay: 0.2, duration: 0.6 }
        }}
      >
        {Math.round(progress)}%
      </motion.div>
    </motion.div>
  );
};
