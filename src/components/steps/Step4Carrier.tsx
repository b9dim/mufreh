import { Truck, Clock, MapPin, Package } from "lucide-react"
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface Step4CarrierProps {
  selectedCarrier: string
  onSelect: (carrierId: string) => void
}

interface Carrier {
  id: string
  name: string
  logoType: 'smsa' | 'aramex'
  deliveryOptions: {
    pickup: { id: string; price: number; label: string }
    delivery: { id: string; price: number; label: string }
  }
  deliveryTime: string
}

const carriers: Carrier[] = [
  {
    id: 'smsa',
    name: 'سمسا',
    logoType: 'smsa',
    deliveryOptions: {
      pickup: { id: '16', price: 24.00, label: 'استلام من الفرع' },
      delivery: { id: '7', price: 25.00, label: 'توصيل للمنزل' }
    },
    deliveryTime: '١-٣ أيام عمل'
  },
  {
    id: 'aramex',
    name: 'ارامكس',
    logoType: 'aramex',
    deliveryOptions: {
      pickup: { id: '24', price: 24.00, label: 'استلام من الفرع' },
      delivery: { id: '2', price: 25.00, label: 'توصيل للمنزل' }
    },
    deliveryTime: '١-٣ أيام عمل'
  }
]

export function Step4Carrier({ selectedCarrier, onSelect }: Step4CarrierProps) {
  const handleCarrierSelect = (carrierId: string, deliveryType: 'pickup' | 'delivery') => {
    const carrier = carriers.find(c => c.id === carrierId)
    if (carrier) {
      const optionId = deliveryType === 'pickup' ? carrier.deliveryOptions.pickup.id : carrier.deliveryOptions.delivery.id
      onSelect(optionId)
    }
  }

  const handleDeliveryTypeChange = (carrierId: string, deliveryType: 'pickup' | 'delivery') => {
    handleCarrierSelect(carrierId, deliveryType)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-6 pb-5">
        <motion.div 
          className="flex items-center gap-3 mb-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="w-10 h-10 rounded-xl bg-[#2F3A8F] flex items-center justify-center flex-shrink-0 shadow-soft-lg ring-2 ring-[#2F3A8F]/20">
            <Truck className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg font-medium text-[#1F2937] mb-0.5 font-arabic">
              اختر شركة الشحن
            </CardTitle>
            <CardDescription className="text-xs text-[#6B7280] font-arabic">
              اختر الناقل وطريقة الاستلام
            </CardDescription>
          </div>
        </motion.div>
      </div>

      <CardContent className="px-6">
        <div className="space-y-4">
          {carriers.map((carrier) => {
            // Check if this carrier is selected
            const isCarrierSelected = selectedCarrier === carrier.deliveryOptions.pickup.id || 
                                     selectedCarrier === carrier.deliveryOptions.delivery.id
            
            // Determine which delivery type is selected
            const selectedDeliveryType = selectedCarrier === carrier.deliveryOptions.pickup.id ? 'pickup' :
                                        selectedCarrier === carrier.deliveryOptions.delivery.id ? 'delivery' : null
            
            const currentPrice = selectedDeliveryType === 'pickup' ? carrier.deliveryOptions.pickup.price :
                                selectedDeliveryType === 'delivery' ? carrier.deliveryOptions.delivery.price :
                                carrier.deliveryOptions.pickup.price

            return (
              <motion.div
                key={carrier.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: carriers.indexOf(carrier) * 0.1 }}
                className={cn(
                  "rounded-xl p-4 border-2 transition-all duration-300 bg-white/90 backdrop-blur-xl",
                  isCarrierSelected
                    ? "border-[#2F3A8F] bg-[#2F3A8F]/10 backdrop-blur-xl shadow-soft-lg ring-2 ring-[#2F3A8F]/20"
                    : "border-white/60 hover:border-[#2F3A8F]/30 hover:bg-white/95"
                )}
              >
                {/* Logo Container */}
                <div className={cn(
                  "w-full mb-4 flex items-center justify-center rounded-lg p-4 transition-all duration-300 min-h-[60px]",
                  isCarrierSelected 
                    ? "bg-white shadow-soft border-2 border-[#2F3A8F]/10" 
                    : "bg-[#F7F9FC] border border-[#E6EAF0]"
                )}>
                  {carrier.logoType === 'smsa' ? (
                    <div className="flex flex-col items-center justify-center w-full">
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-2xl font-bold text-[#6B21A8]">SMS</span>
                        <span className="text-2xl font-bold text-[#F97316] relative">
                          A
                          <span className="absolute -top-1 right-0 text-[10px]">®</span>
                        </span>
                      </div>
                      <span className="text-xs font-medium text-[#6B21A8]">Express</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full">
                      <span className="text-2xl font-bold text-[#DC2626] tracking-wide mb-0.5">aramex</span>
                      <span className="text-[10px] font-light text-[#1F2937] tracking-wider">delivery unlimited</span>
                    </div>
                  )}
                </div>

                {/* Delivery Type Selection */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <button
                    onClick={() => handleDeliveryTypeChange(carrier.id, 'pickup')}
                    className={cn(
                      "p-3 rounded-lg border-2 transition-all duration-300 text-right font-arabic",
                      selectedDeliveryType === 'pickup'
                        ? "border-[#2F3A8F] bg-[#2F3A8F]/10 backdrop-blur-xl shadow-soft"
                        : "border-white/60 bg-white/80 backdrop-blur-sm hover:border-[#2F3A8F]/30 hover:bg-white/95"
                    )}
                  >
                    <div className="flex items-center justify-end gap-2 mb-1">
                      <MapPin className={cn(
                        "w-4 h-4",
                        selectedDeliveryType === 'pickup' ? "text-[#2F3A8F]" : "text-[#6B7280]"
                      )} />
                      <span className={cn(
                        "text-xs font-semibold",
                        selectedDeliveryType === 'pickup' ? "text-[#2F3A8F]" : "text-[#1F2937]"
                      )}>
                        {carrier.deliveryOptions.pickup.label}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-[#1F2937]">
                      {carrier.deliveryOptions.pickup.price.toFixed(2)} <span className="text-xs text-[#6B7280]">ريال</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleDeliveryTypeChange(carrier.id, 'delivery')}
                    className={cn(
                      "p-3 rounded-lg border-2 transition-all duration-300 text-right font-arabic",
                      selectedDeliveryType === 'delivery'
                        ? "border-[#2F3A8F] bg-[#2F3A8F]/10 backdrop-blur-xl shadow-soft"
                        : "border-white/60 bg-white/80 backdrop-blur-sm hover:border-[#2F3A8F]/30 hover:bg-white/95"
                    )}
                  >
                    <div className="flex items-center justify-end gap-2 mb-1">
                      <Package className={cn(
                        "w-4 h-4",
                        selectedDeliveryType === 'delivery' ? "text-[#2F3A8F]" : "text-[#6B7280]"
                      )} />
                      <span className={cn(
                        "text-xs font-semibold",
                        selectedDeliveryType === 'delivery' ? "text-[#2F3A8F]" : "text-[#1F2937]"
                      )}>
                        {carrier.deliveryOptions.delivery.label}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-[#1F2937]">
                      {carrier.deliveryOptions.delivery.price.toFixed(2)} <span className="text-xs text-[#6B7280]">ريال</span>
                    </div>
                  </button>
                </div>

                {/* Selected Price and Time */}
                {isCarrierSelected && (
                  <div className="pt-3 border-t border-white/40">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-[#1F2937] font-arabic">المجموع</span>
                      <span className="text-xl font-bold text-[#2F3A8F] font-arabic">
                        {currentPrice.toFixed(2)} <span className="text-sm text-[#6B7280]">ريال</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 text-xs text-[#6B7280] font-arabic">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{carrier.deliveryTime}</span>
                    </div>
                  </div>
                )}

                {/* Selection Indicator */}
                {isCarrierSelected && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2F3A8F] to-[#4CC9F0] rounded-b-xl" />
                )}
              </motion.div>
            )
          })}
        </div>
        
        {!selectedCarrier && (
          <div className="mt-4 text-center">
              <span className="text-[#6B7280] text-xs font-medium inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/60 font-arabic">
              <span>⚠️</span>
              <span>يرجى اختيار شركة الشحن وطريقة الاستلام</span>
            </span>
          </div>
        )}
      </CardContent>
    </motion.div>
  )
}

