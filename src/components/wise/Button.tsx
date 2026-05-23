import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "wise-pill inline-flex items-center justify-center whitespace-nowrap",
          {
            "bg-wise-green text-dark-green": variant === "primary",
            "bg-near-black text-white": variant === "secondary",
            "bg-transparent text-near-black hover:bg-bg-mint": variant === "ghost",
            "px-4 py-2 text-sm": size === "sm",
            "px-8 py-4 text-lg": size === "md",
            "px-10 py-5 text-xl": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
