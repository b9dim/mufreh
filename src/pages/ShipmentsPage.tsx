import { Package, MapPin, Truck, Calendar, CheckCircle2, Clock, ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { NavigationBar } from "@/components/NavigationBar"
import { motion } from "framer-motion"
import { ShipmentDetailsPage } from "./ShipmentDetailsPage"
import { useState } from "react"

interface ShipmentsPageProps {
  onNavigateToCreate: () => void
}

interface Shipment {
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

const mockShipments: Shipment[] = [
  {
    id: '1',
    trackingNumber: 'SH123456789',
    senderName: 'أحمد محمد العلي',
    senderPhone: '0501234567',
    senderCity: 'الرياض',
    senderDistrict: 'العليا',
    senderAddress: 'AAAA1234',
    receiverName: 'فاطمة علي السالم',
    receiverPhone: '0509876543',
    receiverCity: 'جدة',
    receiverDistrict: 'البحيرة',
    receiverAddress: 'شارع الكورنيش، بجانب المطعم الإيطالي، مبنى رقم 45، شقة 302',
    shipmentContent: 'ملابس وإلكترونيات',
    shipmentValue: '500',
    shipmentWeight: '2.5',
    carrier: 'سمسا',
    carrierId: '7',
    status: 'delivered',
    createdAt: '2024-01-15',
    estimatedDelivery: '2024-01-18',
    deliveredAt: '2024-01-17',
    price: 25.00
  },
  {
    id: '2',
    trackingNumber: 'SH987654321',
    senderName: 'خالد أحمد السعيد',
    senderPhone: '0501112233',
    senderCity: 'الدمام',
    senderDistrict: 'الكورنيش',
    senderAddress: 'BBBB5678',
    receiverName: 'سارة محمد الحسن',
    receiverPhone: '0504445566',
    receiverCity: 'الرياض',
    receiverDistrict: 'النرجس',
    receiverAddress: 'طريق الملك فهد، مجمع الأندلس، مكتب 201',
    shipmentContent: 'كتب ومستلزمات مكتبية',
    shipmentValue: '300',
    shipmentWeight: '1.8',
    carrier: 'ارامكس',
    carrierId: '2',
    status: 'in_transit',
    createdAt: '2024-01-20',
    estimatedDelivery: '2024-01-23',
    price: 24.00
  },
  {
    id: '3',
    trackingNumber: 'SH456789123',
    senderName: 'محمد علي الخالدي',
    senderPhone: '0507778899',
    senderCity: 'الطائف',
    senderDistrict: 'الشفا',
    senderAddress: 'CCCC9012',
    receiverName: 'نورا خالد الفهد',
    receiverPhone: '0503334455',
    receiverCity: 'مكة المكرمة',
    receiverDistrict: 'العزيزية',
    receiverAddress: 'حي الزاهر، شارع العروبة، فيلا رقم 12',
    shipmentContent: 'أجهزة منزلية',
    shipmentValue: '1200',
    shipmentWeight: '5.2',
    carrier: 'سمسا -استلام من الفرع-',
    carrierId: '16',
    status: 'pending',
    createdAt: '2024-01-22',
    estimatedDelivery: '2024-01-25',
    price: 24.00
  }
]

const statusConfig = {
  pending: {
    label: 'قيد المعالجة',
    color: 'text-orange-600 bg-orange-50',
    icon: Clock,
    borderColor: 'border-orange-200'
  },
  in_transit: {
    label: 'قيد التوصيل',
    color: 'text-blue-600 bg-blue-50',
    icon: Truck,
    borderColor: 'border-blue-200'
  },
  delivered: {
    label: 'تم التسليم',
    color: 'text-green-600 bg-green-50',
    icon: CheckCircle2,
    borderColor: 'border-green-200'
  }
}

export function ShipmentsPage({ onNavigateToCreate }: ShipmentsPageProps) {
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null)

  if (selectedShipment) {
    return (
      <ShipmentDetailsPage
        shipment={selectedShipment}
        onBack={() => setSelectedShipment(null)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2F2F7] via-[#F5F5FA] to-[#F2F2F7] pb-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-2xl border-b border-gray-200/60 shadow-sm">
        <div className="max-w-md mx-auto px-5 sm:px-6 h-16 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onNavigateToCreate}
            className="rounded-2xl"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-gray-900">شحناتي</h1>
            <p className="text-xs text-gray-500 -mt-0.5">{mockShipments.length} شحنة</p>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 mt-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {mockShipments.map((shipment, index) => {
            const status = statusConfig[shipment.status]
            const StatusIcon = status.icon

            return (
              <motion.div
                key={shipment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-5 bg-gradient-to-br from-white to-gray-50/30 border-gray-200/60 shadow-lg hover:shadow-xl transition-all">
                  <CardContent className="p-0 space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Package className="w-5 h-5 text-blue-600" />
                          <span className="font-mono text-sm font-bold text-gray-900">
                            {shipment.trackingNumber}
                          </span>
                        </div>
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold ${status.color}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {status.label}
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="text-2xl font-bold text-gray-900">
                          {shipment.price.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500">ريال</p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-500 mb-0.5">من</p>
                            <p className="font-semibold text-gray-900">{shipment.senderName}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-500 mb-0.5">إلى</p>
                            <p className="font-semibold text-gray-900">{shipment.receiverName}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <Truck className="w-3.5 h-3.5" />
                          <span>{shipment.carrier}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{shipment.estimatedDelivery}</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-8 px-3"
                        onClick={() => setSelectedShipment(shipment)}
                      >
                        التفاصيل
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Empty State (if no shipments) */}
        {mockShipments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <Package className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد شحنات</h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              ابدأ بإنشاء شحنة جديدة
            </p>
            <Button onClick={onNavigateToCreate}>
              إنشاء شحنة جديدة
            </Button>
          </motion.div>
        )}
      </main>

      <NavigationBar currentPage="shipments" onPageChange={(page) => {
        if (page === 'create') {
          onNavigateToCreate()
        }
      }} />
    </div>
  )
}

