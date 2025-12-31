import { CreditCard, Send, Lock, Calendar, Shield } from "lucide-react"
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface Step5PaymentProps {
  formData: {
    cardNumber: string
    cardExpiry: string
    cardCVV: string
  }
  carrierId: string
  onChange: (field: string, value: string) => void
  onSubmit: () => void
  isSubmitting: boolean
}

const carrierPrices: Record<string, number> = {
  '16': 24.00,
  '24': 24.00,
  '7': 25.00,
  '2': 25.00
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

export function Step5Payment({ formData, carrierId, onChange, onSubmit, isSubmitting }: Step5PaymentProps) {
  const totalPrice = carrierId ? carrierPrices[carrierId] || 0 : 0

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s/g, '')
    const matches = v.match(/.{1,4}/g)
    return matches ? matches.join(' ') : v
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\D/g, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="p-6 pb-5">
        <motion.div className="flex items-center gap-3 mb-1" variants={itemVariants}>
          <div className="w-10 h-10 rounded-xl bg-[#2F3A8F] flex items-center justify-center flex-shrink-0 shadow-soft-lg ring-2 ring-[#2F3A8F]/20">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg font-medium text-[#1F2937] mb-0.5 font-arabic flex items-center gap-1.5">
              الدفع الآمن
              <Shield className="w-4 h-4 text-[#4CC9F0]" />
            </CardTitle>
            <CardDescription className="text-xs text-[#6B7280] font-arabic">
              أكمل عملية الدفع
            </CardDescription>
          </div>
        </motion.div>
      </div>

      <CardContent className="px-6 space-y-4">
          <motion.div variants={itemVariants}>
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 bg-[#1F2937] text-white hover:bg-[#111827] border-0 shadow-soft-lg text-sm rounded-xl font-arabic"
            >
              <span className="text-xl">🍎</span>
              <span className="mr-2 font-semibold">Pay</span>
            </Button>
          </motion.div>

          <motion.div className="flex items-center gap-2" variants={itemVariants}>
            <hr className="flex-1 border-[#E6EAF0]" />
            <span className="text-[#6B7280] text-[10px] font-semibold uppercase font-arabic">أو بالبطاقة</span>
            <hr className="flex-1 border-[#E6EAF0]" />
          </motion.div>

          <motion.div className="space-y-4" variants={itemVariants}>
            <div className="relative">
              <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] z-10 pointer-events-none" />
              <Input
                placeholder="رقم البطاقة"
                value={formData.cardNumber}
                onChange={(e) => onChange('cardNumber', formatCardNumber(e.target.value))}
                maxLength={19}
                className="pr-10 h-12 font-mono text-sm rounded-xl border-[#E6EAF0] focus:border-[#2F3A8F] focus:ring-2 focus:ring-[#2F3A8F]/20 transition-all"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] z-10 pointer-events-none" />
                <Input
                  placeholder="MM/YY"
                  value={formData.cardExpiry}
                  onChange={(e) => onChange('cardExpiry', formatExpiry(e.target.value))}
                  maxLength={5}
                  className="pr-10 h-12 font-mono text-sm rounded-xl border-[#E6EAF0] focus:border-[#2F3A8F] focus:ring-2 focus:ring-[#2F3A8F]/20 transition-all"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] z-10 pointer-events-none" />
                <Input
                  placeholder="CVV"
                  value={formData.cardCVV}
                  onChange={(e) => onChange('cardCVV', e.target.value.replace(/\D/g, '').slice(0, 4))}
                  maxLength={4}
                  className="pr-10 h-12 font-mono text-sm rounded-xl border-[#E6EAF0] focus:border-[#2F3A8F] focus:ring-2 focus:ring-[#2F3A8F]/20 transition-all"
                  required
                />
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="pt-4 border-t border-white/40 flex items-center justify-between bg-white/80 backdrop-blur-sm -mx-6 px-6 py-4 rounded-b-[18px]"
            variants={itemVariants}
          >
            <span className="text-[#1F2937] font-semibold text-sm flex items-center gap-1.5 font-arabic">
              <span>المجموع الإجمالي</span>
            </span>
            <motion.span
              key={totalPrice}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold text-[#2F3A8F] font-arabic"
            >
              {totalPrice.toFixed(2)} <small className="text-sm text-[#6B7280]">SAR</small>
            </motion.span>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button
              type="button"
              variant="default"
              className="w-full h-14 text-base font-semibold shadow-soft-lg hover:shadow-soft-xl rounded-xl font-arabic"
              onClick={onSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                  <span className="mr-2">جاري المعالجة...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 ml-2" />
                  <span>تأكيد ودفع</span>
                </>
              )}
            </Button>
          </motion.div>
        </CardContent>
    </motion.div>
  )
}

