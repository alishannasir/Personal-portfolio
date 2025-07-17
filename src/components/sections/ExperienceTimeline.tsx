import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Example experience data (replace or pass as prop as needed)
const experience = [
  {
    role: 'Senior Frontend Developer',
    company: 'Tech Innovations Inc.',
    period: '2020 - Present',
    description: 'Lead developer for client projects, focusing on creating performant and accessible web applications with modern frameworks and technologies.'
  },
  {
    role: 'Web Developer',
    company: 'Digital Agency',
    period: '2017 - 2020',
    description: 'Developed responsive websites and interactive experiences for various clients across different industries, working closely with designers to implement pixel-perfect designs.'
  },
  {
    role: 'Junior Developer',
    company: 'Startup Studio',
    period: '2015 - 2017',
    description: 'Started my career building marketing websites and simple web applications, learning the fundamentals of web development and working in a fast-paced environment.'
  }
];

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }
  })
};

const ExperienceTimeline: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  // Animate the line height from 0% to 100% as you scroll through the section
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative flex justify-center items-center min-h-[600px] py-24">
      {/* Vertical animated line */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full flex flex-col items-center z-0">
        <motion.div
          style={{ height: lineHeight }}
          className="w-10 bg-black rounded-full origin-top"
        />
      </div>
      {/* Experience items */}
      <div className="w-full max-w-4xl z-10">
        {experience.map((job, i) => (
          <motion.div
            key={job.role}
            className={`relative flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'} mb-16`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={i}
            variants={itemVariants}
          >
            <div className={`w-1/2 px-6 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
              <div className="bg-white/90 dark:bg-black/80 shadow-lg rounded-lg p-6 inline-block">
                <h3 className="text-xl font-semibold mb-1 text-black">{job.role}</h3>
                <div className="text-sm  mb-1 text-black">{job.company}</div>
                <div className="text-xs  mb-2 text-black">{job.period}</div>
                <p className="text-base  text-black">{job.description}</p>
              </div>
            </div>
            {/* Dot on the line */}
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-primary rounded-full border-4 border-white dark:border-black z-20" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceTimeline; 