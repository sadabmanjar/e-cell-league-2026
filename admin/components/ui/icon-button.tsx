"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"

export interface IconButtonProps extends HTMLMotionProps<"button"> {
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant = "ghost", size = "default", ...props }, ref) => {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md transition-colors focus-ring disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-primary text-white hover:bg-primary-hover": variant === "default",
            "bg-secondary text-white hover:bg-secondary-hover": variant === "secondary",
            "border border-border bg-transparent hover:bg-surface-alt text-white": variant === "outline",
            "hover:bg-surface-alt text-text-secondary hover:text-white": variant === "ghost",
            "h-10 w-10": size === "default",
            "h-8 w-8": size === "sm",
            "h-12 w-12": size === "lg",
          },
          className
        )}
        {...props}
      />
    )
  }
)
IconButton.displayName = "IconButton"
