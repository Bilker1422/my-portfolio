"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Mail,
  MapPin,
  Phone,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Define props type
interface ContactCardProps {
  location: string;
  phone: string;
  email: string;
}

export default function ContactCard({
  location,
  phone,
  email,
}: ContactCardProps) {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const contactItems = [
    {
      icon: <MapPin className="text-primary" />,
      label: "Location",
      value: location,
      copyValue: location,
      action: "copy",
    },
    {
      icon: <Phone className="text-primary" />,
      label: "Phone",
      value: phone,
      copyValue: phone.replace(/\s/g, ""),
      action: "copy",
      href: `tel:${phone.replace(/\s/g, "")}`,
    },
    {
      icon: <Mail className="text-primary" />,
      label: "Email",
      value: email,
      copyValue: email,
      action: "copy",
      href: `mailto:${email}`,
    },
    {
      icon: <Github className="text-primary" />,
      label: "Github",
      value: "github.com/Bilker1422",
      copyValue: "https://github.com/Bilker1422",
      action: "copy",
      href: "https://github.com/Bilker1422",
      external: true,
    },
  ];

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(label);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="md:col-span-1"
    >
      <Card className="bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
        <div className="absolute -right-16 -top-16 w-48 h-48 bg-gradient-to-br from-primary/10 via-primary/10 to-tertiary/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-48 h-48 bg-gradient-to-tr from-accent/10 to-primary/5 rounded-full blur-3xl"></div>

        <CardContent className="pt-6 relative z-10">
          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl font-bold mb-6 text-card-foreground flex items-center"
          >
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Contact Information
            </span>
          </motion.h3>

          <div className="space-y-5">
            {contactItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 + 0.2, duration: 0.5 }}
                className="group"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-4 p-3 rounded-xl bg-card/40 backdrop-blur-sm border border-transparent hover:border-primary transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center shadow-md">
                    {item.icon}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground font-medium">
                      {item.label}
                    </p>
                    <p className="font-medium text-card-foreground">
                      {item.value}
                    </p>
                  </div>

                  {item.action === "copy" && (
                    <motion.button
                      className="w-8 h-8 rounded-full flex items-center justify-center bg-muted/50 hover:bg-accent/50 transition-colors text-muted-foreground hover:text-accent-foreground"
                      onClick={() => handleCopy(item.copyValue, item.label)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Copy ${item.label}`}
                      title={`Copy ${item.label}`}
                    >
                      {copiedItem === item.label ? (
                        <Check size={16} className="text-primary" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </motion.button>
                  )}

                  {item.href && item.external && (
                    <motion.a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full flex items-center justify-center bg-muted/50 hover:bg-accent/50 transition-colors text-muted-foreground hover:text-accent-foreground"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Visit ${item.label}`}
                      title={`Visit ${item.label}`}
                    >
                      <ExternalLink size={16} />
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 pt-6 border-t border-border"
          >
            <h4 className="text-sm font-medium text-muted-foreground mb-4 text-center">
              Connect with me
            </h4>
            <div className="flex justify-center space-x-3">
              <motion.a
                href="https://github.com/Bilker1422"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 rounded-full bg-gradient-to-br from-muted to-card flex items-center justify-center shadow-lg border border-border hover:border-primary transition-all duration-300"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github
                  size={18}
                  className="text-foreground group-hover:text-primary transition-colors"
                />
              </motion.a>
              <motion.a
                href={`mailto:${email}`}
                className="group w-10 h-10 rounded-full bg-gradient-to-br from-muted to-card flex items-center justify-center shadow-lg border border-border hover:border-primary transition-all duration-300"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail
                  size={18}
                  className="text-foreground group-hover:text-primary transition-colors"
                />
              </motion.a>
              <motion.a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="group w-10 h-10 rounded-full bg-gradient-to-br from-muted to-card flex items-center justify-center shadow-lg border border-border hover:border-primary transition-all duration-300"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Phone
                  size={18}
                  className="text-foreground group-hover:text-primary transition-colors"
                />
              </motion.a>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
