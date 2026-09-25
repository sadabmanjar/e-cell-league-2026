"use client"
import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { IconButton } from "./icon-button"

export function BackToTop({ className }: { className?: string }) {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className={cn("fixed bottom-8 right-8 z-50", className)}
        >
          <IconButton
            variant="default"
            size="lg"
            className="rounded-full shadow-lg shadow-primary/20"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </IconButton>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
