import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import HoverText from '@/components/HoverText';


  const socialLinks = [
    { icon: <Github size={18} />, href: 'https://github.com', label: 'GitHub' },
    { icon: <Linkedin size={18} />, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <Twitter size={18} />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <Mail size={18} />, href: 'mailto:hello@example.com', label: 'Email' },
  ];
  



 export function Footer(){
  return (
    <footer className="w-full bg-white text-black py-20 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-12 relative">
          {/* Main title with photo */}
          <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left w-full">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-9xl md:text-9xl font-bold tracking-tight"
            >
              Let's
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-40 h-40 md:w-64 md:h-48 mx-4 my-6 md:my-0 overflow-hidden"
            >
              <img 
                src="/myimage.jpg" 
                alt="Person in snowy forest" 
                className="object-cover w-full h-full grayscale"
              />
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-9xl md:text-9xl font-bold tracking-tight"
            >
              <HoverText text="work"/>
            </motion.h2>
          </div>
          
          {/* Together text */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-9xl md:text-9xl font-bold tracking-tight"
          >
            together
          </motion.h2>
          
     
          
          
          {/* Contact email */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="absolute bottom-0 left-0 md:p-4 text-lg font-light"
          >
            <a 
              href="mailto:hello@example.com" 
              className="hover:underline transition-all duration-300"
            >
               <HoverText text="iamalishannasir@gmail.com"/>
              
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="absolute bottom-0 right-0 md:p-4 text-lg font-light"
          >
              <div>
           <div className="flex space-x-4">
           {socialLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                whileHover={{ y: -3 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.2 + i * 0.1, duration: 0.5 }
                }}
                data-cursor="hover"
                aria-label={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

// export default Footer;