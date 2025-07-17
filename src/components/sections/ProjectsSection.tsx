import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HoverText from '@/components/HoverText';
import { projects } from '@/lib/store';

const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleProjectHover = (projectId: string | null) => {
    setActiveProject(projectId);
  };

  const handleProjectClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const activeProjectData = activeProject 
    ? projects.find(p => p.id === activeProject) 
    : null;

  // Track mouse position for image preview
  // Attach event listener on mount
  useState(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  });

  return (
    <section id="projects" className="py-15 min-h-screen flex items-center justify-center" data-scroll-section>
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
    </section>
  );
};

export default ProjectsSection; 