"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Helper to update state based on current class
    const updateThemeState = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    // Initial check
    updateThemeState();

    // Listen for storage changes (other tabs)
    const onStorage = (e: StorageEvent) => {
      if (e.key === "theme") {
        updateThemeState();
      }
    };
    window.addEventListener("storage", onStorage);

    // Listen for system color scheme changes
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onMediaChange = () => {
      if (!localStorage.getItem("theme")) {
        updateThemeState();
      }
    };
    media.addEventListener("change", onMediaChange);

    // Listen for class changes (in case something else changes it)
    const observer = new MutationObserver(updateThemeState);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("storage", onStorage);
      media.removeEventListener("change", onMediaChange);
      observer.disconnect();
    };
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative h-9 w-9 rounded-full"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDarkMode ? "dark" : "light"}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {isDarkMode ? (
            <Moon className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
          ) : (
            <Sun className="h-5 w-5 text-foreground hover:text-primary transition-colors" />
          )}
        </motion.div>
      </AnimatePresence>

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
