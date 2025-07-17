
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProjectCard, Project } from "@/components/ProjectCard";
import LocomotiveScroll from "locomotive-scroll";

const projectsData: Project[] = [
  {
    id: "project-1",
    title: "E-Commerce Platform",
    description: "A modern e-commerce platform with advanced filtering, cart functionality, and secure checkout.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    category: "Web Development",
    tags: ["React", "Node.js", "Stripe", "MongoDB"]
  },
  {
    id: "project-2",
    title: "Portfolio Website",
    description: "A creative portfolio website for a digital artist showcasing their work with interactive galleries.",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    category: "UI/UX Design",
    tags: ["React", "Three.js", "GSAP", "Framer Motion"]
  },
  {
    id: "project-3",
    title: "Finance Dashboard",
    description: "An analytics dashboard for financial data visualization with real-time updates and interactive charts.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    category: "Web Application",
    tags: ["TypeScript", "D3.js", "Firebase", "Tailwind CSS"]
  },
  {
    id: "project-4",
    title: "Mobile App",
    description: "A cross-platform mobile application for task management with cloud synchronization and notifications.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    category: "Mobile Development",
    tags: ["React Native", "Redux", "Firebase", "UI/UX"]
  },
  {
    id: "project-5",
    title: "Corporate Website",
    description: "A corporate website with custom CMS integration, multilingual support, and performance optimization.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    category: "Web Development",
    tags: ["Next.js", "Strapi", "i18n", "Vercel"]
  },
  {
    id: "project-6",
    title: "Social Media Platform",
    description: "A niche social media platform with real-time chat, user profiles, and content sharing capabilities.",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    category: "Full Stack",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"]
  }
];

const categories = [
  "All",
  "Web Development",
  "UI/UX Design",
  "Web Application",
  "Mobile Development",
  "Full Stack"
];

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const scrollRef = useRef<HTMLDivElement>(null);
  const locomotiveScrollRef = useRef<LocomotiveScroll | null>(null);
  
  useEffect(() => {
    if (!scrollRef.current) return;
    
    // Initialize locomotive scroll
    locomotiveScrollRef.current = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      smoothMobile: false,
      multiplier: 1,
    });
    
    // Clean up
    return () => {
      locomotiveScrollRef.current?.destroy();
    };
  }, []);
  
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(projectsData);
    } else {
      setFilteredProjects(
        projectsData.filter(project => project.category === selectedCategory)
      );
    }
    
    // Update locomotive scroll
    setTimeout(() => {
      locomotiveScrollRef.current?.update();
    }, 500);
  }, [selectedCategory]);
  
  return (
    <div ref={scrollRef} data-scroll-container>
      <Navigation />
      
      <main className="pt-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
            }}
            className="mb-16 md:mb-24"
          >
            <h1 className="text-5xl md:text-7xl font-medium tracking-tighter mb-8">
              Featured Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              A selection of my most recent work across various domains and technologies,
              showcasing my technical expertise and creative approach.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.6, delay: 0.2 }
            }}
            className="mb-16 overflow-x-auto scrollbar-hide"
          >
            <div className="flex space-x-4 pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
                  }`}
                  data-cursor="hover"
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
          
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> */}
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
              />
            ))}
          {/* </div> */}
          
          
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-xl text-muted-foreground">
                No projects found in this category.
              </p>
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProjectsPage;
