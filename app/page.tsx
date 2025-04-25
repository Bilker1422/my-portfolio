"use client";

import { useState, useEffect, useRef } from "react"; // Import useRef
import { motion } from "framer-motion";
import { Briefcase, Code, LayoutGrid, User } from "lucide-react";
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

// Helper function to scroll to a section
const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    // Calculate offset considering potential fixed header height
    const headerOffset = 80; // Adjust this value based on your actual header height
    const elementPosition = section.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

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
  const [userHasClicked, setUserHasClicked] = useState(false); // Add state for user click tracking
  const userHasClickedRef = useRef(userHasClicked); // Use ref to access latest value in scroll handler

  // Keep the ref updated with the latest state value
  useEffect(() => {
    userHasClickedRef.current = userHasClicked;
  }, [userHasClicked]);

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
      // If user has recently clicked a nav item, don't update section based on scroll
      if (userHasClickedRef.current) {
        return;
      }

      const sectionIds = ["home", "about", "experience", "projects", "skills"];
      // Use a fixed offset from the top of the viewport for detection
      const scrollPosition = window.scrollY + 100; // Adjust offset as needed

      let currentSectionId = "home"; // Default to home

      // Iterate backwards to find the current section
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element && scrollPosition >= element.offsetTop) {
          currentSectionId = id;
          break; // Found the current section
        }
      }

      // Map 'home' section to 'about' for the tab navigation state
      const tabSection =
        currentSectionId === "home" ? "about" : currentSectionId;

      // Only update state if the section actually changed
      setActiveSection((prevSection) => {
        if (prevSection !== tabSection) {
          return tabSection;
        }
        return prevSection;
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <Header
        name={personal.name}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        setUserHasClicked={setUserHasClicked} // Pass the setter function
      />

      <HeroSection
        id="home"
        name={personal.name}
        title={personal.title}
        setActiveSection={setActiveSection} // Pass setActiveSection to HeroSection
      />

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
                  onClick={() => {
                    setActiveSection(section.id);
                    scrollToSection(section.id); // Add this line
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight") {
                      const currentIndex = sections.findIndex(
                        (s) => s.id === activeSection
                      );
                      const nextIndex = (currentIndex + 1) % sections.length;
                      setActiveSection(sections[nextIndex].id);
                      scrollToSection(sections[nextIndex].id); // Add scroll on keydown
                    } else if (e.key === "ArrowLeft") {
                      const currentIndex = sections.findIndex(
                        (s) => s.id === activeSection
                      );
                      const prevIndex =
                        (currentIndex - 1 + sections.length) % sections.length;
                      setActiveSection(sections[prevIndex].id);
                      scrollToSection(sections[prevIndex].id); // Add scroll on keydown
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
            {/* Conditionally render the active section */}
            {activeSection === "about" && (
              <div role="tabpanel" id="about-panel" aria-labelledby="about-tab">
                <AboutSection id="about" education={education} />
              </div>
            )}
            {activeSection === "experience" && (
              <div
                role="tabpanel"
                id="experience-panel"
                aria-labelledby="experience-tab"
              >
                <ExperienceSection id="experience" experiences={experience} />
              </div>
            )}
            {activeSection === "projects" && (
              <div
                role="tabpanel"
                id="projects-panel"
                aria-labelledby="projects-tab"
              >
                <ProjectsSection id="projects" projects={projects} />
              </div>
            )}
            {activeSection === "skills" && (
              <div
                role="tabpanel"
                id="skills-panel"
                aria-labelledby="skills-tab"
              >
                <SkillsSection id="skills" skills={skills} />
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer setActiveSection={setActiveSection} />
      <BackToTop />
    </div>
  );
}
