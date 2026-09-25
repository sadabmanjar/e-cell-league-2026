import * as React from "react"
import { cn } from "@/lib/utils"

export function Container({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8", className)} {...props}>
      {children}
    </div>
  )
}

export function Section({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("py-12 md:py-16 lg:py-20", className)} {...props}>
      {children}
    </section>
  )
}
