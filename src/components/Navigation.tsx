import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import HoverText from '@/components/HoverText';

const routes = [
  { path: '/work', label: 'Work,' },
  { path: '/about', label: 'About' },
];

export function Navigation() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);
  
  // Close menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };
  
  const menuVariants = {
    closed: {
      opacity: 0,
      clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)",
      transition: {
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    },
    open: {
      opacity: 1,
      clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)",
      transition: {
        duration: 0.7,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };
  
  const menuItemVariants = {
    closed: { opacity: 0, y: 50 },
    open: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.15 + i * 0.1,
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    })
  };
  
  return (
    <>
      <motion.nav 
        className={cn(
          "fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-6 transition-all duration-300",
          isScrolled ? "bg-transparent" : "bg-transparent"
        )}
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        {/* Logo on left */}
        <motion.div
          className=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="group relative">
            <p className="text-md font-mono tracking-wider transition-opacity duration-300 group-hover:opacity-0">
              <HoverText text="alishan"/>
            </p>
            <p className="text-md font-mono tracking-wider text-primary absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <HoverText text="آلِیشان"/>
            </p>
          </div>
        </motion.div>
        
        {/* Center Navigation */}
        <div className="hidden md:flex items-center justify-center flex-1 px-4">
          <div className="flex items-center space-x-8">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={cn(
                  "text-base relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left",
                  location.pathname === route.path ? "after:scale-x-100" : ""
                )}
                data-cursor="hover"
              >
                <HoverText text={route.label}/>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Right CTA */}
        <div className="hidden md:block">
          <Link
            to="/contact"
            className="text-base font-medium relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
            data-cursor="hover"
          >
            <HoverText text="Let's talk"/>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="flex flex-col items-center justify-center w-10 h-10 md:hidden space-y-1.5 z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          data-cursor="hover"
        >
          <motion.span 
            className="w-6 h-[1px] bg-foreground block"
            animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span 
            className="w-6 h-[1px] bg-foreground block"
            animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span 
            className="w-6 h-[1px] bg-foreground block"
            animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </motion.nav>
      
      {/* Mobile Menu */}
      <motion.div
        className="fixed inset-0 z-40 flex items-center justify-center bg-background"
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
        variants={menuVariants}
      >
        <div className="flex flex-col items-center justify-around space-y-8">
          {routes.map((route, i) => (
            <motion.div
              key={route.path}
              custom={i}
              variants={menuItemVariants}
              className="overflow-hidden"
            >
              <Link
                to={route.path}
                className={cn(
                  "text-4xl font-mono tracking-tighter",
                  location.pathname === route.path ? "text-primary" : "text-primary/70 hover:text-primary"
                )}
                data-cursor="hover"
              >
                {route.label}
              </Link>
            </motion.div>
          ))}
          <motion.div
            custom={routes.length}
            variants={menuItemVariants}
            className="overflow-hidden"
          >
            <Link
              to="/contact"
              className="text-4xl font-mono tracking-tighter text-primary/70 hover:text-primary"
              data-cursor="hover"
            >
              Let's talk
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}