
import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface ContactInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  isTextarea?: boolean;
}

const ContactInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, ContactInputProps>(
  ({ label, isTextarea = false, ...props }, ref) => {
    // Create the right component type based on isTextarea
    const Component = isTextarea ? 'textarea' : 'input';
    
    return (
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <label className="block text-xs uppercase tracking-widest mb-2 text-white/70">
          {label}
        </label>
        <motion.div>
          <Component
            className="w-full bg-transparent border-b border-white/30 py-2 px-1 text-white focus:outline-none focus:border-white/90 transition-colors"
            ref={ref as any}
            {...props}
            {...(isTextarea && { rows: 4 })}
          />
        </motion.div>
      </motion.div>
    );
  }
);

ContactInput.displayName = 'ContactInput';

export default ContactInput;