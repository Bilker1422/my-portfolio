"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles, Star, Zap, ThumbsUp, Medal } from "lucide-react";

// Define types for our props
interface SkillLevelType {
  label: string;
  icon: React.ReactNode;
}

interface SkillLevelsType {
  [key: number]: SkillLevelType;
}

interface SkillCardProps {
  skill: string;
  level: number;
  index: number;
  categoryIndex: number;
  skillLevels: SkillLevelsType;
}

interface SkillsType {
  [category: string]: string[];
}

// Separate SkillCard component to properly scope hooks
const SkillCard = ({
  skill,
  level,
  index,
  categoryIndex,
  skillLevels,
}: SkillCardProps) => {
  const skillRef = useRef<HTMLDivElement>(null);

  // Mouse position for hover effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smoother animation
  const springConfig = { damping: 25, stiffness: 300 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  // Transform mouse position into rotation values with limits
  const rotateX = useTransform(mouseY, [-50, 50], [2, -2]);
  const rotateY = useTransform(mouseX, [-50, 50], [-2, 2]);
  const brightness = useTransform(mouseX, [-50, 50], [0.98, 1.02]);

  // Handle mouse move for 3D effect
  const handleMouseMove = (event: React.MouseEvent) => {
    if (!skillRef.current) return;
    const rect = skillRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={skillRef}
      key={skill}
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.07 + categoryIndex * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="bg-card/30 shadow-md hover:shadow-xl transition-all duration-300 p-4 border border-border rounded-lg"
        style={{
          rotateX,
          rotateY,
          filter: `brightness(${brightness})`,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.03, y: -5 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <div className="flex justify-between mb-2 items-center">
          <h4 className="text-base font-medium text-foreground flex items-center">
            {skill}
            <motion.span
              className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs text-primary-foreground bg-gradient-to-r from-primary/90 to-primary/90"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <span className="mr-1">{skillLevels[level].icon}</span>
              {skillLevels[level].label}
            </motion.span>
          </h4>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={`transform ${
                  i < level
                    ? "text-primary fill-primary"
                    : "text-muted-foreground"
                } ${i < level ? "scale-110" : "scale-100"}`}
              />
            ))}
          </div>
        </div>

        <div className="w-full bg-muted/50 backdrop-blur-sm rounded-full h-2.5 overflow-hidden">
          <motion.div
            className="h-2.5 rounded-full bg-gradient-to-r from-primary to-accent relative"
            style={{ width: `${(level / 5) * 100}%` }}
            initial={{ width: 0 }}
            whileInView={{ width: `${(level / 5) * 100}%` }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              delay: index * 0.07 + categoryIndex * 0.1,
            }}
            viewport={{ once: true }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-shimmer"></span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface SkillsSectionProps {
  skills: SkillsType;
  id?: string; // Add optional id prop type
}

export default function SkillsSection({ skills, id }: SkillsSectionProps) {
  // Add id prop
  // Store active category for enhanced filtering
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Skills mastery levels
  const skillLevels: SkillLevelsType = {
    5: { label: "Expert", icon: <Medal className="h-4 w-4" /> },
    4: { label: "Advanced", icon: <ThumbsUp className="h-4 w-4" /> },
    3: { label: "Intermediate", icon: <Zap className="h-4 w-4" /> },
  };

  // Animation variants
  const parentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const filterVariants = {
    active: {
      backgroundColor: "hsl(var(--primary))",
      color: "hsl(var(--primary-foreground))",
      scale: 1.05,
    },
    inactive: {
      backgroundColor: "hsl(var(--glass-background))",
      color: "hsl(var(--foreground))",
      scale: 1,
    },
  };

  const getSkillLevel = (skill: string): number => {
    // Simulating different skill levels consistently
    const nameHash = skill
      .split("")
      .reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
    return Math.max(3, Math.min(5, Math.floor(nameHash % 3) + 3));
  };

  // Get all unique categories
  const categories = Object.keys(skills);

  return (
    <div id={id} className="py-12 relative overflow-hidden">
      {" "}
      {/* Add id prop */}
      {/* Background decoration */}
      <div className="absolute -left-40 top-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -right-40 bottom-20 w-80 h-80 bg-tertiary/10 rounded-full blur-3xl"></div>
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="inline-flex items-center justify-center mb-3 px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 20,
              delay: 0.1,
            }}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Expertise
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text "
            style={{ backgroundSize: "300% 100%" }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            Technical Skills
          </motion.h2>

          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            A comprehensive overview of my technical expertise and proficiency
            in various technologies and tools.
          </motion.p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-8"
          variants={parentVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.button
            key="all"
            className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm transition-all duration-300 border border-border`}
            onClick={() => setActiveCategory(null)}
            animate={activeCategory === null ? "active" : "inactive"}
            variants={filterVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            All Skills
          </motion.button>

          {categories.map((category, index) => (
            <motion.button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm transition-all duration-300 border border-border`}
              onClick={() =>
                setActiveCategory(category === activeCategory ? null : category)
              }
              variants={filterVariants}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
          layout
        >
          {Object.entries(skills)
            .filter(
              ([category]) =>
                activeCategory === null || category === activeCategory
            )
            .map(([category, skillList], categoryIndex) => (
              <motion.div
                key={category}
                className="bg-card border border-border rounded-xl p-6 shadow-lg relative overflow-hidden hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                layout
              >
                <div className="absolute -right-16 -top-16 w-32 h-32 bg-gradient-to-br from-primary/10 to-tertiary/10 rounded-full blur-2xl"></div>
                <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-2xl"></div>

                <motion.h3
                  className="text-xl font-semibold mb-6 pb-3 border-b border-border flex items-center"
                  layout
                >
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text ">
                    {category}
                  </span>
                  <motion.span
                    className="ml-auto bg-primary/10 text-primary text-xs px-2 py-1 rounded-md"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {(skillList as string[]).length} skills
                  </motion.span>
                </motion.h3>

                <motion.div layout>
                  {(skillList as string[]).map((skill, index) => {
                    const level = getSkillLevel(skill);
                    return (
                      <SkillCard
                        key={skill}
                        skill={skill}
                        level={level}
                        index={index}
                        categoryIndex={categoryIndex}
                        skillLevels={skillLevels}
                      />
                    );
                  })}
                </motion.div>
              </motion.div>
            ))}
        </motion.div>

        {/* Skill level legend */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-4 pt-6 border-t border-border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-sm text-muted-foreground">Skill level:</div>
          {Object.entries(skillLevels).map(([level, { label, icon }]) => (
            <div
              key={level}
              className="flex items-center text-sm gap-1.5 text-foreground"
            >
              <div className="flex">
                {[...Array(Number(level))].map((_, i) => (
                  <Star
                    key={i}
                    size={10}
                    className="text-primary fill-primary"
                  />
                ))}
                {[...Array(5 - Number(level))].map((_, i) => (
                  <Star key={i} size={10} className="text-muted-foreground" />
                ))}
              </div>
              <span>{label}</span>
              <span className="ml-1">{icon}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
