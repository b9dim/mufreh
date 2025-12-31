import { Shield, Check, ArrowLeft, Zap, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface WelcomeScreenProps {
  onStart: () => void
}

const features = [
  {
    icon: Zap,
    title: 'شحن سريع',
    description: 'توصيل في أسرع وقت ممكن'
  },
  {
    icon: Shield,
    title: 'آمن ومضمون',
    description: 'حماية كاملة لشحناتك'
  },
  {
    icon: Truck,
    title: 'أسعار مخفضة',
    description: 'أفضل الأسعار في السوق'
  }
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

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen pb-32 relative overflow-hidden">
      {/* Glassmorphism Background */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8ECF1] via-[#F0F4F8] to-[#E8ECF1]" />
        
        {/* Very subtle color hints - no visible circles */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2F3A8F]/2 via-transparent to-[#4CC9F0]/2" />
        
        {/* Glass overlay effect - stronger blur */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/30 to-white/40 backdrop-blur-[3px]" />
        
        {/* Very subtle texture */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM68 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px'
          }}
        />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10"
      >
        {/* Header Section with Gradient Background - Same as App.tsx */}
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
            {/* App Logo - Same style as App.tsx */}
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
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
              </div>
            </motion.div>

            {/* App Title */}
            <motion.div 
              className="text-center mb-3"
              variants={itemVariants}
            >
              <h1 className="text-2xl font-semibold text-white mb-2 font-arabic leading-tight">
                مرحباً بك في
                <br />
                منصة الشحن المخفض
              </h1>
              <p className="text-sm text-white/90 font-arabic leading-relaxed px-4">
                منصة موثوقة لشحن الطرود بسهولة وأمان
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Features Section - Same card style as App.tsx */}
        <motion.div 
          variants={itemVariants}
          className="max-w-md mx-auto px-4 -mt-6 mb-6 relative z-20"
        >
          <div className="bg-white/90 backdrop-blur-xl rounded-[18px] border border-white/60 shadow-soft-xl overflow-hidden">
            <div className="p-6 pb-5">
              <h2 className="text-lg font-semibold text-[#1F2937] mb-4 text-center font-arabic">
                لماذا تختارنا؟
              </h2>
            </div>
            
            <div className="px-6 pb-6 space-y-3">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/40 shadow-soft hover:shadow-soft-lg transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#2F3A8F] flex items-center justify-center flex-shrink-0 shadow-soft">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-right flex-1">
                        <h3 className="font-bold text-[#1F2937] text-xs mb-0.5 font-arabic">{feature.title}</h3>
                        <p className="text-[10px] text-[#6B7280] font-arabic">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Primary CTA Button */}
        <motion.div 
          variants={itemVariants}
          className="max-w-md mx-auto px-4 pb-8"
        >
          <Button
            onClick={onStart}
            className="w-full h-14 text-base font-semibold bg-[#2F3A8F] hover:bg-[#252F7A] text-white shadow-soft-lg hover:shadow-soft-xl transition-all duration-300 rounded-xl font-arabic"
          >
            ابدأ الآن
            <ArrowLeft className="w-5 h-5 mr-2" />
          </Button>
          <motion.p 
            className="text-xs text-[#6B7280] text-center mt-3 font-arabic flex items-center justify-center gap-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Shield className="w-3.5 h-3.5 text-[#4CC9F0]" />
            خطوات بسيطة لشحن طردك بسهولة
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  )
}
