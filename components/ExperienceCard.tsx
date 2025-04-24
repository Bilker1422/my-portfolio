"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Calendar, MapPin } from "lucide-react";

// Define the Experience type
interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  techStack?: string[]; // Optional tech stack
}

export default function ExperienceCard({
  experience,
}: {
  experience: Experience;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden border-border backdrop-blur-sm bg-card/70 hover:shadow-lg transition-all duration-300">
        <div className="absolute h-full w-1 bg-gradient-to-b from-primary to-accent left-0 top-0 opacity-70"></div>

        <CardHeader className="relative pb-2">
          <div className="absolute -right-24 -top-24 w-48 h-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl"></div>
          <CardTitle className="text-xl font-bold text-card-foreground">
            {experience.title}
          </CardTitle>
          <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Building className="h-4 w-4 text-primary" />
              <span>{experience.company}</span>
            </div>
            {experience.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{experience.location}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{experience.period}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-2">
          <ul className="space-y-2 text-foreground">
            {experience.description.map((item: string, index: number) => (
              <motion.li
                key={index}
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="text-left">{item}</span>
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 mt-4">
            {experience.techStack?.map((tech: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Badge
                  variant="secondary"
                  className="bg-muted hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
