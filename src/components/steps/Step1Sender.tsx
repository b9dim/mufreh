import { User, MapPin, Phone, Building2 } from "lucide-react"
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

interface Step1SenderProps {
  formData: {
    senderName: string
    senderPhone: string
    senderCity: string
    senderDistrict: string
    senderAddress: string
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

export function Step1Sender({ formData, onChange }: Step1SenderProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="p-6 pb-5">
        <motion.div className="flex items-center gap-3 mb-1" variants={itemVariants}>
          <div className="w-10 h-10 rounded-xl bg-[#2F3A8F] flex items-center justify-center flex-shrink-0 shadow-soft-lg ring-2 ring-[#2F3A8F]/20">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg font-medium text-[#1F2937] mb-0.5 font-arabic">
              بيانات المرسل
            </CardTitle>
            <CardDescription className="text-xs text-[#6B7280] font-arabic">
              أين يتواجد الطرد الآن؟
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
              placeholder="الاسم الكامل"
              value={formData.senderName}
              onChange={(e) => onChange('senderName', e.target.value)}
              className="pr-10 h-12 text-sm rounded-xl border-[#E6EAF0] focus:border-[#2F3A8F] focus:ring-2 focus:ring-[#2F3A8F]/20 transition-all font-arabic"
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
              placeholder="رقم الجوال (05xxxxxxxx)"
              pattern="05[0-9]{8}"
              value={formData.senderPhone}
              onChange={(e) => onChange('senderPhone', e.target.value)}
              className="pr-10 h-12 text-sm rounded-xl border-[#E6EAF0] focus:border-[#2F3A8F] focus:ring-2 focus:ring-[#2F3A8F]/20 transition-all font-arabic"
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
                value={formData.senderCity}
                onChange={(e) => onChange('senderCity', e.target.value)}
                className="pr-10 h-12 text-sm rounded-xl border-[#E6EAF0] focus:border-[#2F3A8F] focus:ring-2 focus:ring-[#2F3A8F]/20 transition-all font-arabic"
                required
              />
            </div>
            <div className="relative">
              <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] z-10 pointer-events-none" />
              <Input
                placeholder="الحي"
                value={formData.senderDistrict}
                onChange={(e) => onChange('senderDistrict', e.target.value)}
                className="pr-10 h-12 text-sm rounded-xl border-[#E6EAF0] focus:border-[#2F3A8F] focus:ring-2 focus:ring-[#2F3A8F]/20 transition-all font-arabic"
                required
              />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
          >
            <Input
              placeholder="العنوان الوطني (مثال: AAAA1234)"
              value={formData.senderAddress}
              onChange={(e) => onChange('senderAddress', e.target.value.toUpperCase())}
              className="h-12 text-sm rounded-xl border-[#E6EAF0] focus:border-[#2F3A8F] focus:ring-2 focus:ring-[#2F3A8F]/20 transition-all uppercase font-mono"
              required
            />
          </motion.div>
        </CardContent>
    </motion.div>
  )
}

