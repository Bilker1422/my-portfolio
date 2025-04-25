"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Menu, X, Github, Mail, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

// Update Header props to accept activeSection and setActiveSection
export default function Header({
  name,
  activeSection,
  setActiveSection,
}: {
  name: string;
  activeSection: string;
  setActiveSection: (section: string) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll progress for animations
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0.98]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Define header class based on scroll state
  const getHeaderClass = () => {
    if (scrolled) {
      // Apply glass effect which includes background and blur based on theme variables
      return "glass shadow-md";
    }
    return "bg-transparent";
  };

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
  ];

  return (
    <motion.header
      style={{
        opacity: headerOpacity,
      }}
      className={`fixed top-0 left-0 right-0 z-50 py-3 px-6 transition-all duration-500 ${getHeaderClass()}`}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <motion.a
            href="#"
            className="inline-block text-xl font-bold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-primary">&lt;</span>
            Yahya Mahdali
            <span className="text-primary">/&gt;</span>
          </motion.a>
          <motion.a
            href="#"
            className="text-xl font-bold relative group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-bold tracking-tighter mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              <span className="opacity-80 mr-1">&lt;</span>
              {name}
              <span className="opacity-80 ml-1">/&gt;</span>
            </span>
            <motion.span
              className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary/50 to-accent/50"
              initial={{ scaleX: 0, originX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden md:flex items-center gap-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex gap-1">
              {navItems.map((item, index) => {
                const sectionId = item.href.replace("#", "");
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      if (item.href.startsWith("#")) {
                        e.preventDefault();
                        setActiveSection(sectionId);
                        document.getElementById(sectionId)?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }
                    }}
                    className={`px-4 py-2 rounded-lg relative transition-colors ${
                      activeSection === sectionId
                        ? "text-primary font-medium"
                        : "text-foreground hover:text-primary"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    {item.label}
                    {activeSection === sectionId && (
                      <motion.span
                        className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary/80 rounded-full"
                        layoutId="activeSection"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.a>
                );
              })}
            </div>

            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <motion.a
                href="https://github.com/Bilker1422"
                className="text-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-accent/50"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={18} />
              </motion.a>
              <motion.a
                href="mailto:yahyamdev@gmail.com"
                className="text-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-accent/50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={18} />
              </motion.a>
              <ThemeToggle />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <a href="full-stack-developer.pdf" download="Yahya Mahdali.pdf">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 px-4"
                >
                  Resume <Download size={14} className="ml-2 opacity-80" />
                </Button>
              </a>
            </motion.div>
          </motion.nav>

          {/* Mobile Navigation Button */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="bg-accent/50 hover:bg-accent/70 text-foreground p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus-visible:ring-offset-2 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu size={20} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-gradient-to-br from-background/95 to-background z-40 flex flex-col backdrop-blur-md"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="container mx-auto px-6 py-4">
              <div className="flex justify-between items-center">
                <motion.a
                  href="#"
                  className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="opacity-80 mr-1">&lt;</span>
                  {name}
                  <span className="opacity-80 ml-1">/&gt;</span>
                </motion.a>
                <motion.button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-foreground focus:outline-none bg-accent/50 hover:bg-accent/70 p-2 rounded-lg focus:ring-2 focus:ring-ring focus-visible:ring-offset-2 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={20} />
                </motion.button>
              </div>

              <nav className="flex flex-col gap-4 mt-12">
                {navItems.map((item, index) => {
                  const sectionId = item.href.replace("#", "");
                  return (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => {
                        if (item.href.startsWith("#")) {
                          e.preventDefault();
                          setMobileMenuOpen(false);
                          setActiveSection(sectionId);
                          document.getElementById(sectionId)?.scrollIntoView({
                            behavior: "smooth",
                          });
                        } else {
                          setMobileMenuOpen(false);
                        }
                      }}
                      className={`text-lg px-4 py-3 ${
                        activeSection === sectionId
                          ? "bg-accent/50 text-primary font-medium rounded-lg border-l-2 border-primary"
                          : "text-foreground hover:text-primary hover:bg-accent/20 rounded-lg transition-colors"
                      }`}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                    >
                      {item.label}
                    </motion.a>
                  );
                })}

                <div className="flex justify-center gap-6 mt-8">
                  <motion.a
                    href="https://github.com/Bilker1422"
                    className="bg-accent/30 p-3 rounded-full text-foreground hover:text-primary hover:bg-accent/50 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={20} />
                  </motion.a>
                  <motion.a
                    href="mailto:yahyamdev@gmail.com"
                    className="bg-accent/30 p-3 rounded-full text-foreground hover:text-primary hover:bg-accent/50 transition-colors"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail size={20} />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="bg-accent/30 p-3 rounded-full text-foreground hover:text-primary hover:bg-accent/50 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                </div>

                <motion.div
                  className="mt-8 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <a
                    href="full-stack-developer.pdf"
                    download="Yahya Mahdali.pdf"
                  >
                    <Button
                      className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Download Resume <Download size={16} className="ml-2" />
                    </Button>
                  </a>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
