"use client";

import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Github, Code, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useExternalLinkTracking } from "@/lib/useExternalLinkTracking";

interface Project {
  title: string;
  description: string[];
  techStack: string[];
  link: string;
  github: string;
}

export default function ProjectCard({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const trackExternalLink = useExternalLinkTracking();

  // Mouse position for spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Create a smooth gradient spotlight that follows the mouse
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);

  const spotlightBackground = useMotionTemplate`
    radial-gradient(
      300px circle at ${spotlightX}px ${spotlightY}px,
      hsla(var(--primary), 0.15), /* Changed from --primary-hsl */
      transparent 80%
    )
  `;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);
    spotlightX.set(x);
    spotlightY.set(y);
  };

  const handleProjectLinkClick = () => {
    trackExternalLink(
      "project",
      `demo_${project.title.toLowerCase().replace(/\s+/g, "_")}`
    );
    window.open(project.link, "_blank");
  };

  const handleGithubLinkClick = () => {
    trackExternalLink(
      "project",
      `github_${project.title.toLowerCase().replace(/\s+/g, "_")}`
    );
    window.open(project.github, "_blank");
  };

  return (
    <motion.div
      ref={cardRef}
      className="h-full perspective-1000"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        className="group h-full overflow-hidden backdrop-blur-sm bg-card border border-border transition-all duration-500 hover:shadow-xl will-change-transform"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Spotlight effect overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 bg-card/40"
          style={
            {
              background: spotlightBackground as unknown as string,
              opacity: isHovered ? 1 : 0,
            } as React.CSSProperties
          }
        />

        {/* Background gradient */}
        <div className="absolute -right-16 -top-16 w-40 h-40 bg-gradient-to-br from-primary/10 to-tertiary/10 rounded-full blur-3xl group-hover:from-primary/30 group-hover:to-tertiary/20 transition-all duration-700"></div>
        <div className="absolute -left-16 -bottom-16 w-40 h-40 bg-gradient-to-tr from-accent/10 to-primary/5 rounded-full blur-3xl group-hover:from-accent/20 transition-all duration-700"></div>

        <CardHeader className="pb-3 relative z-20">
          <div className="flex items-start justify-between">
            <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              {project.title}
            </CardTitle>
            <div className="rounded-full flex items-center justify-center w-9 h-9 bg-accent/30 backdrop-blur-sm">
              <Code size={16} className="text-primary" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 relative z-20">
          <ul className="list-none space-y-3 text-foreground">
            {project.description.map((item: string, index: number) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-2"
              >
                <span className="text-primary mt-1">•</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 mt-5 pt-3 border-t border-border">
            {project.techStack.map((tech: string, index: number) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 + 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -3, scale: 1.05 }}
              >
                <Badge
                  variant="secondary"
                  className="bg-card/50 backdrop-blur-sm text-foreground border border-border hover:bg-accent/60 hover:text-accent-foreground transition-all duration-300 shadow-sm"
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex gap-3 pt-4 relative z-20">
          <Button
            variant="default"
            size="sm"
            className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 group"
            onClick={handleProjectLinkClick}
          >
            View Project{" "}
            <ArrowUpRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-card/50 backdrop-blur-sm border-border hover:border-primary hover:text-primary transition-all duration-300"
            onClick={handleGithubLinkClick}
          >
            <Github className="h-4 w-4" />
          </Button>
        </CardFooter>

        {/* Interactive hover effect */}
        <motion.div
          className="absolute inset-0 rounded-lg z-0"
          style={
            {
              border:
                "1px solid hsla(var(--primary), 0)" /* Changed from --card-border-rgb */,
            } as React.CSSProperties
          }
          animate={{
            boxShadow: isHovered
              ? "0 0 0 1px hsla(var(--primary), 0.2)" /* Changed from --card-border-rgb */
              : "0 0 0 0 hsla(var(--primary), 0)",
          }}
        />
      </Card>
    </motion.div>
  );
}
