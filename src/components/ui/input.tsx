import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-input border-2 border-ti-grey-200 bg-background px-4 py-2 text-base font-medium transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-ti-grey-400 focus-visible:outline-none focus-visible:border-ti-black focus-visible:ring-2 focus-visible:ring-ti-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-ti-grey-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
