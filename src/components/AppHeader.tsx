import { Bell, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b-2 border-[#E5E7EB] shadow-soft">
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="relative">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-soft-lg ring-2 ring-[#2F3A8F]/20 overflow-hidden">
              <img 
                src="/logo.png" 
                alt="شعار التطبيق" 
                className="w-full h-full object-contain p-1.5"
              />
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[#4CC9F0] rounded-full border-2 border-white shadow-soft">
              <motion.div
                className="absolute inset-0 bg-[#4CC9F0] rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>
          <div>
            <h1 className="text-base font-bold text-[#1F2937] tracking-tight flex items-center gap-1.5 font-arabic">
              الشحن المخفض
              <Sparkles className="w-4 h-4 text-[#4CC9F0]" />
            </h1>
            <p className="text-xs text-[#6B7280] -mt-0.5 font-medium font-arabic">منصة الشحن الموثوقة</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="relative p-2.5 bg-[#F7F9FC] hover:bg-[#E5E7EB] rounded-xl text-[#1F2937] transition-all group active:scale-95"
          >
            <Bell className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:rotate-12" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#EF4444] rounded-full border-2 border-white shadow-soft">
              <motion.span
                className="absolute inset-0 bg-[#EF4444] rounded-full"
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </span>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#EF4444] rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-soft opacity-0 group-hover:opacity-100 transition-all duration-300">
              3
            </span>
          </Button>
        </motion.div>
      </div>
    </header>
  )
}

