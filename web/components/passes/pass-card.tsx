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
      "relative flex flex-col h-full transition-all duration-300",
      isPopular ? "border-primary shadow-[0_0_30px_rgba(255,77,109,0.15)] bg-surface-alt scale-105 z-10" : "border-border bg-surface hover:border-border-hover"
    )}>
      {isPopular && (
        <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
          RECOMMENDED
        </div>
      )}
      
      <CardHeader>
        <CardTitle className={cn("text-2xl", isPopular ? "text-white" : "text-text-primary")}>
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        <div className="mb-6 pb-6 border-b border-border">
          <span className="text-4xl font-bold text-white">{price}</span>
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
              <li key={i} className={cn("flex items-start text-sm", feature.included ? "text-text-secondary" : "text-text-secondary/50 opacity-50")}>
                <Check className={cn("w-4 h-4 mr-3 shrink-0 mt-0.5", feature.included ? "text-primary" : "text-text-secondary")} />
                {feature.text}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full" 
          variant={isPopular ? "default" : "outline"}
          onClick={onSelect}
        >
          Select {title}
        </Button>
      </CardFooter>
    </Card>
  )
}
