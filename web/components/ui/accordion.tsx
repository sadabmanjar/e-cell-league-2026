"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

export interface AccordionProps {
  items: { title: string; content: React.ReactNode; value: string }[];
  className?: string;
  type?: "single" | "multiple";
}

export function Accordion({ items, className, type = "single" }: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<string[]>([])

  const toggleItem = (value: string) => {
    if (type === "single") {
      setOpenItems(openItems.includes(value) ? [] : [value]);
    } else {
      setOpenItems(openItems.includes(value) 
        ? openItems.filter(i => i !== value) 
        : [...openItems, value]);
    }
  }

  return (
    <div className={cn("w-full space-y-2", className)}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.value);
        return (
          <div key={item.value} className="border border-border rounded-lg bg-surface overflow-hidden">
            <button
              onClick={() => toggleItem(item.value)}
              className="flex w-full items-center justify-between px-4 py-4 text-left font-medium transition-colors hover:bg-surface-alt focus-ring"
            >
              <span>{item.title}</span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-5 w-5 text-text-secondary" />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="px-4 pb-4 pt-1 text-sm text-text-secondary">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
