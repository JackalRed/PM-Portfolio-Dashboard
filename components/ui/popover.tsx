import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "./utils";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverAnchor = PopoverPrimitive.Anchor;

export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, children, ...rest }, ref) => (
  <PopoverPrimitive.Content
    ref={ref}
    className={cn(
      "z-50 rounded-xl bg-popover p-4 text-popover-foreground shadow-md outline-none",
      className
    )}
    {...rest}
  >
    {children}
  </PopoverPrimitive.Content>
));
PopoverContent.displayName = "PopoverContent";
