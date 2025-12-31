import { PlusCircle, Box, LayoutGrid, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

type Page = 'create' | 'shipments'

interface NavigationBarProps {
  currentPage?: Page
  onPageChange?: (page: Page) => void
}

export function NavigationBar({ currentPage = 'create', onPageChange }: NavigationBarProps) {
  const tabs = [
    { id: 'create' as Page, icon: PlusCircle, label: 'شحنة جديدة', color: 'blue' },
    { id: 'shipments' as Page, icon: Box, label: 'شحناتي', color: 'purple' },
    { id: 'services' as Page, icon: LayoutGrid, label: 'الخدمات', color: 'green' },
    { id: 'settings' as Page, icon: Settings, label: 'الإعدادات', color: 'gray' },
  ]

  const handleTabClick = (tabId: Page) => {
    if (onPageChange && (tabId === 'create' || tabId === 'shipments')) {
      onPageChange(tabId)
    }
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/98 backdrop-blur-xl border-t-2 border-[#E5E7EB] pb-safe pt-3 px-6 z-[60] shadow-soft-lg">
      <div className="max-w-md mx-auto flex justify-between items-center relative">
        {tabs.map((tab, index) => {
          const Icon = tab.icon
          const isActive = currentPage === tab.id
          return (
            <motion.button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={cn(
                "flex flex-col items-center gap-1.5 group relative transition-all flex-1 font-arabic",
                isActive ? "text-[#2F3A8F]" : "text-[#6B7280]"
              )}
            >
              <div className="relative">
                <motion.div
                  className={cn(
                    "p-3 rounded-xl transition-all duration-300 relative",
                    isActive
                      ? "bg-[#2F3A8F]/10"
                      : "group-hover:bg-[#F7F9FC]"
                  )}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className={cn(
                    "w-6 h-6 relative z-10 transition-all duration-300",
                    isActive && "text-[#2F3A8F]"
                  )} />
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-[#2F3A8F]/10"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.div>
                {isActive && (
                  <motion.div
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#2F3A8F] rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                )}
              </div>
              <motion.span
                className={cn(
                  "text-[10px] font-semibold transition-colors",
                  isActive ? "text-[#2F3A8F]" : "text-[#6B7280] group-hover:text-[#1F2937]"
                )}
                animate={{ fontWeight: isActive ? 700 : 500 }}
              >
                {tab.label}
              </motion.span>
            </motion.button>
          )
        })}
      </div>
    </nav>
  )
}

