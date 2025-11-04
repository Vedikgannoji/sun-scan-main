import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import heroImage from "@/assets/hero-solar-farm.jpg";
import Chatbot from "@/components/Chatbot";
import { useState } from "react";

const Hero = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 hero-gradient" />
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6"
        >
          SunScan
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/90 mb-10"
        >
          Measure Solar Potential. Empower Clean Energy Decisions.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center"
        >
          <Link to="/auth">
            <Button variant="hero" size="lg">
              Get Started
            </Button>
          </Link>
        </motion.div>
      </div>
      
      {/* Floating Chat Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-8 left-0 right-0 z-20 flex justify-center"
      >
        <button
          onClick={() => setIsChatOpen(true)}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 flex items-center gap-3 shadow-medium hover:bg-white/20 transition-all cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 text-white" />
          <span className="text-white font-medium">Ask SolarBot a Question</span>
        </button>
      </motion.div>

      {/* Chatbot Component */}
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} showFloatingButton={false} />
    </section>
  );
};

export default Hero;
