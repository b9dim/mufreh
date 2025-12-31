import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface StepIndicatorsProps {
  currentStep: number
  totalSteps: number
}

export function StepIndicators({ currentStep, totalSteps }: StepIndicatorsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="flex items-center justify-between mb-6 px-1"
    >
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNum = index + 1
        const isActive = stepNum === currentStep
        const isCompleted = stepNum < currentStep
        const isLast = stepNum === totalSteps

        return (
          <div key={stepNum} className="flex items-center gap-2 flex-1">
            <motion.div
              initial={false}
              animate={{
                scale: isActive ? 1.05 : 1,
              }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              className={cn(
                "step-indicator min-w-[40px] h-10 rounded-xl flex items-center justify-center text-sm font-semibold flex-shrink-0 transition-all duration-300 relative px-3",
                isActive && "bg-[#2F3A8F] text-white shadow-soft-lg ring-2 ring-[#2F3A8F]/20",
                isCompleted && "bg-[#4CC9F0] text-white shadow-soft ring-1 ring-[#4CC9F0]/30",
                !isActive && !isCompleted && "bg-white text-[#1F2937] border-2 border-[#E6EAF0] shadow-soft"
              )}
            >
              {isCompleted ? (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.3, type: "spring" }}
                >
                  <Check className="w-5 h-5" strokeWidth={3} />
                </motion.div>
              ) : (
                <span className="relative z-10 font-medium">{stepNum}</span>
              )}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-xl bg-[#2F3A8F]"
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
            {!isLast && (
              <div className="flex-1 h-1 bg-[#E6EAF0] rounded-full overflow-hidden relative">
                <motion.div
                  className={cn(
                    "h-full rounded-full absolute top-0 left-0",
                    isCompleted ? "bg-gradient-to-r from-[#4CC9F0] to-[#4CC9F0]" : isActive ? "bg-gradient-to-r from-[#2F3A8F] to-[#4CC9F0]" : "bg-transparent"
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: isCompleted ? "100%" : isActive ? "50%" : "0%" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            )}
          </div>
        )
      })}
    </motion.div>
  )
}

