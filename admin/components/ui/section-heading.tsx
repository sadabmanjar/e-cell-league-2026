import * as React from "react"
import { cn } from "@/lib/utils"

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
}

export function SectionHeading({ title, description, align = "left", className, ...props }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col space-y-2 mb-8", {
      "items-start text-left": align === "left",
      "items-center text-center": align === "center",
      "items-end text-right": align === "right",
    }, className)} {...props}>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">{title}</h2>
      {description && <p className="text-lg text-text-secondary max-w-[800px]">{description}</p>}
    </div>
  )
}
