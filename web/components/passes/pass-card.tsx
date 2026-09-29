import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export interface PassFeature {
  text: string;
  included: boolean;
}

export interface PassCardProps {
  title: string;
  price: string;
  description: string;
  isPopular?: boolean;
  features: PassFeature[];
  eligibility: string;
  onSelect?: () => void;
}

export function PassCard({ 
  title, 
  price, 
  description, 
  isPopular, 
  features, 
  eligibility,
  onSelect 
}: PassCardProps) {
  return (
    <Card className={cn(
      "relative flex flex-col h-full group transition-all duration-300",
      "border-border bg-surface hover:border-primary hover:shadow-[0_0_30px_rgba(255,77,109,0.15)] hover:bg-surface-alt hover:z-10",
      isPopular && "z-10"
    )}>
      {isPopular && (
        <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg shadow-lg">
          RECOMMENDED
        </div>
      )}
      
      <CardHeader>
        <CardTitle className="text-2xl text-text-primary transition-colors group-hover:text-white">
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        <div className="mb-6 pb-6 border-b border-border">
          <span className="text-4xl font-bold text-white transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-primary/80">{price}</span>
          <span className="text-text-secondary text-sm ml-2">/ E-Cell</span>
        </div>
        
        <div className="mb-6 flex items-start gap-3 p-3 rounded-md bg-background border border-border/50 text-xs text-text-secondary">
          <Info className="w-4 h-4 text-primary shrink-0" />
          <p><span className="font-semibold text-text-primary">Eligibility:</span> {eligibility}</p>
        </div>
        
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-white mb-4">What's included</h4>
          <ul className="space-y-3">
            {features.map((feature, i) => (
              <li key={i} className={cn("flex items-start text-sm transition-colors", feature.included ? "text-text-secondary group-hover:text-white/80" : "text-text-secondary/50 opacity-50")}>
                <Check className={cn("w-4 h-4 mr-3 shrink-0 mt-0.5 transition-colors", feature.included ? "text-text-secondary group-hover:text-primary" : "text-text-secondary")} />
                {feature.text}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary hover:!scale-[1.02] active:!scale-[0.98] group-hover:shadow-lg group-hover:shadow-primary/25" 
          variant="outline"
          onClick={onSelect}
        >
          Select {title}
        </Button>
      </CardFooter>
    </Card>
  )
}
