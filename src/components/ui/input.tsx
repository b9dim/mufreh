import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-xl bg-white px-4 py-3 text-sm font-medium text-[#1F2937] transition-all duration-300 font-arabic",
          "placeholder:text-[#9CA3AF] placeholder:font-normal",
          "border-2 border-[#E5E7EB]",
          "focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2F3A8F]/20 focus:shadow-soft focus:border-[#2F3A8F]",
          "hover:bg-[#F7F9FC] hover:border-[#D1D5DB] hover:shadow-sm",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F3F4F6] disabled:border-[#E5E7EB]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

