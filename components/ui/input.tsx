import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  onSearch?: () => void; // Nueva prop onSearch
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", onSearch, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        <input
          type={type}
          className={cn(
            "h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pr-10 text-lg shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
