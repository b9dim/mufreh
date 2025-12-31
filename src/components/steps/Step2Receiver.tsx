import { MapPinned, User, Phone, Building2, MapPin } from "lucide-react"
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

interface Step2ReceiverProps {
  formData: {
    receiverName: string
    receiverPhone: string
    receiverCity: string
    receiverDistrict: string
    receiverAddress: string
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

export function Step2Receiver({ formData, onChange }: Step2ReceiverProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="p-6 pb-5">
        <motion.div className="flex items-center gap-3 mb-1" variants={itemVariants}>
          <div className="w-10 h-10 rounded-xl bg-[#4CC9F0] flex items-center justify-center flex-shrink-0 shadow-soft-lg ring-2 ring-[#4CC9F0]/20">
            <MapPinned className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg font-medium text-[#1F2937] mb-0.5 font-arabic">
              بيانات المستلم
            </CardTitle>
            <CardDescription className="text-xs text-[#6B7280] font-arabic">
              إلى من سنقوم بتوصيلها؟
            </CardDescription>
          </div>
        </motion.div>
      </div>

      <CardContent className="px-6 space-y-4">
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] z-10 pointer-events-none" />
            <Input
              placeholder="اسم المستلم"
              value={formData.receiverName}
              onChange={(e) => onChange('receiverName', e.target.value)}
              className="pr-10 h-12 text-sm rounded-xl border-[#E6EAF0] focus:border-[#4CC9F0] focus:ring-2 focus:ring-[#4CC9F0]/20 transition-all font-arabic"
              required
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] z-10 pointer-events-none" />
            <Input
              type="tel"
              placeholder="جوال المستلم (05xxxxxxxx)"
              pattern="05[0-9]{8}"
              value={formData.receiverPhone}
              onChange={(e) => onChange('receiverPhone', e.target.value)}
              className="pr-10 h-12 text-sm rounded-xl border-[#E6EAF0] focus:border-[#4CC9F0] focus:ring-2 focus:ring-[#4CC9F0]/20 transition-all font-arabic"
              required
            />
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 gap-3"
          >
            <div className="relative">
              <Building2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] z-10 pointer-events-none" />
              <Input
                placeholder="المدينة"
                value={formData.receiverCity}
                onChange={(e) => onChange('receiverCity', e.target.value)}
                className="pr-10 h-12 text-sm rounded-xl border-[#E6EAF0] focus:border-[#4CC9F0] focus:ring-2 focus:ring-[#4CC9F0]/20 transition-all font-arabic"
                required
              />
            </div>
            <div className="relative">
              <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] z-10 pointer-events-none" />
              <Input
                placeholder="الحي"
                value={formData.receiverDistrict}
                onChange={(e) => onChange('receiverDistrict', e.target.value)}
                className="pr-10 h-12 text-sm rounded-xl border-[#E6EAF0] focus:border-[#4CC9F0] focus:ring-2 focus:ring-[#4CC9F0]/20 transition-all font-arabic"
                required
              />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <MapPinned className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] z-10 pointer-events-none" />
            <Input
              placeholder="العنوان التفصيلي"
              value={formData.receiverAddress}
              onChange={(e) => onChange('receiverAddress', e.target.value)}
              className="pr-10 h-12 text-sm rounded-xl border-[#E6EAF0] focus:border-[#4CC9F0] focus:ring-2 focus:ring-[#4CC9F0]/20 transition-all font-arabic"
              required
            />
          </motion.div>
        </CardContent>
    </motion.div>
  )
}

