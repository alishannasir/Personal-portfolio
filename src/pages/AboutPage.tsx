
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, Github, Linkedin, Twitter, Mail } from "lucide-react";
import LocomotiveScroll from "locomotive-scroll";
// import ExperienceTimeline from '@/components/sections/ExperienceTimeline';
import SkillTags from "@/components/SkillTags";

const AboutPage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const locomotiveScrollRef = useRef<LocomotiveScroll | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [navHeight, setNavHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  
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
    function updateHeights() {
      setNavHeight(navRef.current?.getBoundingClientRect().height || 0);
      setFooterHeight(footerRef.current?.getBoundingClientRect().height || 0);
      setContainerHeight(scrollRef.current?.getBoundingClientRect().height || window.innerHeight);
    }
    updateHeights();
    window.addEventListener('resize', updateHeights);
    return () => window.removeEventListener('resize', updateHeights);
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
      <div ref={navRef}><Navigation /></div>
      
      <main className="pt-32 px-6 md:px-12 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="max-w-5xl w-full mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            className="mb-20"
          >
            
            
            <motion.p 
              custom={2}
              variants={fadeInUp}
              className="text-3xl md:text-8xl text-foreground max-w-5xl mx-auto"
            >
              I'm a web developer with 3+ years of experience, passionate about creating 
              innovative digital experiences that merge design and technology.
            </motion.p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ 
              opacity: 1, 
              y: 0, 
              transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
            }}
            viewport={{ once: true, amount: 0.3 }}
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
            {/* Experience Timeline */}
            {/* <ExperienceTimeline /> */}
            {/* End Experience Timeline */}
            {/* <h2 className="text-2xl font-medium mb-6 mt-20">Skills & Expertise</h2>
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
            </div> */}
          </motion.div>
        </div>
      </main>
      <SkillTags skills={skills.flatMap(s => s.items)} />
      <div ref={footerRef}><Footer /></div>
    </div>
  );
};

export default AboutPage;
