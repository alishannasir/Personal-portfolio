import { useRef, useEffect, useState } from "react";
import {CanvasModel} from "@/components/CanvasModel";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import LocomotiveScroll from "locomotive-scroll";
import HoverText from '@/components/HoverText';
import { motion, AnimatePresence } from 'framer-motion';
import ContactInput from '@/components/ContactInput';
import ScrollingText from "@/components/ScrollingText";
import { Navigation } from "@/components/Navigation";
import { projects } from "@/lib/store";
import ProjectsSection from "@/components/sections/Projects";

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
        {/* ThreeDBlob as full-screen background */}
        <div className="absolute inset-0">
          <CanvasModel />
        </div>
        
        {/* Content overlay */}
        <div className="relative z-10 flex flex-col justify-between h-full w-full px-6 md:px-12">
          {/* Top area - empty to leave space for nav */}
          <div className="h-24"></div>
          
          {/* Middle content area - can be used if you want to add content */}
          <div className="flex-grow"></div>
          
          {/* Bottom area with date and copyright */}
          <div className="flex justify-between items-center w-full pb-14">
            {/* Bottom left text */}
            <motion.div
              className="text-foreground/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <HoverText className="text-sm font-mono tracking-wider" text={currentDate.toDateString()}/>
            </motion.div>
            
            {/* Bottom right text */}
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

      {/* Transparent Navigation - Positioned absolutely to overlay on hero section */}
      <div className="fixed top-0 left-0 right-0 z-50 w-full">
        <Navigation />
      </div>

      {/* Scrollable Content */}
      <div ref={scrollRef} data-scroll-container className="relative">
        {/* Empty hero section to provide space */}
        <section className="h-screen w-full" data-scroll-section></section>
        
        {/* Scrollable content that will overlap the hero */}
        <div className="relative z-10">
          {/* About Section */}
          <section id="about" className="py-20 px-2 md:px-4 bg-white" data-scroll-section>
            <motion.div className="px-10 py-10">
              <HoverText
                text="About"
                className=" 
                  text-4xl md:text-6xl lg:text-7xl 
                  font-serif tracking-tight 
                  text-black           
                  transition-colors duration-300" 
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] },
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center"
            >
              <h2 className="text-5xl md:text-6xl font-medium tracking-tighter mb-16 text-black">
                <span className="inline-flex items-center">
                  <HoverText text='Hello!'/>
                  <motion.img 
                    src="/myimage.jpg" 
                    alt="" 
                    className="w-10 h-10 mx-2 rounded-full object-cover" 
                    whileHover={{ 
                      scale: 8,
                      transition: { duration: 0.6, ease: "easeInOut" }
                    }}
                  />
                </span>{" "}
                I'm a passionate freelance designer and developer based in{" "}
                <span className="inline-flex items-center">
                  <motion.img 
                    src="/images.jpg" 
                    alt="" 
                    className="w-10 h-10 mx-2 object-contain" 
                    whileHover={{ 
                      scale: 8,
                      transition: { duration: 0.6, ease: "easeInOut" }
                    }}
                  /> 
                  <HoverText text="Gilgit," />
                </span>{" "}
                bringing creativity and technical expertise to projects <HoverText text="worldwide." />
              </h2>
            </motion.div>
            <motion.div className="w-full overflow-hidden">
              <ScrollingText 
                text="SINCE 2020" 
                direction="right"
                className="py-4 text-5xl md:text-7xl lg:text-8xl font-display tracking-tighter uppercase italic"
              />
              
              <ScrollingText 
                text="FROM MOUNTAINS" 
                direction="left"
                className="py-4 text-5xl md:text-7xl lg:text-8xl font-display tracking-tighter uppercase italic"
              />
            </motion.div>
          </section>
          
          {/* Projects Section */}
            {/* <section id="projects" className="py-15 min-h-screen flex items-center justify-center" data-scroll-section>
              <div className="relative w-full">
                <motion.div className="px-10 py-10">
                  <HoverText
                    text="Projects"
                    className="project-title 
                      text-4xl md:text-6xl lg:text-7xl 
                      font-serif tracking-tight 
                      text-foreground/95            
                      group-hover:text-foreground/50
                      transition-colors duration-300" 
                  />
                </motion.div>
                <div className="projects-list relative z-10">
                  {projects.map((project) => (
                    <motion.div
                      key={project.id}
                      className="project-link group"
                      onHoverStart={() => handleProjectHover(project.id)}
                      onHoverEnd={() => handleProjectHover(null)}
                      whileHover={{ 
                        scale: 1.02,
                        transition: { duration: 0.3 }
                      }}
                      onClick={() => handleProjectClick(project.url)}
                    >
                      <HoverText 
                        className="project-title 
                          text-4xl md:text-6xl lg:text-7xl 
                          font-serif tracking-tight 
                          text-foreground/95            
                          group-hover:text-foreground/50
                          transition-colors duration-300 
                          cursor-pointer" 
                        text={project.title}
                      />                   
                    </motion.div>
                  ))}
                  
                  <motion.div 
                    className="project-link group mt-4"
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <HoverText
                      text="   *All Work*"
                      className="project-title 
                        text-4xl md:text-6xl lg:text-7xl 
                        font-serif tracking-tight 
                        text-foreground/95            
                        group-hover:text-foreground/50
                        transition-colors duration-300" 
                    />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {activeProject && activeProjectData && (
                    <motion.div 
                      className="fixed pointer-events-none z-50"
                      style={{
                        top: mousePosition.y,
                        left: mousePosition.x,
                        transform: 'translate(-50%, -50%)'
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        transition: { 
                          type: 'spring', 
                          stiffness: 300, 
                          damping: 20 
                        }
                      }}
                      exit={{ 
                        opacity: 0, 
                        scale: 0.8,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <div className="
                        bg-foreground/95                                
                        rounded-xl 
                        shadow-2xl 
                        overflow-hidden 
                        max-w-xs 
                        transform 
                        transition-all 
                        duration-300 
                        hover:scale-105 
                        cursor-pointer"
                      >
                        <img 
                          src={activeProjectData.image}
                          alt={activeProjectData.title}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section> */}
            <ProjectsSection/>
          
            
          {/* Contact Me */}
          <section className="py-20" data-scroll-section>
            <motion.div className="px-10 py-10">
              <HoverText
                text="Contact"
                className=" 
                  text-4xl md:text-6xl lg:text-7xl 
                  font-serif tracking-tight 
                  text-white          
                  transition-colors duration-300" 
              />
            </motion.div>
            <div className="min-h-screen w-full flex flex-col justify-between">
              <motion.main 
                className="container mx-auto px-4 md:px-6 py-12 md:py-24 flex flex-col lg:flex-row gap-12 lg:gap-24"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="mb-16"
                  >
                    <h1 className="text-[4rem] md:text-[5rem] lg:text-[6rem] font-light leading-[1] mb-6">
                      Got a project<br />in mind?<br />
                    </h1>
                    
                    <motion.a 
                      href="mailto:info@sainturbain.com"
                      className="text-xl md:text-2xl border-b border-white hover:border-white/50 pb-1 inline-block transition-all duration-300"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      info@sainturbain.com
                    </motion.a>
                  </motion.div>
                  
                  <div>
                    <p className="text-xs uppercase tracking-widest mb-8 text-white/70">
                      CONTACT FORM
                    </p>
                    
                    <form onSubmit={handleSubmit}>
                      <ContactInput
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      
                      <ContactInput
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      
                      <ContactInput
                        label="Company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                      />
                                  
                      <motion.button
                        type="submit"
                        className="group flex items-center gap-2 text-white font-light text-sm uppercase tracking-widest py-2 transition-all duration-300 disabled:opacity-50 mt-8"
                        disabled={isSubmitting}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>Send</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </motion.button>
                    </form>
                  </div>
                </div>
                
                <div className="flex-1 relative h-[400px] lg:h-auto">
                  <p className="text-xs uppercase tracking-widest text-white/70 lg:text-right">
                    FIG.01
                  </p>
                </div>
              </motion.main>       
            </div>
          </section>
          
          <section data-scroll-section>
            <Footer />
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomePage;