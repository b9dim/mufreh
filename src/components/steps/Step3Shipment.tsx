import { PackageSearch, AlertCircle, DollarSign, Weight } from "lucide-react"
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

interface Step3ShipmentProps {
  formData: {
    shipmentContent: string
    shipmentValue: string
    shipmentWeight: string
  }
  onChange: (field: string, value: string) => void
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
}

export function Step3Shipment({ formData, onChange }: Step3ShipmentProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="p-6 pb-5">
        <motion.div className="flex items-center gap-3 mb-1" variants={itemVariants}>
          <div className="w-10 h-10 rounded-xl bg-[#2F3A8F] flex items-center justify-center flex-shrink-0 shadow-soft-lg ring-2 ring-[#2F3A8F]/20">
            <PackageSearch className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg font-medium text-[#1F2937] mb-0.5 font-arabic">
              محتويات الطرد
            </CardTitle>
            <CardDescription className="text-xs text-[#6B7280] font-arabic">
              ما هي محتويات الشحنة؟
            </CardDescription>
          </div>
        </motion.div>
      </div>

      <CardContent className="px-6 space-y-4">
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <PackageSearch className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] z-10 pointer-events-none" />
            <Input
              placeholder="ماذا تشحن؟ (مثل: ملابس، إلكترونيات)"
              value={formData.shipmentContent}
              onChange={(e) => onChange('shipmentContent', e.target.value)}
              className="pr-10 h-12 text-sm rounded-xl border-[#E6EAF0] focus:border-[#2F3A8F] focus:ring-2 focus:ring-[#2F3A8F]/20 transition-all font-arabic"
              required
            />
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 gap-3"
          >
            <div className="relative">
              <Input
                type="number"
                placeholder="القيمة"
                value={formData.shipmentValue}
                onChange={(e) => onChange('shipmentValue', e.target.value)}
                min="0"
                step="0.01"
                className="pr-16 h-12 text-sm rounded-xl border-[#E6EAF0] focus:border-[#2F3A8F] focus:ring-2 focus:ring-[#2F3A8F]/20 transition-all font-arabic"
                required
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
                <DollarSign className="w-3.5 h-3.5 text-[#6B7280]" />
                <span className="text-[10px] font-semibold text-[#2F3A8F] bg-[#2F3A8F]/10 px-2 py-0.5 rounded-md">
                  SAR
                </span>
              </div>
            </div>
            <div className="relative">
              <Input
                type="number"
                placeholder="الوزن"
                value={formData.shipmentWeight}
                onChange={(e) => onChange('shipmentWeight', e.target.value)}
                min="0.1"
                step="0.1"
                className="pr-16 h-12 text-sm rounded-xl border-[#E6EAF0] focus:border-[#2F3A8F] focus:ring-2 focus:ring-[#2F3A8F]/20 transition-all font-arabic"
                required
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
                <Weight className="w-3.5 h-3.5 text-[#6B7280]" />
                <span className="text-[10px] font-semibold text-[#4CC9F0] bg-[#4CC9F0]/10 px-2 py-0.5 rounded-md">
                  KG
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-xl p-3">
              <p className="text-xs text-[#6B7280] leading-relaxed flex items-start gap-2 font-arabic">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#4CC9F0]" />
                <span>يرجى إدخال الوزن الفعلي بدقة لتجنب رفض الشحنة من قبل الناقل.</span>
              </p>
            </div>
          </motion.div>
        </CardContent>
    </motion.div>
  )
}

