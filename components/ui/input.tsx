import * as React from "react";
import { cn } from "./utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      // class hook "app-input" replaces old data-slot
      className={cn(
        "app-input flex h-10 w-full rounded-lg bg-input-background px-3 py-2 text-sm outline-none",
        "placeholder:text-muted-foreground",
        "focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
