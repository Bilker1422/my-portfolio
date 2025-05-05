"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  gpa?: string;
  description?: string;
  courses?: string[];
}

interface AboutSectionProps {
  education: EducationItem[];
  certifications: string[];
  id?: string; // Add id prop
}

export default function AboutSection({
  education,
  certifications, // Destructure certifications prop
  id, // Destructure id prop
}: AboutSectionProps) {
  return (
    <div className="py-8" id={id}>
      {" "}
      {/* Apply id prop to the root div */}
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-2xl font-bold text-center flex items-center justify-center gap-2 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GraduationCap className="h-6 w-6 text-primary" />
          <span>Education & Certifications</span>
        </motion.h2>

        <motion.div
          className="space-y-8"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          animate="show"
        >
          {education.map((edu: EducationItem, index: number) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <Card className="overflow-hidden backdrop-blur-sm bg-card/70 border border-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 relative">
                  <div className="absolute -right-16 -top-16 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl"></div>

                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4 relative">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {edu.degree}
                      </h3>
                      <p className="text-primary">{edu.institution}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          {edu.period}
                        </span>
                      </div>

                      {edu.gpa && (
                        <div className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full">
                          <Award className="h-4 w-4 text-primary" />
                          <span className="text-sm text-muted-foreground">
                            GPA: {edu.gpa}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {edu.description && (
                    <div className="mt-4 pl-4 border-l-2 border-primary/20">
                      <p className="text-foreground">{edu.description}</p>
                    </div>
                  )}

                  {edu.courses && edu.courses.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-primary" />
                        Relevant Coursework
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.courses.map((course: string, idx: number) => (
                          <motion.span
                            key={idx}
                            className="bg-muted px-3 py-1 rounded-full text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-default"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 + 0.2 }}
                          >
                            {course}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* <motion.div
          className="mt-12 bg-card/70 backdrop-blur-sm rounded-xl p-6 border border-border shadow-md relative overflow-hidden hover:shadow-lg transition-all duration-300"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-gradient-to-tr from-primary/10 to-accent/10 rounded-full blur-3xl"></div>

          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
            <Award className="h-5 w-5 mr-2 text-primary" />
            Certifications & Achievements
          </h3>

          <ul className="space-y-3">
            {certifications.map((cert, idx) => (
              <motion.li
                key={idx}
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 + 0.4 }}
                viewport={{ once: true }}
              >
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary"></div>
                <span className="text-foreground">{cert}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div> */}
      </div>
    </div>
  );
}
