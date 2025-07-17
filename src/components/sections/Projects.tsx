import { motion } from 'framer-motion';
import { useState } from 'react';

interface Project {
  id: string;
  title: string;
  image: string;
  url: string;
}

export const projects: Project[] = [
  {
    id: 'stenger-bike',
    title: 'Stenger Bike',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    url: '/projects/stenger-bike',
  },
  {
    id: 'mate-libre',
    title: 'Mate Libre',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    url: 'https://example.com/mate-libre',
  },
  {
    id: 'lightship',
    title: 'Lightship',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    url: 'https://example.com/lightship',
  },
  {
    id: 'pangram-pangram',
    title: 'Pangram Pangram',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    url: 'https://example.com/pangram-pangram',
  },
  {
    id: 'baillat-studio',
    title: 'Baillat Studio',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    url: 'https://example.com/baillat-studio',
  },
];

export default function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const handleProjectClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <section id="projects" className="py-16 min-h-screen bg-black" data-scroll-section>
      <div className="container mx-auto px-6">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-16">
          Selected Work
        </h1>

        <div className="space-y-4">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="relative overflow-hidden rounded-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              onClick={() => handleProjectClick(project.url)}
            >
              <div className="aspect-w-8 aspect-h-2">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-6"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <h3 className="text-white text-xl font-medium">{project.title}</h3>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}