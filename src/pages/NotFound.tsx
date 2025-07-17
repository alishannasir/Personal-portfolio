
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow flex items-center justify-center px-6 py-20">
        <motion.div 
          className="max-w-md w-full text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
          }}
        >
          <div className="text-9xl font-mono font-bold mb-6">404</div>
          <h1 className="text-3xl font-medium mb-6">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium group"
            data-cursor="hover"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Return to Home
          </Link>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
