import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 min-w-[2.75rem] items-center justify-center gap-2 whitespace-nowrap rounded-lg px-5 py-3 text-base font-semibold transition-[box-shadow,transform,background-color,color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/30 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.99] sm:text-sm [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#2563EB] text-white shadow-sm hover:bg-[#1D4ED8] hover:shadow",
        secondary:
          "border border-slate-200 bg-white text-slate-800 shadow-sm hover:bg-slate-50",
        outline:
          "border-2 border-[#2563EB] bg-transparent text-[#2563EB] hover:bg-slate-50",
        ghost: "text-slate-700 hover:bg-slate-100",
        download:
          "bg-[#16A34A] text-white shadow-md hover:bg-[#15803D] hover:shadow-lg",
      },
      size: {
        default: "px-5 py-3",
        lg: "min-h-14 px-8 py-4 text-lg",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
