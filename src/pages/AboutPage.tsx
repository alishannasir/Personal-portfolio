
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, Github, Linkedin, Twitter, Mail } from "lucide-react";
import LocomotiveScroll from "locomotive-scroll";

const AboutPage = () => {
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
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * i,
        duration: 0.9,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    })
  };
  
  const skills = [
    { category: "Frontend", items: ["React", "TypeScript", "Next.js", "CSS/Sass", "Tailwind", "Framer Motion"] },
    { category: "Backend", items: ["Node.js", "Express", "MongoDB", "Firebase", "REST APIs", "GraphQL"] },
    { category: "Design", items: ["Figma", "UI/UX", "Wireframing", "Prototyping", "Design Systems"] },
    { category: "Other", items: ["Git", "CI/CD", "Testing", "Performance", "SEO", "Accessibility"] }
  ];
  
  const experience = [
    {
      role: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      period: "2020 - Present",
      description: "Lead developer for client projects, focusing on creating performant and accessible web applications with modern frameworks and technologies."
    },
    {
      role: "Web Developer",
      company: "Digital Agency",
      period: "2017 - 2020",
      description: "Developed responsive websites and interactive experiences for various clients across different industries, working closely with designers to implement pixel-perfect designs."
    },
    {
      role: "Junior Developer",
      company: "Startup Studio",
      period: "2015 - 2017",
      description: "Started my career building marketing websites and simple web applications, learning the fundamentals of web development and working in a fast-paced environment."
    }
  ];
  
  const socialLinks = [
    { icon: <Github size={20} />, name: "GitHub", href: "https://github.com" },
    { icon: <Linkedin size={20} />, name: "LinkedIn", href: "https://linkedin.com" },
    { icon: <Twitter size={20} />, name: "Twitter", href: "https://twitter.com" },
    { icon: <Mail size={20} />, name: "Email", href: "mailto:hello@example.com" }
  ];
  
  return (
    <div ref={scrollRef} data-scroll-container>
      <Navigation />
      
      <main className="pt-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            className="mb-20"
          >
            <motion.h1 
              custom={1}
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-medium tracking-tighter mb-8"
            >
              About Me
            </motion.h1>
            
            <motion.p 
              custom={2}
              variants={fadeInUp}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl"
            >
              I'm a web developer with 7+ years of experience, passionate about creating 
              innovative digital experiences that merge design and technology.
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-16 mb-20">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ 
                opacity: 1, 
                x: 0, 
                transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="md:col-span-2"
            >
              <div className="sticky top-32">
                <div className="aspect-[3/4] overflow-hidden rounded-lg bg-muted">
                  <img 
                    src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                    alt="Portrait of me"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="mt-8 space-y-4">
                  {socialLinks.map(link => (
                    <a 
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                      data-cursor="hover"
                    >
                      {link.icon}
                      <span className="ml-3">{link.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ 
                opacity: 1, 
                x: 0, 
                transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="md:col-span-3"
            >
              <h2 className="text-2xl font-medium mb-6">My Journey</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                I started my journey in web development over 7 years ago, driven by a fascination with 
                the intersection of design and technology. What began as a curiosity quickly evolved into 
                a passion as I discovered the power of creating digital experiences that can inform, 
                entertain, and inspire.
              </p>
              
              <p className="text-muted-foreground mb-10 leading-relaxed">
                Throughout my career, I've had the opportunity to work with startups, agencies, and 
                established companies across various industries. Each project has presented unique 
                challenges that have helped me grow both technically and creatively. I'm particularly 
                passionate about creating user-centric designs that not only look great but function 
                flawlessly across all devices and platforms.
              </p>
              
              <h2 className="text-2xl font-medium mb-6">Experience</h2>
              <div className="space-y-8 mb-12">
                {experience.map((job, index) => (
                  <motion.div 
                    key={job.role}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ 
                      opacity: 1, 
                      y: 0, 
                      transition: { 
                        delay: index * 0.1, 
                        duration: 0.6, 
                        ease: [0.43, 0.13, 0.23, 0.96] 
                      }
                    }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="border-l-2 border-muted pl-6 relative"
                  >
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1.5" />
                    <h3 className="text-xl font-medium">{job.role}</h3>
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">{job.company}</span>
                      <span className="text-sm text-muted-foreground">{job.period}</span>
                    </div>
                    <p className="text-muted-foreground">{job.description}</p>
                  </motion.div>
                ))}
              </div>
              
              <h2 className="text-2xl font-medium mb-6">Skills & Expertise</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                {skills.map((skillGroup, index) => (
                  <motion.div 
                    key={skillGroup.category}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ 
                      opacity: 1, 
                      y: 0, 
                      transition: { 
                        delay: index * 0.1, 
                        duration: 0.6, 
                        ease: [0.43, 0.13, 0.23, 0.96] 
                      }
                    }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <h3 className="text-lg font-medium mb-4">{skillGroup.category}</h3>
                    <ul className="space-y-2">
                      {skillGroup.items.map(skill => (
                        <li key={skill} className="flex items-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
              
              <h2 className="text-2xl font-medium mb-6">My Approach</h2>
              <p className="text-muted-foreground mb-10 leading-relaxed">
                I believe in creating solutions that not only meet but exceed expectations. My approach 
                combines technical excellence with creative problem-solving, always keeping the end user 
                in mind. I'm a strong advocate for clean, maintainable code and performance-optimized 
                applications that provide seamless experiences across all devices.
              </p>
              
              <div className="p-8 bg-card rounded-lg shadow-lg">
                <h3 className="text-xl font-medium mb-4">Let's Work Together</h3>
                <p className="text-muted-foreground mb-6">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>
                <Link
                  to="/contact"
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium inline-flex items-center group"
                  data-cursor="hover"
                >
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
