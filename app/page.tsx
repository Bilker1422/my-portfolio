"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, Code, GraduationCap, LayoutGrid, User } from "lucide-react";
import dynamic from "next/dynamic";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCard from "@/components/ContactCard";
import SummaryCard from "@/components/SummaryCard";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import HeroSection from "@/components/HeroSection";
import { event } from "@/lib/gtag";

// Define the structure of the portfolio data
interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  summary: string;
}

interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  gpa?: string;
  description?: string;
  courses?: string[];
}

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  techStack?: string[];
}

interface ProjectItem {
  title: string;
  description: string[];
  techStack: string[];
  link?: string;
  github?: string;
}

interface SkillsData {
  [category: string]: string[];
}

interface PortfolioData {
  personal: PersonalInfo;
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillsData;
}

// Dynamically import components that use browser-only APIs
// This prevents server/client hydration mismatches
const AnimatedBackground = dynamic(
  () => import("@/components/AnimatedBackground"),
  {
    ssr: false,
  }
);

const BackToTop = dynamic(() => import("@/components/BackToTop"), {
  ssr: false,
});

export default function Home() {
  // Use the PortfolioData interface for the state type
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(
    null
  );
  const [activeSection, setActiveSection] = useState("about");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a production app, you would fetch this from an API endpoint
    const fetchData = async () => {
      try {
        // Assuming portfolio.json is correctly imported or fetched
        const data = await import("@/data/portfolio.json");
        // Ensure the fetched data matches the PortfolioData structure
        setPortfolioData(data.default as PortfolioData);
      } catch (error) {
        console.error("Failed to load portfolio data:", error);
        // Handle error state appropriately
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Add scroll listener to update active section
    const handleScroll = () => {
      // Use the actual section IDs present in the DOM
      const sectionIds = ["home", "about", "experience", "projects", "skills"];
      // Adjust scroll offset for better detection (e.g., 1/3 of viewport height)
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      let currentSectionId = "home"; // Default to home

      // Find the current section based on scroll position
      // Iterate through sections and find the lowest one whose top is above the scroll position
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element && scrollPosition >= element.offsetTop) {
          currentSectionId = id; // Update candidate for current section
        } else {
          // If the current scroll position is *before* this element's top,
          // the previous candidate was the correct one.
          break;
        }
      }

      // Handle edge case: If scrolled very close to the bottom, force the last section
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 50
      ) {
        // Small threshold
        currentSectionId = sectionIds[sectionIds.length - 1];
      }

      // Map 'home' section to 'about' for the tab navigation state
      const tabSection =
        currentSectionId === "home" ? "about" : currentSectionId;

      // Only update state if the section actually changed to prevent unnecessary re-renders
      // Using functional update for safety with state dependencies
      setActiveSection((prevSection) => {
        if (prevSection !== tabSection) {
          return tabSection;
        }
        return prevSection;
      });
    };

    window.addEventListener("scroll", handleScroll);
    // Call handleScroll once initially to set the correct section based on load position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Keep the empty dependency array, this effect should run once on mount

  useEffect(() => {
    if (activeSection) {
      event({
        action: "section_view",
        category: "engagement",
        label: `Section: ${activeSection}`,
      });
    }
  }, [activeSection]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="relative animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto">
            <div className="absolute inset-0 rounded-full border-t-2 border-primary/30 opacity-30"></div>
          </div>
          <p className="mt-6 text-muted-foreground animate-pulse">
            Loading portfolio...
          </p>
        </div>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-destructive">Failed to load portfolio data.</p>
      </div>
    );
  }

  const { personal, education, experience, projects, skills } = portfolioData;

  const sections = [
    { id: "about", label: "About", icon: <User className="h-5 w-5" /> },
    {
      id: "experience",
      label: "Experience",
      icon: <Briefcase className="h-5 w-5" />,
    },
    { id: "projects", label: "Projects", icon: <Code className="h-5 w-5" /> },
    { id: "skills", label: "Skills", icon: <LayoutGrid className="h-5 w-5" /> },
    {
      id: "education",
      label: "Education",
      icon: <GraduationCap className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <Header
        name={personal.name}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <HeroSection id="home" name={personal.name} title={personal.title} />

      <section className="pt-8 pb-16 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ContactCard
              location={personal.location}
              phone={personal.phone}
              email={personal.email}
            />
            <SummaryCard summary={personal.summary} />
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8" id="content-anchor">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="flex overflow-x-auto pb-2 mb-8 scrollbar-hide"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            role="tablist"
            aria-label="Portfolio sections"
          >
            <div className="flex space-x-2 mx-auto bg-card/80 backdrop-blur-sm p-1 rounded-full shadow-md border border-border">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight") {
                      const currentIndex = sections.findIndex(
                        (s) => s.id === activeSection
                      );
                      const nextIndex = (currentIndex + 1) % sections.length;
                      setActiveSection(sections[nextIndex].id);
                    } else if (e.key === "ArrowLeft") {
                      const currentIndex = sections.findIndex(
                        (s) => s.id === activeSection
                      );
                      const prevIndex =
                        (currentIndex - 1 + sections.length) % sections.length;
                      setActiveSection(sections[prevIndex].id);
                    }
                  }}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeSection === section.id
                      ? "bg-primary text-primary-foreground shadow-lg border-1 border-primary-foreground/90"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                  }`}
                  role="tab"
                  tabIndex={activeSection === section.id ? 0 : -1}
                  aria-selected={activeSection === section.id}
                  aria-controls={`${section.id}-panel`}
                  id={`${section.id}-tab`}
                >
                  <span className="mr-2" aria-hidden="true">
                    {section.icon}
                  </span>
                  {section.label}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="mb-16">
            {activeSection === "about" && (
              <div
                role="tabpanel"
                id="about-panel"
                aria-labelledby="about-tab"
                tabIndex={0}
              >
                <AboutSection id="about" education={education} />
              </div>
            )}

            {activeSection === "experience" && (
              <div
                role="tabpanel"
                id="experience-panel"
                aria-labelledby="experience-tab"
                tabIndex={0}
              >
                <ExperienceSection id="experience" experiences={experience} />
              </div>
            )}

            {activeSection === "projects" && (
              <div
                role="tabpanel"
                id="projects-panel"
                aria-labelledby="projects-tab"
                tabIndex={0}
              >
                <ProjectsSection id="projects" projects={projects} />
              </div>
            )}

            {activeSection === "skills" && (
              <div
                role="tabpanel"
                id="skills-panel"
                aria-labelledby="skills-tab"
                tabIndex={0}
              >
                <SkillsSection id="skills" skills={skills} />
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
}
