import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-base font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F3A8F] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] font-arabic",
  {
    variants: {
      variant: {
        default: "bg-[#2F3A8F] text-white shadow-soft-lg hover:bg-[#252F7A] hover:shadow-soft-xl active:shadow-soft",
        secondary: "bg-white text-[#2F3A8F] border-2 border-[#E5E7EB] shadow-soft hover:bg-[#F7F9FC] hover:border-[#2F3A8F]/30",
        success: "bg-[#4CC9F0] text-white shadow-soft-lg hover:bg-[#3AB8DF] hover:shadow-soft-xl",
        destructive: "bg-[#EF4444] text-white shadow-soft-lg hover:bg-[#DC2626] hover:shadow-soft-xl",
        outline: "border-2 border-[#E5E7EB] bg-white text-[#1F2937] shadow-soft hover:bg-[#F7F9FC] hover:border-[#2F3A8F]/30",
        ghost: "hover:bg-[#F7F9FC] text-[#1F2937]",
      },
      size: {
        default: "h-14 px-6",
        sm: "h-10 px-4 text-sm",
        lg: "h-16 px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

