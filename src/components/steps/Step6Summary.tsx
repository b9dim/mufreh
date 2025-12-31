import { CheckCircle2, Package, MapPinned, Truck, CreditCard, FileText } from "lucide-react"
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import type { ShippingFormData } from "@/types"

interface Step6SummaryProps {
  formData: ShippingFormData
  carrierId: string
  totalPrice: number
  onEdit: (step: number) => void
  onConfirm: () => void
  isSubmitting: boolean
}

const carrierNames: Record<string, string> = {
  '16': 'سمسا - استلام من الفرع',
  '24': 'ارامكس - استلام من الفرع',
  '7': 'سمسا - توصيل للمنزل',
  '2': 'ارامكس - توصيل للمنزل'
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

export function Step6Summary({ formData, carrierId, totalPrice, onEdit, onConfirm, isSubmitting }: Step6SummaryProps) {
  const carrierName = carrierId ? carrierNames[carrierId] || 'غير محدد' : 'غير محدد'

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="p-6 pb-5">
        <motion.div className="flex items-center gap-3 mb-1" variants={itemVariants}>
          <div className="w-10 h-10 rounded-xl bg-[#2F3A8F] flex items-center justify-center flex-shrink-0 shadow-soft-lg ring-2 ring-[#2F3A8F]/20">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg font-medium text-[#1F2937] mb-0.5 font-arabic">
              ملخص الطلب
            </CardTitle>
            <CardDescription className="text-xs text-[#6B7280] font-arabic">
              راجع معلوماتك قبل التأكيد
            </CardDescription>
          </div>
        </motion.div>
      </div>

      <CardContent className="px-6 space-y-4">
          {/* Sender Info */}
          <motion.div variants={itemVariants}>
            <div className="bg-[#2F3A8F]/5 rounded-xl p-4 border border-[#2F3A8F]/10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#2F3A8F]" />
                  <h3 className="font-semibold text-[#1F2937] text-sm font-arabic">بيانات المرسل</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(1)}
                  className="text-xs h-7 px-2 text-[#2F3A8F] hover:bg-[#2F3A8F]/10"
                >
                  تعديل
                </Button>
              </div>
              <div className="space-y-1.5 text-sm text-[#1F2937] font-arabic">
                <p><span className="font-semibold text-[#6B7280]">الاسم:</span> {formData.senderName}</p>
                <p><span className="font-semibold text-[#6B7280]">الجوال:</span> {formData.senderPhone}</p>
                <p><span className="font-semibold text-[#6B7280]">العنوان:</span> {formData.senderCity}, {formData.senderDistrict}</p>
                <p><span className="font-semibold text-[#6B7280]">العنوان الوطني:</span> {formData.senderAddress}</p>
              </div>
            </div>
          </motion.div>

          {/* Receiver Info */}
          <motion.div variants={itemVariants}>
            <div className="bg-[#4CC9F0]/5 rounded-xl p-4 border border-[#4CC9F0]/10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPinned className="w-4 h-4 text-[#4CC9F0]" />
                  <h3 className="font-semibold text-[#1F2937] text-sm font-arabic">بيانات المستلم</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(2)}
                  className="text-xs h-7 px-2 text-[#4CC9F0] hover:bg-[#4CC9F0]/10"
                >
                  تعديل
                </Button>
              </div>
              <div className="space-y-1.5 text-sm text-[#1F2937] font-arabic">
                <p><span className="font-semibold text-[#6B7280]">الاسم:</span> {formData.receiverName}</p>
                <p><span className="font-semibold text-[#6B7280]">الجوال:</span> {formData.receiverPhone}</p>
                <p><span className="font-semibold text-[#6B7280]">العنوان:</span> {formData.receiverCity}, {formData.receiverDistrict}</p>
                <p><span className="font-semibold text-[#6B7280]">العنوان التفصيلي:</span> {formData.receiverAddress}</p>
              </div>
            </div>
          </motion.div>

          {/* Shipment Info */}
          <motion.div variants={itemVariants}>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#2F3A8F]" />
                  <h3 className="font-semibold text-[#1F2937] text-sm font-arabic">معلومات الشحنة</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(3)}
                  className="text-xs h-7 px-2 text-[#2F3A8F] hover:bg-[#2F3A8F]/10"
                >
                  تعديل
                </Button>
              </div>
              <div className="space-y-1.5 text-sm text-[#1F2937] font-arabic">
                <p><span className="font-semibold text-[#6B7280]">المحتويات:</span> {formData.shipmentContent}</p>
                <p><span className="font-semibold text-[#6B7280]">القيمة:</span> {formData.shipmentValue} ريال</p>
                <p><span className="font-semibold text-[#6B7280]">الوزن:</span> {formData.shipmentWeight} كجم</p>
              </div>
            </div>
          </motion.div>

          {/* Carrier Info */}
          <motion.div variants={itemVariants}>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/60">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#2F3A8F]" />
                  <h3 className="font-semibold text-[#1F2937] text-sm font-arabic">شركة الشحن</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(4)}
                  className="text-xs h-7 px-2 text-[#2F3A8F] hover:bg-[#2F3A8F]/10"
                >
                  تعديل
                </Button>
              </div>
              <p className="text-sm text-[#1F2937] font-arabic">
                <span className="font-semibold text-[#6B7280]">الناقل:</span> {carrierName}
              </p>
            </div>
          </motion.div>

          {/* Total Price */}
          <motion.div
            variants={itemVariants}
            className="pt-4 border-t border-white/40 bg-white/80 backdrop-blur-sm -mx-6 px-6 py-4 rounded-b-[18px]"
          >
            <div className="flex items-center justify-between">
              <span className="text-[#1F2937] font-semibold text-sm flex items-center gap-1.5 font-arabic">
                <CreditCard className="w-4 h-4 text-[#4CC9F0]" />
                المجموع الإجمالي
              </span>
              <motion.span
                key={totalPrice}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-2xl font-bold text-[#2F3A8F] font-arabic"
              >
                {totalPrice.toFixed(2)} <small className="text-sm text-[#6B7280]">SAR</small>
              </motion.span>
            </div>
          </motion.div>

          {/* Confirm Button */}
          <motion.div variants={itemVariants}>
            <Button
              type="button"
              variant="default"
              className="w-full h-14 text-base font-semibold shadow-soft-lg hover:shadow-soft-xl rounded-xl font-arabic"
              onClick={onConfirm}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                  <span className="mr-2">جاري المعالجة...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 ml-2" />
                  <span>تأكيد الطلب والدفع</span>
                </>
              )}
            </Button>
          </motion.div>
        </CardContent>
    </motion.div>
  )
}

