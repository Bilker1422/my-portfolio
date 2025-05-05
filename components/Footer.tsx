"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { useExternalLinkTracking } from "@/lib/useExternalLinkTracking";
import portfolioData from "@/data/portfolio.json"; // Import portfolio data

const { personal } = portfolioData;

export default function Footer({
  setActiveSection,
}: {
  setActiveSection?: (section: string) => void;
}) {
  const currentYear = new Date().getFullYear();
  const trackExternalLink = useExternalLinkTracking();

  // Helper function to handle navigation
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && setActiveSection) {
      e.preventDefault();
      const sectionId = href.replace("#", "");

      // Only set section if it exists (no defaults)
      if (sectionId) {
        setActiveSection(sectionId);

        // Only scroll if the element exists
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    }
  };

  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      href: personal.githubUrl, // Use imported data
      label: "Github",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: personal.linkedinUrl, // Use imported data
      label: "LinkedIn",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      href: `mailto:${personal.email}`, // Use imported data
      label: "Email",
    },
  ];

  const footerLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="relative pt-16 pb-8 bg-gradient-to-b from-transparent to-muted overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[1px] bg-gradient-to-r from-transparent via-border/30 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <a href="#" className="inline-block text-xl font-bold mb-4">
                  <span className="text-primary">&lt;</span>
                  {personal.name} {/* Use imported data */}
                  <span className="text-primary">/&gt;</span>
                </a>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Building modern applications with a focus on performance,
                  accessibility, and user experience.
                </p>
                <div className="flex space-x-3">
                  {socialLinks.map((link, i) => (
                    <motion.a
                      key={i}
                      href={link.href}
                      onClick={() =>
                        trackExternalLink("social", link.label.toLowerCase())
                      }
                      className="w-9 h-9 rounded-full flex items-center justify-center border border-border text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors"
                      aria-label={link.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-4"
              >
                <div>
                  <h3 className="text-sm font-semibold text-card-foreground mb-3">
                    Navigation
                  </h3>
                  <ul className="space-y-2">
                    {footerLinks.map((link, i) => (
                      <li key={i}>
                        <a
                          href={link.href}
                          onClick={(e) => {
                            if (link.href.startsWith("#")) {
                              trackExternalLink(
                                "navigation",
                                link.name.toLowerCase()
                              );
                              handleNavClick(e, link.href);
                            }
                          }}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-card-foreground mb-3">
                    Services
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        onClick={() =>
                          trackExternalLink("services", "web-development")
                        }
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        Web Development
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        onClick={() =>
                          trackExternalLink("services", "mobile-apps")
                        }
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        Mobile Apps
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        onClick={() =>
                          trackExternalLink("services", "ui-ux-design")
                        }
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        UI/UX Design
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        onClick={() =>
                          trackExternalLink("services", "consulting")
                        }
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        Consulting
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-card-foreground mb-3">
                    Contact
                  </h3>
                  <ul className="space-y-2">
                    <li className="text-sm text-muted-foreground">
                      {personal.location} {/* Use imported data */}
                    </li>
                    <li className="text-sm text-muted-foreground">
                      {personal.email} {/* Use imported data */}
                    </li>
                    <li className="text-sm text-muted-foreground">
                      {personal.phone} {/* Use imported data */}
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="border-t border-border pt-8 text-center"
          >
            <p className="text-sm text-muted-foreground">
              © {currentYear} {personal.name}. All rights reserved.{" "}
              {/* Use imported data */}
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
