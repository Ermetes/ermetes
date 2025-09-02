import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value = 0, ...props }, ref) => {
  // Clamp value between 0 and 100
  const progressValue = Math.max(0, Math.min(100, value));
  return (
    <div className="relative w-full">
      {/* Fire emoji above the progress bar, positioned at progress point */}
      <span
        style={{
          position: 'absolute',
          left: `calc(${progressValue}% - 0.75rem)`,
          top: '-1.2rem',
          fontSize: '1.7rem',
          pointerEvents: 'none',
          filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.15))',
          transition: 'left 0.3s',
          zIndex: 2,
        }}
      >🔥</span>
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative h-4 w-full overflow-hidden rounded-full bg-[#00338D]", // blue background for inactive region
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className="h-full transition-all"
          style={{
            width: `${progressValue}%`,
            background: "linear-gradient(90deg, #ff9800 0%, #ff5722 100%)",
            boxShadow: "0 2px 8px 0 rgba(255,87,34,0.15)",
            borderRadius: 'inherit',
            position: 'relative',
            zIndex: 1,
          }}
        />
      </ProgressPrimitive.Root>
    </div>
  );
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
