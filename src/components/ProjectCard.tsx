
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  // Effect for 3D tilt on hover
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered || !card) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xPercent = x / rect.width;
      const yPercent = y / rect.height;
      
      // Calculate tilt rotation
      const tiltX = (yPercent - 0.5) * 10; // -5 to 5 degrees
      const tiltY = (0.5 - xPercent) * 10; // -5 to 5 degrees
      
      card.style.transform = `
        perspective(1000px)
        rotateX(${tiltX}deg)
        rotateY(${tiltY}deg)
        scale3d(1.02, 1.02, 1.02)
      `;
      
      // Animate image parallax
      if (imageRef.current) {
        imageRef.current.style.transform = `
          translateX(${(xPercent - 0.5) * -20}px)
          translateY(${(yPercent - 0.5) * -20}px)
        `;
      }
    };
    
    const handleMouseLeave = () => {
      if (!card) return;
      
      card.style.transform = `
        perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)
        scale3d(1, 1, 1)
      `;
      
      if (imageRef.current) {
        imageRef.current.style.transform = 'translateX(0) translateY(0)';
      }
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isHovered]);
  
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    }}
    className="border-b border-neutral-300 pb-24 mb-24"
  >
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-3">
        <h2 className="text-2xl font-medium mb-2">{project.title}</h2>
        <div className="space-y-1">
          {project.tags.map((tag, i) => (
            <p key={i} className="text-sm text-neutral-500">
              {tag}
            </p>
          ))}
          <p className="text-sm text-neutral-500">{project.category}</p>
        </div>
      </div>

      <div className="md:col-span-9">
        <Link
          to={`/projects/${project.id}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            ref={cardRef}
            className="overflow-hidden"
            style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
          >
            <img
              ref={imageRef}
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-auto object-cover transition-transform duration-500"
            />
          </div>
        </Link>
      </div>
    </div>
  </motion.div>
  
  );
}
