"use client"
import * as React from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { 
  registrationSchema, 
  RegistrationFormData
} from "@/lib/validations/registration"
import { useRouter } from "next/navigation"
import { StepIndicator } from "./step-indicator"
import { EcellDetails } from "./ecell-details"
import { CoordinatorDetails } from "./coordinator-details"
import { ParticipantForm } from "./participant-form"
import { PassSelector } from "./pass-selector"
import { CompetitionSelector } from "./competition-selector"
import { RegistrationSummary } from "./registration-summary"
import { PaymentSummary } from "./payment-summary"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { fetchClient } from "@/lib/api/client"

const STEPS = [
  "E-Cell Details",
  "Coordinator",
  "Team Details",
  "League Pass",
  "Competitions",
  "Review",
  "Payment"
]

export function RegistrationForm() {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [successData, setSuccessData] = React.useState<any>(null)
  const router = useRouter()

  const methods = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
    defaultValues: {
      participants: [{ name: "", email: "", phone: "", collegeId: "" }],
      selectedTracks: []
    }
  })

  const { trigger, getValues } = methods

  const processNextStep = async () => {
    let isStepValid = false;

    switch(currentStep) {
      case 0:
        isStepValid = await trigger(["collegeName", "ecellName", "city", "officialEmail", "contactNumber", "socialLinks"])
        break;
      case 1:
        isStepValid = await trigger(["coordinatorName", "coordinatorEmail", "coordinatorPhone", "designation"])
        break;
      case 2:
        isStepValid = await trigger(["participants"])
        break;
      case 3:
        isStepValid = await trigger(["passType"])
        break;
      case 4:
        isStepValid = await trigger(["selectedTracks"])
        break;
      case 5:
        // Review step, always valid to proceed to payment
        isStepValid = true;
        break;
      default:
        isStepValid = false;
    }

    if (isStepValid) {
      setCurrentStep(prev => prev + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const processPreviousStep = () => {
    setCurrentStep(prev => prev - 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const onSubmit = async (data: RegistrationFormData) => {
    // This is step 6 (Payment step)
    setIsSubmitting(true)
    
    try {
      const res = await fetchClient<any>("/registrations/onboard", {
        method: "POST",
        body: JSON.stringify(data)
      })
      setSuccessData({
        registrationId: res.registrationId,
        passType: data.passType,
        utr: data.utr,
        ecellName: data.ecellName
      })
      setIsSuccess(true)
    } catch (err: any) {
      alert(err.message || "Failed to register. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess && successData) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mb-6 border border-yellow-500/30">
          <CheckCircle className="w-10 h-10 text-yellow-500" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Registration Submitted</h2>
        <p className="text-yellow-500 font-medium mb-6">Payment Pending Verification</p>
        
        <div className="bg-surface-alt border border-border rounded-xl p-6 w-full max-w-md text-left mb-8">
          <div className="space-y-3">
            <div className="flex justify-between border-b border-border/50 pb-2">
              <span className="text-text-secondary text-sm">Registration ID</span>
              <span className="text-white font-mono text-sm">{successData.registrationId}</span>
            </div>
            <div className="flex justify-between border-b border-border/50 pb-2">
              <span className="text-text-secondary text-sm">E-Cell</span>
              <span className="text-white text-sm font-medium">{successData.ecellName}</span>
            </div>
            <div className="flex justify-between border-b border-border/50 pb-2">
              <span className="text-text-secondary text-sm">Pass</span>
              <span className="text-white text-sm">{successData.passType === "3-pass" ? "3-Track Pass" : "5-Track Pass"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary text-sm">UTR</span>
              <span className="text-white font-mono text-sm">{successData.utr}</span>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-text-secondary max-w-md mx-auto mb-8">
          Your E-Cell has been successfully registered for the E-Cell League 2026. A confirmation email will be sent to the coordinator once the payment UTR is verified by our team.
        </p>
        <Button onClick={() => router.push("/")}>Return to Home</Button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto w-full">
      <StepIndicator currentStep={currentStep} totalSteps={STEPS.length} steps={STEPS} />
      
      <div className="mt-12 bg-surface-alt border border-border rounded-2xl p-6 md:p-8">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 0 && <EcellDetails />}
                {currentStep === 1 && <CoordinatorDetails />}
                {currentStep === 2 && <ParticipantForm />}
                {currentStep === 3 && <PassSelector />}
                {currentStep === 4 && <CompetitionSelector />}
                {currentStep === 5 && <RegistrationSummary />}
                {currentStep === 6 && <PaymentSummary />}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between pt-6 border-t border-border mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={processPreviousStep}
                disabled={currentStep === 0 || isSubmitting}
                className={currentStep === 0 ? "invisible" : ""}
              >
                Back
              </Button>
              
              {currentStep < STEPS.length - 1 ? (
                <Button type="button" onClick={processNextStep}>
                  Continue
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Pay Now"}
                </Button>
              )}
            </div>

          </form>
        </FormProvider>
      </div>
    </div>
  )
}
