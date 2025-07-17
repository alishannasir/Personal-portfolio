import { motion } from 'framer-motion';
import HoverText from '@/components/HoverText';
import ScrollingText from '@/components/ScrollingText';

const AboutSection = () => (
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
);

export default AboutSection; 