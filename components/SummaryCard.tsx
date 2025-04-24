"use client";

import { useState, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Quote, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SummaryCard({ summary }: { summary: string }) {
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse position for spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Create a smooth gradient spotlight that follows the mouse
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);

  const spotlightBackground = useMotionTemplate`
    radial-gradient(
      350px circle at ${spotlightX}px ${spotlightY}px,
      hsla(var(--primary), 0.1), /* Changed from --primary-hsl */
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

  // Add line breaks before each sentence for better readability
  const formatSummary = (text: string) => {
    // Split by sentences (periods followed by a space)
    const sentences = text.split(/\.\s+/);

    // Map each sentence and add a period back (except for the last one if it doesn't end with a period)
    return sentences.map((sentence, i) => {
      const isLast = i === sentences.length - 1;
      const endsWithPeriod = sentence.endsWith(".");

      // If it's the last sentence and ends with a period, don't add another
      const formattedSentence =
        isLast && endsWithPeriod ? sentence : sentence + ".";

      return (
        <motion.p
          key={i}
          className="mb-3 last:mb-0"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
        >
          {formattedSentence}
        </motion.p>
      );
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="md:col-span-2"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Card className="summary-card glass border-border shadow-lg hover:shadow-xl transition-all duration-500 h-full overflow-hidden relative">
        {/* Spotlight effect overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 bg-card/40"
          style={
            {
              background: spotlightBackground as unknown as string,
              opacity: isHovering ? 1 : 0,
            } as React.CSSProperties
          }
        />

        {/* Background gradients */}
        <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-gradient-to-tr from-primary/10 via-accent/10 to-tertiary/5 rounded-full blur-3xl transform-gpu"></div>
        <div className="absolute -right-12 -top-12 w-32 h-32 bg-gradient-to-bl from-primary/10 via-primary/5 to-secondary/5 rounded-full blur-3xl transform-gpu"></div>

        <CardContent className="p-6 md:p-8 flex flex-col h-full relative z-20">
          <div className="flex items-center justify-between mb-6">
            <motion.h3
              className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Professional Summary
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="bg-primary/10 p-2 rounded-lg"
            >
              <Quote className="h-5 w-5 text-primary" />
            </motion.div>
          </div>

          <motion.div
            className="relative flex-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="absolute -left-2 top-0 h-full w-1 bg-gradient-to-b from-primary/80 via-primary/50 to-primary/30 rounded-full"></div>
            <div className="pl-4 text-foreground leading-relaxed font-light">
              {formatSummary(summary)}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-6 pt-4 border-t border-border flex justify-between items-center"
          >
            <p className="text-xs text-muted-foreground">
              Last updated: April 2025
            </p>

            <Button
              variant="outline"
              size="sm"
              className="group bg-card/50 border-border hover:bg-accent/50 hover:text-accent-foreground transition-all duration-300 backdrop-blur-sm"
            >
              <span>Download Resume</span>
              <Download className="ml-2 h-4 w-4 opacity-70 group-hover:translate-y-0.5 transition-transform" />
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
