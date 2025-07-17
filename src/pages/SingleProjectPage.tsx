
import { useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowLeft, ArrowRight, Globe, Github, ExternalLink } from "lucide-react";
import { Project } from "@/components/ProjectCard";
import LocomotiveScroll from "locomotive-scroll";

// Mock project data (in a real app, you'd fetch this based on the ID)
const projectsData: Project[] = [
  {
    id: "project-1",
    title: "E-Commerce Platform",
    description: "A modern e-commerce platform with advanced filtering, cart functionality, and secure checkout. The project demonstrates a comprehensive approach to building scalable online shopping experiences with performance and user experience as top priorities.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    category: "Web Development",
    tags: ["React", "Node.js", "Stripe", "MongoDB"]
  },
  {
    id: "project-2",
    title: "Portfolio Website",
    description: "A creative portfolio website for a digital artist showcasing their work with interactive galleries. Featuring custom animations, image lazy loading, and a captivating user interface that highlights the artist's unique style.",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    category: "UI/UX Design",
    tags: ["React", "Three.js", "GSAP", "Framer Motion"]
  },
  {
    id: "project-3",
    title: "Finance Dashboard",
    description: "An analytics dashboard for financial data visualization with real-time updates and interactive charts. Built for financial analysts to track market trends, portfolio performance, and generate comprehensive reports with exportable data.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    category: "Web Application",
    tags: ["TypeScript", "D3.js", "Firebase", "Tailwind CSS"]
  },
  {
    id: "project-4",
    title: "Mobile App",
    description: "A cross-platform mobile application for task management with cloud synchronization and notifications. Designed to help users organize their work and personal tasks with intuitive interfaces, reminders, and progress tracking.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    category: "Mobile Development",
    tags: ["React Native", "Redux", "Firebase", "UI/UX"]
  },
  {
    id: "project-5",
    title: "Corporate Website",
    description: "A corporate website with custom CMS integration, multilingual support, and performance optimization. Built for a multinational company to showcase their services, team, and global presence with a consistent brand identity.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    category: "Web Development",
    tags: ["Next.js", "Strapi", "i18n", "Vercel"]
  },
  {
    id: "project-6",
    title: "Social Media Platform",
    description: "A niche social media platform with real-time chat, user profiles, and content sharing capabilities. Designed for a specific community to connect, share resources, and engage in discussions around shared interests.",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    category: "Full Stack",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"]
  }
];

const SingleProjectPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const locomotiveScrollRef = useRef<LocomotiveScroll | null>(null);
  
  const project = projectsData.find(p => p.id === id);
  
  const currentIndex = project ? projectsData.findIndex(p => p.id === project.id) : -1;
  const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : null;
  const nextProject = currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : null;
  
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
    if (!project) {
      navigate('/projects');
    }
    
    // Scroll to top when project changes
    window.scrollTo(0, 0);
    
    // Update locomotive scroll
    setTimeout(() => {
      locomotiveScrollRef.current?.update();
    }, 500);
  }, [project, navigate]);
  
  if (!project) return null;
  
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
            className="mb-8"
          >
            <Link 
              to="/projects" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
              data-cursor="hover"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
            
            <h1 className="text-4xl md:text-6xl font-medium tracking-tighter mb-6">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap gap-3 mb-6">
              {project.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.2, duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
            }}
            className="mb-16"
          >
            <div className="rounded-lg overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full object-cover"
                style={{ height: "500px" }}
              />
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.3, duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
              }}
              className="md:col-span-2"
            >
              <h2 className="text-2xl font-medium mb-6">Overview</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {project.description}
              </p>
              
              <h2 className="text-2xl font-medium mb-6">Challenge</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                The primary challenge was to create a system that balanced aesthetic appeal with technical performance. 
                We needed to ensure fast load times while delivering a visually rich experience, especially considering 
                the large media assets required for the project.
              </p>
              
              <h2 className="text-2xl font-medium mb-6">Solution</h2>
              <p className="text-muted-foreground leading-relaxed">
                By implementing advanced lazy loading techniques, optimizing assets, and using a component-based 
                architecture, we were able to create a seamless experience that performs well even on slower connections. 
                The solution includes responsive design principles to ensure usability across all device types.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.4, duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
              }}
            >
              <div className="bg-card rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-medium mb-6">Project Details</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider mb-2 text-muted-foreground">
                      Client
                    </h4>
                    <p>Acme Corporation</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider mb-2 text-muted-foreground">
                      Timeline
                    </h4>
                    <p>3 months</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider mb-2 text-muted-foreground">
                      Role
                    </h4>
                    <p>Lead Developer</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider mb-2 text-muted-foreground">
                      Links
                    </h4>
                    <div className="space-y-2">
                      <a 
                        href="#" 
                        className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                        data-cursor="hover"
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Live Website
                      </a>
                      <a 
                        href="#" 
                        className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                        data-cursor="hover"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Source Code
                      </a>
                      <a 
                        href="#" 
                        className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                        data-cursor="hover"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Case Study
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { delay: 0.5, duration: 0.8 }
            }}
            className="border-t border-border pt-12 mt-12"
          >
            <h2 className="text-2xl font-medium mb-8">More Projects</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {prevProject && (
                <Link 
                  to={`/projects/${prevProject.id}`}
                  className="p-6 bg-card rounded-lg hover:bg-muted/50 transition-colors group"
                  data-cursor="hover"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">Previous Project</span>
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  </div>
                  <h3 className="text-xl font-medium">{prevProject.title}</h3>
                </Link>
              )}
              
              {nextProject && (
                <Link 
                  to={`/projects/${nextProject.id}`}
                  className="p-6 bg-card rounded-lg hover:bg-muted/50 transition-colors group"
                  data-cursor="hover"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">Next Project</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="text-xl font-medium">{nextProject.title}</h3>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SingleProjectPage;
