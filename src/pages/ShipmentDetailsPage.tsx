import { ArrowRight, Package, MapPin, Truck, Calendar, CheckCircle2, Clock, ArrowLeft, FileText, CreditCard, User, Phone, Building2, Hash } from "lucide-react"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface ShipmentDetails {
  id: string
  trackingNumber: string
  senderName: string
  senderPhone: string
  senderCity: string
  senderDistrict: string
  senderAddress: string
  receiverName: string
  receiverPhone: string
  receiverCity: string
  receiverDistrict: string
  receiverAddress: string
  shipmentContent: string
  shipmentValue: string
  shipmentWeight: string
  carrier: string
  carrierId: string
  status: 'pending' | 'in_transit' | 'delivered'
  createdAt: string
  estimatedDelivery: string
  deliveredAt?: string
  price: number
}

interface ShipmentDetailsPageProps {
  shipment: ShipmentDetails
  onBack: () => void
}

const statusConfig = {
  pending: {
    label: 'قيد المعالجة',
    color: 'text-orange-600 bg-orange-50 border-orange-200',
    icon: Clock,
    description: 'جاري معالجة طلبك'
  },
  in_transit: {
    label: 'قيد التوصيل',
    color: 'text-blue-600 bg-blue-50 border-blue-200',
    icon: Truck,
    description: 'الشحنة في الطريق إليك'
  },
  delivered: {
    label: 'تم التسليم',
    color: 'text-green-600 bg-green-50 border-green-200',
    icon: CheckCircle2,
    description: 'تم تسليم الشحنة بنجاح'
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
}

export function ShipmentDetailsPage({ shipment, onBack }: ShipmentDetailsPageProps) {
  const status = statusConfig[shipment.status]
  const StatusIcon = status.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2F2F7] via-[#F5F5FA] to-[#F2F2F7] pb-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-2xl border-b border-gray-200/60 shadow-sm">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-xl"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-gray-900">تفاصيل الشحنة</h1>
            <p className="text-[10px] text-gray-500 -mt-0.5 font-medium">رقم التتبع: {shipment.trackingNumber}</p>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 mt-3 pb-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-3"
        >
          {/* Status Card */}
          <motion.div variants={itemVariants}>
            <Card className="p-4 bg-gradient-to-br from-white to-gray-50/30 border-gray-200/60 shadow-lg">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${status.color} border-2`}>
                    <StatusIcon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base mb-0.5">{status.label}</CardTitle>
                    <CardDescription className="text-xs">{status.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>تاريخ الإنشاء: {shipment.createdAt}</span>
                  </div>
                  {shipment.status === 'delivered' && shipment.deliveredAt && (
                    <div className="flex items-center gap-2 text-xs text-green-600 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>تم: {shipment.deliveredAt}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tracking Number */}
          <motion.div variants={itemVariants}>
            <Card className="p-4 bg-gradient-to-br from-blue-50/50 to-white border-blue-100/50 shadow-md">
              <CardContent className="p-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-blue-600" />
                    <span className="text-xs text-gray-600 font-medium">رقم التتبع</span>
                  </div>
                  <span className="font-mono text-sm font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-lg">
                    {shipment.trackingNumber}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sender Info */}
          <motion.div variants={itemVariants}>
            <Card className="p-4 bg-gradient-to-br from-white to-blue-50/20 border-blue-100/50 shadow-lg">
              <CardContent className="p-0 space-y-2.5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <Package className="w-4 h-4 text-white" />
                    </div>
                    <CardTitle className="text-sm">بيانات المرسل</CardTitle>
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2 bg-white/60 rounded-lg p-2">
                    <User className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-[10px] text-gray-500 mb-0.5">الاسم</p>
                      <p className="font-semibold text-gray-900">{shipment.senderName}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 bg-white/60 rounded-lg p-2">
                    <Phone className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-[10px] text-gray-500 mb-0.5">الجوال</p>
                      <p className="font-semibold text-gray-900">{shipment.senderPhone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 bg-white/60 rounded-lg p-2">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-[10px] text-gray-500 mb-0.5">المدينة والحي</p>
                      <p className="font-semibold text-gray-900">{shipment.senderCity}, {shipment.senderDistrict}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 bg-white/60 rounded-lg p-2">
                    <Building2 className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-[10px] text-gray-500 mb-0.5">العنوان الوطني</p>
                      <p className="font-semibold text-gray-900">{shipment.senderAddress}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Receiver Info */}
          <motion.div variants={itemVariants}>
            <Card className="p-4 bg-gradient-to-br from-white to-green-50/20 border-green-100/50 shadow-lg">
              <CardContent className="p-0 space-y-2.5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <CardTitle className="text-sm">بيانات المستلم</CardTitle>
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2 bg-white/60 rounded-lg p-2">
                    <User className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-[10px] text-gray-500 mb-0.5">الاسم</p>
                      <p className="font-semibold text-gray-900">{shipment.receiverName}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 bg-white/60 rounded-lg p-2">
                    <Phone className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-[10px] text-gray-500 mb-0.5">الجوال</p>
                      <p className="font-semibold text-gray-900">{shipment.receiverPhone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 bg-white/60 rounded-lg p-2">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-[10px] text-gray-500 mb-0.5">المدينة والحي</p>
                      <p className="font-semibold text-gray-900">{shipment.receiverCity}, {shipment.receiverDistrict}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 bg-white/60 rounded-lg p-2">
                    <Building2 className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-[10px] text-gray-500 mb-0.5">العنوان التفصيلي</p>
                      <p className="font-semibold text-gray-900">{shipment.receiverAddress}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Shipment Details */}
          <motion.div variants={itemVariants}>
            <Card className="p-4 bg-gradient-to-br from-white to-orange-50/20 border-orange-100/50 shadow-lg">
              <CardContent className="p-0 space-y-2.5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <CardTitle className="text-sm">معلومات الشحنة</CardTitle>
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2 bg-white/60 rounded-lg p-2">
                    <Package className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-[10px] text-gray-500 mb-0.5">المحتويات</p>
                      <p className="font-semibold text-gray-900">{shipment.shipmentContent}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white/60 rounded-lg p-2">
                      <p className="text-[10px] text-gray-500 mb-0.5">القيمة</p>
                      <p className="font-semibold text-gray-900">{shipment.shipmentValue} <span className="text-[10px] text-gray-500">ريال</span></p>
                    </div>
                    <div className="bg-white/60 rounded-lg p-2">
                      <p className="text-[10px] text-gray-500 mb-0.5">الوزن</p>
                      <p className="font-semibold text-gray-900">{shipment.shipmentWeight} <span className="text-[10px] text-gray-500">كجم</span></p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Carrier & Price */}
          <motion.div variants={itemVariants}>
            <Card className="p-4 bg-gradient-to-br from-white to-purple-50/20 border-purple-100/50 shadow-lg">
              <CardContent className="p-0 space-y-2.5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                      <Truck className="w-4 h-4 text-white" />
                    </div>
                    <CardTitle className="text-sm">شركة الشحن</CardTitle>
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="bg-white/60 rounded-lg p-2">
                    <p className="text-[10px] text-gray-500 mb-0.5">الناقل</p>
                    <p className="font-semibold text-gray-900">{shipment.carrier}</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-2">
                    <p className="text-[10px] text-gray-500 mb-0.5">التاريخ المتوقع للتسليم</p>
                    <p className="font-semibold text-gray-900">{shipment.estimatedDelivery}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Total Price */}
          <motion.div variants={itemVariants}>
            <Card className="p-4 bg-gradient-to-br from-green-50/50 to-white border-green-200/50 shadow-lg">
              <CardContent className="p-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-bold text-gray-900">المجموع الإجمالي</span>
                  </div>
                  <motion.span
                    key={shipment.price}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent"
                  >
                    {shipment.price.toFixed(2)} <small className="text-sm text-gray-500">SAR</small>
                  </motion.span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}

