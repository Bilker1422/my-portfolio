"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import ExperienceCard from "@/components/ExperienceCard";

// Define the Experience type based on ExperienceCard's usage
interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  techStack?: string[]; // Optional tech stack
}

export default function ExperienceSection({
  experiences,
  id, // Add optional id prop
}: {
  experiences: Experience[];
  id?: string; // Add optional id prop type
}) {
  return (
    <div id={id} className="py-8">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Briefcase className="h-6 w-6 text-primary" />
          <span>Work Experience</span>
        </motion.h2>

        <div className="relative">
          {/* Timeline Line */}
          {/* Use specific grays for light/dark modes */}

          {/* Experience Cards */}
          <div className="relative space-y-12 py-4">
            {experiences.map((experience: Experience, index: number) => (
              <div key={index} className="relative z-10">
                {/* Timeline Dot */}
                {/* Changed colors to red/yellow and increased z-index for visibility check */}

                <div
                  className={`pl-12 md:pl-0 ${
                    index % 2 === 0 ? "md:pr-16" : "md:pl-16"
                  } ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                >
                  <div className={index % 2 === 0 ? "md:mr-8" : "md:ml-8"}>
                    <ExperienceCard experience={experience} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-16 bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 shadow-md relative overflow-hidden hover:shadow-lg transition-all duration-300"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="absolute -right-24 -top-24 w-48 h-48 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>

          <h3 className="text-xl font-bold mb-4 text-foreground">
            Professional Summary
          </h3>
          <p className="text-foreground leading-relaxed">
            Full Stack Developer with strong expertise in React.js ecosystem
            (Redux, Zustand, React Query) and backend technologies (Django,
            FastAPI). Proficiency in both SQL (PostgreSQL) and NoSQL (DynamoDB)
            databases. Demonstrated track record of delivering high-impact
            features in fast-paced environments, focusing on frontend
            optimization and efficient backend integrations.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
