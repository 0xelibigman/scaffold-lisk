"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SimpleSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function SimpleSelectTrigger({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "flex w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="h-4 w-4 opacity-50" />
    </button>
  );
}

export function SimpleSelectContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    >
      <div className="p-1">{children}</div>
    </div>
  );
}

export function SimpleSelectItem({
  className,
  children,
  onClick,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}

export function SimpleSelect({ 
  value, 
  onValueChange, 
  options, 
  placeholder = "Select an option", 
  className,
  disabled = false
}: SimpleSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      <SimpleSelectTrigger 
        onClick={() => !disabled && setIsOpen(!isOpen)} 
        className={disabled ? "opacity-50 cursor-not-allowed" : ""}
      >
        {selectedOption ? selectedOption.label : placeholder}
      </SimpleSelectTrigger>
      
      {isOpen && !disabled && (
        <SimpleSelectContent className="w-full mt-1">
          {options.map((option) => (
            <SimpleSelectItem
              key={option.value}
              onClick={() => {
                onValueChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </SimpleSelectItem>
          ))}
        </SimpleSelectContent>
      )}
    </div>
  );
}