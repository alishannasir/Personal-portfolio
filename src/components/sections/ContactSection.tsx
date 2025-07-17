import { useState } from 'react';
import { motion } from 'framer-motion';
import HoverText from '@/components/HoverText';
import ContactInput from '@/components/ContactInput';
import { ArrowRight } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    budget: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  );
};

export default ContactSection; 