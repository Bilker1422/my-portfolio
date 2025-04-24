import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="p-3 rounded-full bg-black/20  text-primary-foreground shadow-lg hover:bg-primary/80 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
