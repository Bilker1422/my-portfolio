"use client";

import { motion } from "framer-motion";
import { Code } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";

// Define the Project type based on ProjectCard's usage
interface Project {
  title: string;
  description: string[];
  techStack: string[];
  link: string;
  github: string;
}

export default function ProjectsSection({
  projects,
  id, // Add optional id prop
}: {
  projects: Project[];
  id?: string; // Add optional id prop type
}) {
  return (
    <div id={id} className="py-8">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Code className="h-6 w-6 text-primary" />
          <span>Featured Projects</span>
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          animate="show"
        >
          {projects.map((project: Project) => (
            <motion.div
              key={project.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground mb-6">
            Want to see more projects? Check out my GitHub repository for more
            examples of my work.
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-primary-foreground px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Code className="h-5 w-5" />
            View All Projects
          </a>
        </motion.div>
      </div>
    </div>
  );
}
