/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // HSL-based color tokens using CSS variables for dynamic theming
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: "hsl(var(--surface))",
        "surface-foreground": "hsl(var(--surface-foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        tertiary: "hsl(var(--tertiary))",
        "tertiary-foreground": "hsl(var(--tertiary-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        subtle: "hsl(var(--subtle))",
        "subtle-foreground": "hsl(var(--subtle-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
      },
      fontFamily: {
        sans: ["var(--font-family-sans)"],
        heading: ["var(--font-family-heading)"],
      },
      borderRadius: {
        lg: "var(--radius-lg, 0.5rem)",
        md: "var(--radius-md, 0.375rem)",
        sm: "var(--radius-sm, 0.25rem)",
      },
      boxShadow: {
        glass: "0 4px 6px var(--glass-shadow)",
      },
      backdropBlur: {
        glass: "8px",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  // Reduce unused CSS by disabling certain variants
  variants: {
    extend: {
      opacity: ["disabled"],
      backgroundColor: ["disabled", "hover", "focus"],
      textColor: ["disabled", "hover", "focus"],
    },
  },
  plugins: [],
  // Reduce unused CSS by explicitly setting safelist
  safelist: [
    "bg-primary",
    "bg-secondary",
    "bg-accent",
    "bg-tertiary",
    "text-primary",
    "text-secondary",
    "text-accent",
    "text-tertiary",
  ],
};
