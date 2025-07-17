
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import LocomotiveScroll from "locomotive-scroll";

const ContactPage = () => {
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);
  const locomotiveScrollRef = useRef<LocomotiveScroll | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };
  
  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", email: "", message: "" };
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }, 1500);
  };
  
  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location",
      details: "San Francisco, CA, USA",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      details: "+1 (555) 123-4567",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: "hello@example.com",
    }
  ];
  
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
            className="mb-20"
          >
            <h1 className="text-5xl md:text-7xl font-medium tracking-tighter mb-8">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
              Have a project in mind or want to discuss a potential collaboration? 
              I'd love to hear from you.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ 
                opacity: 1, 
                x: 0, 
                transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
              }}
              className="md:col-span-1"
            >
              <div className="space-y-12">
                {contactInfo.map((item, index) => (
                  <motion.div 
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      transition: { 
                        delay: 0.2 + index * 0.1, 
                        duration: 0.6 
                      }
                    }}
                    className="flex items-start"
                  >
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">{item.title}</h3>
                      <p className="text-muted-foreground">{item.details}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  transition: { delay: 0.5, duration: 0.6 }
                }}
                className="mt-12 p-6 bg-card rounded-lg shadow-lg"
              >
                <h3 className="text-lg font-medium mb-4">Office Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday:</span>
                    <span>By appointment</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ 
                opacity: 1, 
                x: 0, 
                transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
              }}
              className="md:col-span-2"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-muted border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                        errors.name ? "border-destructive" : "border-border"
                      }`}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-destructive">{errors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-muted border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                        errors.email ? "border-destructive" : "border-border"
                      }`}
                      placeholder="Your email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Subject"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-4 py-3 bg-muted border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                      errors.message ? "border-destructive" : "border-border"
                    }`}
                    placeholder="Your message"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-destructive">{errors.message}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium inline-flex items-center group disabled:opacity-70"
                  data-cursor="hover"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ 
              opacity: 1, 
              y: 0, 
              transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
            }}
            viewport={{ once: true, amount: 0.3 }}
            className="my-24 p-12 bg-card rounded-lg shadow-lg text-center"
          >
            <h2 className="text-3xl font-medium mb-6">Let's Create Something Amazing Together</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-0">
              Whether you have a specific project in mind or just want to explore possibilities,
              I'm here to help bring your vision to life.
            </p>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
