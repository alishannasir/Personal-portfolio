import { useRef, useEffect, useState } from "react";
import ThreeDBlob from "@/components/CanvasModel";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import LocomotiveScroll from "locomotive-scroll";
import HoverText from '@/components/HoverText';
import { motion, AnimatePresence } from 'framer-motion';
import ContactInput from '@/components/ContactInput';
import ScrollingText from "@/components/ScrollingText";
import { Navigation } from "@/components/Navigation";
import { projects } from "@/lib/store";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from '@/components/sections/ContactSection';
import AboutSection from '@/components/sections/AboutSection';

const HomePage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const locomotiveScrollRef = useRef<LocomotiveScroll | null>(null);
  const [currentDate] = useState(new Date());
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    budget: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  
  useEffect(() => {
    if (!scrollRef.current) return;
    
    locomotiveScrollRef.current = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      smoothMobile: false,
      multiplier: 1,
    });
    
    return () => {
      locomotiveScrollRef.current?.destroy();
    };
  }, []);
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleProjectHover = (projectId: string | null) => {
    setActiveProject(projectId);
  };

  const handleProjectClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const activeProjectData = activeProject 
    ? projects.find(p => p.id === activeProject) 
    : null;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setFormData({
      name: '',
      email: '',
      company: '',
      project: '',
      budget: ''
    });
    
    setIsSubmitting(false);
  };
  
  return (
    <div className="relative">
      {/* Fixed Hero Section */}
      <section className="fixed top-0 left-0 w-full h-screen z-0 overflow-hidden">
         <div className="absolute inset-0">
        <ThreeDBlob />
         </div>
        
        <div className="relative z-10 flex flex-col justify-between h-full w-full px-6 md:px-12">
          <div className="flex-grow"></div>
          
          <div className="flex justify-between items-center w-full pb-14">
            <motion.div
              className="text-foreground/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <HoverText className="text-sm font-mono tracking-wider" text={currentDate.toDateString()}/>
            </motion.div>
            
            <motion.div
              className="text-foreground/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <HoverText text="© 2025 • Portfolio" className="text-sm font-mono tracking-wider"/>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="fixed top-0 left-0 right-0 z-50 w-full bg-transparent">
        <Navigation />
      </div>

      {/* Scrollable Content */}
      <div ref={scrollRef} data-scroll-container className="relative">
        {/* Empty hero section to provide space */}
        <section className="h-screen w-full" data-scroll-section></section>
        
        {/* Scrollable content that will overlap the hero */}
        <div className="relative z-10">
          {/* About Section */}
          <AboutSection />
          
          {/* Projects Section */}
          <ProjectsSection />
          
          {/* Contact Me */}
          <ContactSection />
          
          <section data-scroll-section>
            <Footer />
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomePage;