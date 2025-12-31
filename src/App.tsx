import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { WelcomeScreen } from "@/components/WelcomeScreen"
import { NavigationBar } from "@/components/NavigationBar"
import { Step1Sender } from "@/components/steps/Step1Sender"
import { Step2Receiver } from "@/components/steps/Step2Receiver"
import { Step3Shipment } from "@/components/steps/Step3Shipment"
import { Step4Carrier } from "@/components/steps/Step4Carrier"
import { Step5Payment } from "@/components/steps/Step5Payment"
import { Step6Summary } from "@/components/steps/Step6Summary"
import { ShipmentsPage } from "@/pages/ShipmentsPage"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import type { ShippingFormData } from "@/types"

const TOTAL_STEPS = 6

const carrierPrices: Record<string, number> = {
  '16': 24.00,
  '24': 24.00,
  '7': 25.00,
  '2': 25.00
}

const initialFormData: ShippingFormData = {
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
  carrier: '',
  cardNumber: '4532 1234 5678 9010',
  cardExpiry: '12/25',
  cardCVV: '123',
}

type Page = 'create' | 'shipments'

function App() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [currentPage, setCurrentPage] = useState<Page>('create')
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<ShippingFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const updateFormData = (field: keyof ShippingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        const step1Fields = ['senderName', 'senderPhone', 'senderCity', 'senderDistrict', 'senderAddress']
        if (!step1Fields.every(field => formData[field as keyof ShippingFormData].trim())) {
          toast({
            variant: "destructive",
            title: "خطأ في التحقق",
            description: "يرجى إكمال جميع حقول بيانات المرسل",
          })
          return false
        }
        if (!/^05[0-9]{8}$/.test(formData.senderPhone)) {
          toast({
            variant: "destructive",
            title: "خطأ في التحقق",
            description: "يرجى إدخال رقم جوال صحيح (05xxxxxxxx)",
          })
          return false
        }
        return true

      case 2:
        const step2Fields = ['receiverName', 'receiverPhone', 'receiverCity', 'receiverDistrict', 'receiverAddress']
        if (!step2Fields.every(field => formData[field as keyof ShippingFormData].trim())) {
          toast({
            variant: "destructive",
            title: "خطأ في التحقق",
            description: "يرجى إكمال جميع حقول بيانات المستلم",
          })
          return false
        }
        if (!/^05[0-9]{8}$/.test(formData.receiverPhone)) {
          toast({
            variant: "destructive",
            title: "خطأ في التحقق",
            description: "يرجى إدخال رقم جوال صحيح (05xxxxxxxx)",
          })
          return false
        }
        return true

      case 3:
        if (!formData.shipmentContent.trim() || !formData.shipmentValue || !formData.shipmentWeight) {
          toast({
            variant: "destructive",
            title: "خطأ في التحقق",
            description: "يرجى إكمال جميع حقول محتويات الطرد",
          })
          return false
        }
        return true

      case 4:
        if (!formData.carrier) {
          toast({
            variant: "destructive",
            title: "خطأ في التحقق",
            description: "يرجى اختيار شركة الشحن",
          })
          return false
        }
        return true

      case 5:
        // Payment step validation moved to Step5Payment
        return true

      case 6:
        // Summary step - no validation needed
        return true

      default:
        return true
    }
  }

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      if (validateStep(currentStep)) {
        setCurrentStep((prev) => prev + 1)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePayment = async () => {
    // Validate payment fields
    if (!formData.cardNumber.trim() || !formData.cardExpiry.trim() || !formData.cardCVV.trim()) {
      toast({
        variant: "destructive",
        title: "خطأ في التحقق",
        description: "يرجى إكمال جميع حقول البطاقة",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        variant: "success",
        title: "تم بنجاح!",
        description: "تم إنشاء الشحنة بنجاح! سيتم توجيهك لصفحة الشحنات.",
      })

      // Navigate to shipments page after 2 seconds
      setTimeout(() => {
        setFormData(initialFormData)
        setCurrentStep(1)
        setCurrentPage('shipments')
      }, 2000)
    }, 2000)
  }

  const handleEditStep = (step: number) => {
    setCurrentStep(step)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const stepVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
  }

  if (currentPage === 'shipments') {
    return <ShipmentsPage onNavigateToCreate={() => setCurrentPage('create')} />
  }

  if (showWelcome) {
    return (
      <WelcomeScreen 
        onStart={() => {
          setShowWelcome(false)
          setCurrentStep(1)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      />
    )
  }

  const totalPrice = formData.carrier ? carrierPrices[formData.carrier] || 0 : 0

  const stepLabels = [
    'بيانات المرسل',
    'بيانات المستلم',
    'محتوى الشحنة',
    'شركة الشحن',
    'الملخص',
    'الدفع'
  ]

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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.2, 0.8, 0.2, 1]
      }
    }
  }

  return (
    <div className="min-h-screen pb-32 relative overflow-hidden">
      {/* Glassmorphism Background */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient layer - subtle gray */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8ECF1] via-[#F0F4F8] to-[#E8ECF1]" />
        
        {/* Very subtle color hints - no visible circles */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2F3A8F]/2 via-transparent to-[#4CC9F0]/2" />
        
        {/* Glass overlay effect - stronger blur */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/30 to-white/40 backdrop-blur-[3px]" />
        
        {/* Very subtle texture */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10"
      >
        {/* Header Section with Gradient Background */}
        <motion.div 
          variants={itemVariants}
          className="relative pt-12 pb-16 px-4 overflow-hidden"
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#2F3A8F] via-[#3A4BA5] to-[#4CC9F0]/20" />
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
          
          <div className="relative max-w-md mx-auto">
            {/* App Logo - Large and Prominent */}
            <motion.div 
              className="flex items-center justify-center mb-6"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="relative">
                <motion.div 
                  className="w-28 h-28 bg-white/25 backdrop-blur-xl rounded-3xl flex items-center justify-center shadow-soft-xl ring-4 ring-white/30 overflow-hidden p-4"
                  animate={{
                    boxShadow: [
                      '0 8px 24px rgba(47, 58, 143, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)',
                      '0 12px 32px rgba(47, 58, 143, 0.2), 0 6px 12px rgba(0, 0, 0, 0.15)',
                      '0 8px 24px rgba(47, 58, 143, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <img 
                    src="/logo.png" 
                    alt="شعار التطبيق" 
                    className="w-full h-full object-contain"
                  />
                </motion.div>
                <motion.div
                  className="absolute -top-2 -right-2 w-7 h-7 bg-[#4CC9F0] rounded-full flex items-center justify-center shadow-soft-xl ring-2 ring-white/50"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.15, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </motion.div>
                {/* Decorative circles */}
                <motion.div
                  className="absolute -bottom-1 -left-1 w-4 h-4 bg-[#4CC9F0]/40 rounded-full blur-sm"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute top-1/2 -left-2 w-3 h-3 bg-white/30 rounded-full blur-sm"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.4, 0.7, 0.4]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
              </div>
            </motion.div>

            {/* App Title */}
            <motion.div 
              className="text-center mb-2"
              variants={itemVariants}
            >
              <h1 className="text-2xl font-semibold text-white mb-2 font-arabic leading-tight">
                منصة الشحن المخفض
              </h1>
              <p className="text-sm text-white/90 font-arabic leading-relaxed px-4">
                منصة موثوقة لشحن الطرود بسهولة وأمان
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Progress Indicator - Labeled Steps */}
        <motion.div 
          variants={itemVariants}
          className="max-w-md mx-auto px-4 -mt-6 mb-6 relative z-20"
        >
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-5 shadow-soft-xl border border-white/60">
            {/* Progress Circles */}
            <div className="flex items-center justify-between gap-2 mb-4">
              {Array.from({ length: TOTAL_STEPS }).map((_, index) => {
                const stepNum = index + 1
                const isActive = stepNum === currentStep
                const isCompleted = stepNum < currentStep
                const isLast = stepNum === TOTAL_STEPS

                return (
                  <div key={stepNum} className="flex items-center gap-2 flex-1">
                    <motion.div
                      initial={false}
                      animate={{
                        scale: isActive ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                      className={cn(
                        "relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 flex-shrink-0",
                        isActive 
                          ? 'bg-[#2F3A8F] text-white shadow-soft-lg ring-4 ring-[#2F3A8F]/20' 
                          : isCompleted
                          ? 'bg-[#4CC9F0] text-white shadow-soft ring-2 ring-[#4CC9F0]/30'
                          : 'bg-[#F7F9FC] text-[#6B7280] border-2 border-[#E6EAF0]'
                      )}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5" strokeWidth={3} />
                      ) : (
                        <span>{stepNum}</span>
                      )}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-[#2F3A8F]"
                          animate={{ opacity: [0.3, 0.5, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </motion.div>
                    {!isLast && (
                      <div className="flex-1 h-1 bg-[#E6EAF0] rounded-full relative overflow-hidden">
                        {isCompleted && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-[#4CC9F0] to-[#4CC9F0] rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 0.5 }}
                          />
                        )}
                        {!isCompleted && isActive && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-[#2F3A8F] to-[#4CC9F0] rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: '50%' }}
                            transition={{ duration: 0.5 }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Step Labels */}
            <div className="flex items-center justify-between gap-2">
              {Array.from({ length: TOTAL_STEPS }).map((_, index) => {
                const stepNum = index + 1
                const isActive = stepNum === currentStep
                const isCompleted = stepNum < currentStep

                return (
                  <div key={stepNum} className="flex-1 text-center min-w-0">
                    <motion.div
                      initial={false}
                      animate={{
                        opacity: isActive || isCompleted ? 1 : 0.6,
                      }}
                      className={cn(
                        "font-arabic text-xs font-medium leading-tight px-1",
                        isActive 
                          ? 'text-[#2F3A8F] font-semibold' 
                          : isCompleted
                          ? 'text-[#4CC9F0]'
                          : 'text-[#6B7280]'
                      )}
                    >
                      {stepLabels[index]}
                    </motion.div>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

      <main className="max-w-md mx-auto px-4 pb-20 relative z-10">

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={stepVariants}
            transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="mb-6"
          >
            <div className="bg-white/90 backdrop-blur-xl rounded-[18px] border border-white/60 shadow-soft-xl overflow-hidden">
              {currentStep === 1 && (
                <Step1Sender
                  formData={{
                    senderName: formData.senderName,
                    senderPhone: formData.senderPhone,
                    senderCity: formData.senderCity,
                    senderDistrict: formData.senderDistrict,
                    senderAddress: formData.senderAddress,
                  }}
                  onChange={(field, value) => updateFormData(field as keyof ShippingFormData, value)}
                />
              )}

              {currentStep === 2 && (
                <Step2Receiver
                  formData={{
                    receiverName: formData.receiverName,
                    receiverPhone: formData.receiverPhone,
                    receiverCity: formData.receiverCity,
                    receiverDistrict: formData.receiverDistrict,
                    receiverAddress: formData.receiverAddress,
                  }}
                  onChange={(field, value) => updateFormData(field as keyof ShippingFormData, value)}
                />
              )}

              {currentStep === 3 && (
                <Step3Shipment
                  formData={{
                    shipmentContent: formData.shipmentContent,
                    shipmentValue: formData.shipmentValue,
                    shipmentWeight: formData.shipmentWeight,
                  }}
                  onChange={(field, value) => updateFormData(field as keyof ShippingFormData, value)}
                />
              )}

              {currentStep === 4 && (
                <Step4Carrier
                  selectedCarrier={formData.carrier}
                  onSelect={(carrierId) => updateFormData('carrier', carrierId)}
                />
              )}

              {currentStep === 5 && (
                <Step6Summary
                  formData={formData}
                  carrierId={formData.carrier}
                  totalPrice={totalPrice}
                  onEdit={handleEditStep}
                  onConfirm={() => setCurrentStep(6)}
                  isSubmitting={false}
                />
              )}

              {currentStep === 6 && (
                <Step5Payment
                  formData={{
                    cardNumber: formData.cardNumber,
                    cardExpiry: formData.cardExpiry,
                    cardCVV: formData.cardCVV,
                  }}
                  carrierId={formData.carrier}
                  onChange={(field, value) => updateFormData(field as keyof ShippingFormData, value)}
                  onSubmit={handlePayment}
                  isSubmitting={isSubmitting}
                />
              )}

              {/* Navigation Buttons - Attached to Form */}
              {currentStep < 5 && (
                <div className="px-6 pt-4 pb-6 border-t border-[#E6EAF0] bg-[#F7F9FC]">
                  <div className="flex gap-3">
                    {currentStep > 1 && (
                      <Button
                        variant="secondary"
                        className="flex-1 h-14 text-sm rounded-xl font-arabic"
                        onClick={prevStep}
                      >
                        <ArrowRight className="w-4 h-4 ml-2" />
                        السابق
                      </Button>
                    )}
                    <Button
                      variant="default"
                      className="flex-1 h-14 text-sm rounded-xl font-arabic"
                      onClick={nextStep}
                    >
                      التالي
                      <ArrowLeft className="w-4 h-4 mr-2" />
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="px-6 pt-4 pb-6 border-t border-[#E6EAF0] bg-[#F7F9FC]">
                  <Button
                    variant="secondary"
                    className="w-full h-14 text-sm rounded-xl font-arabic"
                    onClick={prevStep}
                  >
                    <ArrowRight className="w-4 h-4 ml-2" />
                    السابق
                  </Button>
                </div>
              )}

              {currentStep === 6 && (
                <div className="px-6 pt-4 pb-6 border-t border-[#E6EAF0] bg-[#F7F9FC]">
                  <Button
                    variant="secondary"
                    className="w-full h-14 text-sm rounded-xl font-arabic"
                    onClick={() => setCurrentStep(5)}
                  >
                    <ArrowRight className="w-4 h-4 ml-2" />
                    السابق
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
      </motion.div>

      <NavigationBar currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  )
}

export default App

