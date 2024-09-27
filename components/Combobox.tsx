"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SelecType {
  label: string;
  value: string;
}

type SelectProps = {
  options: SelecType[];
  text: string;
  onChange: (text: string) => void;
  placeholder: string;
  searchPlaceholder?: string;
};

export function Combobox({
  options,
  text,
  onChange,
  placeholder,
  searchPlaceholder,
}: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(
    options.find((option) => option.value === text)?.value || ""
  );
  console.log(value);

  React.useEffect(() => {
    if(text !== value || text !== "") setValue(text)
  }
  , [text]);

  //   console.log(options)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? value?.charAt(0).toUpperCase() + value?.slice(1)
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 ">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandEmpty>
            <span className="text-gray-400">No results</span>
          </CommandEmpty>
          <CommandGroup
          className="max-h-[400px]"
          >
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                  onChange(currentValue);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
