import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-smooth ${
        isScrolled ? "bg-background border-b border-border shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className={`text-2xl font-bold transition-smooth ${
          isScrolled ? "text-foreground" : "text-white"
        }`}>
          SunScan
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          {isHomePage ? (
            <>
              <button
                onClick={() => scrollToSection("home")}
                className={`transition-smooth hover:scale-105 ${
                  isScrolled ? "text-foreground hover:text-foreground/80" : "text-white hover:text-white/80"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className={`transition-smooth hover:scale-105 ${
                  isScrolled ? "text-foreground hover:text-foreground/80" : "text-white hover:text-white/80"
                }`}
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className={`transition-smooth hover:scale-105 ${
                  isScrolled ? "text-foreground hover:text-foreground/80" : "text-white hover:text-white/80"
                }`}
              >
                Features
              </button>
            </>
          ) : (
            <Link to="/" className={`transition-smooth ${
              isScrolled ? "text-foreground hover:text-foreground/80" : "text-white hover:text-white/80"
            }`}>
              Home
            </Link>
          )}
          <Link to="/auth">
            <Button size="sm">Login</Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
