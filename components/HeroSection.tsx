"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Github, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiVuedotjs,
  SiReactquery,
  SiRedux,
  SiGo,
  SiDjango,
  SiGraphql,
  SiFastapi,
  SiAmazondynamodb,
  SiPostgresql,
  SiRedis,
  SiFirebase,
  SiFlutter,
  SiSqlite,
} from "react-icons/si";
import portfolioData from "@/data/portfolio.json";

const { personal } = portfolioData;

// Update the scrollToSection function to only work with existing elements
const scrollToSection = (
  sectionId: string,
  setActiveSection?: (section: string) => void
) => {
  // Check if the element exists first
  const section = document.getElementById(sectionId);
  if (section) {
    // Only update active section if it exists and setActiveSection is provided
    if (setActiveSection) {
      setActiveSection(sectionId);
    }
    // Scroll to the section
    section.scrollIntoView({ behavior: "smooth" });
  }
};

export default function HeroSection({
  name,
  title,
  id, // Add optional id prop
  setActiveSection, // Add optional setActiveSection prop
}: {
  name: string;
  title: string;
  id?: string;
  setActiveSection?: (section: string) => void;
}) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Mouse movement variables for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-300, 300], [15, -15]);
  const rotateY = useTransform(springX, [-300, 300], [-15, 15]);

  const words = title.split(" ");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (parallaxRef.current) {
        const rect = parallaxRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Staggered entry animations
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // Custom cubic bezier for smooth entry
      },
    },
  };

  const textGradient = {
    hidden: {
      backgroundPosition: "0% 50%",
      opacity: 0,
      y: 20,
    },
    visible: {
      backgroundPosition: "100% 50%",
      opacity: 1,
      y: 0,
      transition: {
        backgroundPosition: {
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        },
        opacity: { duration: 0.8 },
        y: { duration: 0.8 },
      },
    },
  };

  return (
    <section
      id={id}
      className="min-h-screen relative flex flex-col items-center justify-center px-4 overflow-hidden pt-16"
    >
      {/* Enhanced background effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute -top-24 -right-24 w-[200%] h-32 bg-gradient-to-r from-primary/10 to-tertiary/10 blur-3xl transform rotate-12"></div>
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-gradient-to-r from-primary/20 to-secondary/10 blur-3xl rounded-full"></div>
        </div>
      </div>

      <div className="container max-w-6xl z-20 mx-auto flex flex-col md:flex-row items-center justify-between gap-8 py-8">
        <motion.div
          className="max-w-2xl"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="text-primary font-medium mb-2" variants={item}>
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-3 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text"
            style={{
              backgroundSize: "300% 100%",
            }}
            variants={textGradient}
          >
            {name}
          </motion.h1>

          <div className="overflow-hidden mb-6">
            <motion.div
              className="text-2xl md:text-3xl text-foreground"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-2"
                  variants={{
                    hidden: {
                      y: 30,
                      opacity: 0,
                    },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        duration: 0.5,
                        delay: 0.4 + i * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </div>

          <motion.p
            className="text-muted-foreground mb-8 max-w-lg"
            variants={item}
          >
            Building modern applications with a focus on performance,
            accessibility, and user experience. Passionate about creating
            intuitive digital solutions that solve real-world problems.
          </motion.p>

          {/* Tech Stack Icons Section with Default Styled Tooltips */}
          <motion.div
            className="flex flex-wrap items-center gap-3 mb-8"
            variants={item} // Use the same variant as the paragraph above
          >
            <TooltipProvider delayDuration={100}>
              {/* Remove the span wrapper around TooltipTrigger children */}
              <Tooltip>
                <TooltipTrigger>
                  <SiReact
                    title="React.js"
                    size={40}
                    color="#61DAFB"
                    className="hover:opacity-80 transition-opacity"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>React.js</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <SiNextdotjs
                    title="Next.js"
                    size={40}
                    color="#000000"
                    className="hover:opacity-80 transition-opacity"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Next.js</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <SiTypescript
                    title="TypeScript"
                    size={40}
                    color="#3178C6"
                    className="hover:opacity-80 transition-opacity"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>TypeScript</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <SiVuedotjs
                    title="Vue.js"
                    size={40}
                    color="#4FC08D"
                    className="hover:opacity-80 transition-opacity"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Vue.js</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <SiReactquery
                    title="React Query"
                    size={40}
                    color="#FF4154"
                    className="hover:opacity-80 transition-opacity"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>React Query</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <SiRedux
                    title="Redux"
                    size={40}
                    color="#764ABC"
                    className="hover:opacity-80 transition-opacity"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Redux</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <SiGo
                    title="Golang"
                    size={40}
                    color="#00ADD8"
                    className="hover:opacity-80 transition-opacity"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Golang</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <SiDjango
                    title="Django"
                    size={40}
                    color="#092E20"
                    className="hover:opacity-80 transition-opacity"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Django</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <SiGraphql
                    title="GraphQL"
                    size={40}
                    color="#E10098"
                    className="hover:opacity-80 transition-opacity"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>GraphQL</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <SiFastapi
                    title="FastAPI"
                    size={40}
                    color="#009688"
                    className="hover:opacity-80 transition-opacity"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>FastAPI</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <SiAmazondynamodb
                    title="DynamoDB"
                    size={40}
                    color="#4053D6"
                    className="hover:opacity-80 transition-opacity"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>DynamoDB</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <SiPostgresql
                    title="PostgreSQL"
                    size={40}
                    color="#4169E1"
                    className="hover:opacity-80 transition-opacity"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>PostgreSQL</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <SiRedis
                    title="Redis"
                    size={40}
                    color="#DC382D"
                    className="hover:opacity-80 transition-opacity"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Redis</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <SiFirebase
                    title="Firebase"
                    size={40}
                    color="#FFCA28"
                    className="hover:opacity-80 transition-opacity"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Firebase</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <SiFlutter
                    title="Flutter"
                    size={40}
                    color="#02569B"
                    className="hover:opacity-80 transition-opacity"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Flutter</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <SiSqlite
                    title="SQLite"
                    size={40}
                    color="#003B57"
                    className="hover:opacity-80 transition-opacity"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>SQLite</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-4 justify-center md:justify-start"
            variants={item}
          >
            <Button
              onClick={() => scrollToSection("about", setActiveSection)}
              size="lg"
              className="group bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View my work{" "}
              <ArrowDown className="ml-1 group-hover:translate-y-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="glass border-border hover:border-primary transition-colors duration-300"
              onClick={() => window.open(personal.githubUrl)}
            >
              <Github className="mr-1 transition-transform group-hover:scale-110" />
              Github
            </Button>
            <a href={personal.resumeUrl} download={personal.resumeFilename}>
              <Button
                variant="outline"
                size="lg"
                className="glass border-border hover:border-primary transition-colors duration-300"
              >
                <FileText className="mr-1" />
                Resume
              </Button>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          ref={parallaxRef}
          style={{
            rotateX: rotateX,
            rotateY: rotateY,
            transformStyle: "preserve-3d",
            perspective: 1000,
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="relative will-change-transform group" // Add group for hover effects
          whileHover={{ scale: 1.02 }}
        >
          {/* Apply border and hover effect to the outer container */}
          <div className="bg-gradient-to-br from-primary/80 to-tertiary/80 rounded-2xl p-[2px] shadow-2xl transform group-hover:shadow-primary/40 transition-all duration-500">
            {/* Inner card styling */}
            <div className="bg-card p-1 rounded-xl backdrop-blur-md backdrop-filter border border-transparent group-hover:border-primary/30 transition-colors duration-300">
              <div className="rounded-lg overflow-hidden relative">
                {/* Header with window controls */}
                <div className="flex items-center px-4 py-3 border-b border-border bg-card/90">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500 group-hover:bg-red-400 transition-colors"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 group-hover:bg-yellow-400 transition-colors"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 group-hover:bg-green-400 transition-colors"></div>
                  </div>
                  <div className="text-xs text-center flex-1 text-muted-foreground font-mono group-hover:text-foreground transition-colors">
                    developer.js
                  </div>
                  {/* Add a subtle element to balance the controls */}
                  <div className="w-9"></div>
                </div>
                {/* Code content area */}
                <div className="font-mono text-sm p-6 text-left min-h-[240px] min-w-[320px] bg-card/70">
                  <div className="flex items-start gap-2 mb-4">
                    <span className="text-muted-foreground">&#47;&#47;</span>
                    <span className="text-foreground animate-pulse-slow">
                      Welcome to my portfolio
                    </span>
                  </div>
                  <div className="flex items-start gap-2 mb-3">
                    <span className="text-primary">const</span>
                    <span className="text-accent-foreground">developer</span>
                    <span className="text-foreground">= {"{"}</span>
                  </div>
                  <div className="pl-6 mb-3">
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-secondary-foreground">name:</span>
                      <span className="text-accent animate-float">
                        &apos;{name}&apos;,
                      </span>
                    </div>
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-secondary-foreground">title:</span>
                      <span className="text-accent">&apos;{title}&apos;,</span>
                    </div>
                    <div className="flex flex-wrap items-start gap-2 mb-2">
                      <span className="text-secondary-foreground">skills:</span>
                      <motion.span className="text-foreground">[ </motion.span>
                      <motion.span
                        className="text-accent"
                        animate={{
                          opacity: [1, 0.8, 1],
                          transition: { duration: 2, repeat: Infinity },
                        }}
                      ></motion.span>
                      <motion.span className="text-foreground"> ]</motion.span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-secondary-foreground">
                        available:
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-primary">true</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-foreground">{"}"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <motion.div
            className="absolute -bottom-8 -right-8 transform rotate-12 text-5xl z-10"
            animate={{
              y: [0, -8, 0],
              rotate: [12, 18, 12],
              transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            💻
          </motion.div>

          <div className="absolute -z-10 -top-12 -left-2 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -z-10 -bottom-8 -right-16 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <Button
          variant="ghost"
          size="icon"
          className="animate-bounce rounded-full glass hover:bg-accent/50 transition-colors duration-300"
          onClick={() => scrollToSection("about", setActiveSection)}
        >
          <ArrowDown className="text-primary" />
        </Button>
      </motion.div>
    </section>
  );
}
