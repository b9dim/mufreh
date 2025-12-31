import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { TrendingUp } from "lucide-react"

interface StepProgressProps {
  currentStep: number
  totalSteps: number
}

export function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
  const percentage = (currentStep / totalSteps) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="mb-4 p-4 bg-white rounded-[18px] border border-[#E6EAF0] shadow-soft-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 font-arabic">
            <span className="text-[#6B7280] text-xs font-medium">الخطوة</span>
            <motion.span
              key={currentStep}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-white text-sm font-semibold bg-[#2F3A8F] px-3 py-1.5 rounded-xl shadow-soft-lg ring-2 ring-[#2F3A8F]/20"
            >
              {currentStep}
            </motion.span>
            <span className="text-[#6B7280] text-xs font-medium">من</span>
            <span className="text-[#1F2937] text-xs font-semibold">{totalSteps}</span>
          </div>
          <motion.div
            key={percentage}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1.5 bg-[#F7F9FC] px-3 py-1.5 rounded-xl shadow-sm border border-[#E6EAF0]"
          >
            <TrendingUp className="w-3.5 h-3.5 text-[#2F3A8F]" />
            <span className="text-[#1F2937] text-xs font-semibold">{Math.round(percentage)}%</span>
          </motion.div>
        </div>
        <div className="relative">
          <Progress value={percentage} className="h-2.5 rounded-full" />
        </div>
      </Card>
    </motion.div>
  )
}

