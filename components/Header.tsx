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
import { useExternalLinkTracking } from "@/lib/useExternalLinkTracking";
import { scrollToSection } from "@/lib/utils"; // Import the utility function

// Update Header props to accept setUserHasClicked
export default function Header({
  name,
  activeSection,
  setActiveSection,
  setUserHasClicked, // Add this prop
}: {
  name: string;
  activeSection: string;
  setActiveSection: (section: string) => void;
  setUserHasClicked: (value: boolean) => void; // Add type definition
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const trackExternalLink = useExternalLinkTracking();

  // Scroll progress for animations
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0.98]);

  // Effect for header background based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array: runs only once on mount

  // Effect to close mobile menu on scroll
  useEffect(() => {
    if (!mobileMenuOpen) return; // Only add listener if menu is open

    const closeMenuOnScroll = () => {
      setMobileMenuOpen(false);
    };

    // Add listener with passive: true for performance
    window.addEventListener("scroll", closeMenuOnScroll, { passive: true });

    // Cleanup function to remove the listener when the menu closes or component unmounts
    return () => {
      window.removeEventListener("scroll", closeMenuOnScroll);
    };
  }, [mobileMenuOpen]); // Re-run when mobileMenuOpen changes

  // Define header class based on scroll state
  const getHeaderClass = () => {
    // If mobile menu is open, keep header transparent
    if (mobileMenuOpen) {
      return "bg-transparent";
    }
    // Otherwise, apply glass effect if scrolled
    if (scrolled) {
      return "glass shadow-md";
    }
    // Default transparent background
    return "bg-transparent";
  };

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
  ];

  // Track resume download
  const handleResumeDownload = (device: string) => {
    trackExternalLink("download", `resume_${device}`);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    setActiveSection(sectionId);
    setUserHasClicked(true); // Indicate user click
    scrollToSection(sectionId); // Use the utility function for scrolling
  };

  const handleMobileNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    setActiveSection(sectionId);
    setUserHasClicked(true); // Indicate user click

    // Close the menu first
    setMobileMenuOpen(false);

    // Delay the scroll slightly to allow the menu to close/animate
    // Use requestAnimationFrame for better timing with rendering
    requestAnimationFrame(() => {
      // Add another small delay if needed, e.g., setTimeout(..., 50)
      scrollToSection(sectionId); // Use the utility function for scrolling
    });
  };

  return (
    <>
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
              className="text-xl font-bold relative group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-bold tracking-tighter mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text ">
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
                      onClick={(e) => handleNavClick(e, sectionId)} // Use the handler
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
                  onClick={() => trackExternalLink("social", "github")}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={18} />
                </motion.a>
                <motion.a
                  href="mailto:yahya@mahdali.dev"
                  className="text-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-accent/50"
                  onClick={() => trackExternalLink("contact", "email")}
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
                <a
                  href="full-stack-developer.pdf"
                  download="Yahya Mahdali.pdf"
                  onClick={() => handleResumeDownload("desktop")}
                >
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
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-gradient-to-br from-background to-background z-[999] flex flex-col backdrop-blur-md" // Made background fully opaque
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="container mx-auto px-6 py-4">
              <div className="flex justify-between items-center">
                <motion.a
                  href="#"
                  className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text "
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
                      onClick={(e) => handleMobileNavClick(e, sectionId)} // Use the handler
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
                    onClick={() => trackExternalLink("social", "github")}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={20} />
                  </motion.a>
                  <motion.a
                    href="mailto:yahya@mahdali.dev"
                    className="bg-accent/30 p-3 rounded-full text-foreground hover:text-primary hover:bg-accent/50 transition-colors"
                    onClick={() => trackExternalLink("contact", "email")}
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
                    onClick={() => {
                      handleResumeDownload("mobile");
                      setMobileMenuOpen(false);
                    }}
                  >
                    <Button className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6">
                      Download Resume <Download size={16} className="ml-2" />
                    </Button>
                  </a>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
