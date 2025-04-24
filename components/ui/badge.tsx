import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive transition-[color,box-shadow,background-color,border-color] overflow-hidden", // Added background-color, border-color to transition
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground dark:bg-primary/80 dark:text-primary-foreground", // Slightly less intense bg in dark
        secondary:
          "border-transparent bg-secondary text-secondary-foreground dark:bg-secondary/70 dark:text-secondary-foreground [a&]:hover:bg-secondary/90 dark:[a&]:hover:bg-secondary/80", // Slightly less intense bg in dark
        destructive:
          "border-transparent bg-destructive text-destructive-foreground dark:bg-destructive/90 dark:text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20",
        outline:
          "text-foreground border-border dark:border-border/70 [a&]:hover:bg-accent [a&]:hover:text-accent-foreground dark:[a&]:hover:bg-accent/80", // Slightly more visible border in dark
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
