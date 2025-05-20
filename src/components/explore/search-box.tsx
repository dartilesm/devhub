"use client";

import { Icon } from "@iconify/react";
import { Input } from "@heroui/react";
import { useCallback, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

interface SearchBoxProps {
  onSearch: (term: string) => void;
  placeholder?: string;
}

export function SearchBox({ onSearch, placeholder = "Search..." }: SearchBoxProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(onSearch, 300);

  const handleSearch = useCallback(
    (value: string) => {
      setSearchTerm(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  return (
    <div className='relative w-full max-w-2xl mx-auto'>
      <div className='relative'>
        <Input
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder}
          aria-label='Search'
          startContent={
            <Icon
              icon='lucide:search'
              className='text-default-400 pointer-events-none flex-shrink-0'
              width={20}
              height={20}
            />
          }
          classNames={{
            input: "pl-12",
            inputWrapper:
              "bg-default-100/50 dark:bg-content2/50 backdrop-blur-xl hover:bg-default-200/50 dark:hover:bg-content2 group-data-[focused=true]:bg-default-200/50 dark:group-data-[focused=true]:bg-content2",
          }}
        />
      </div>
    </div>
  );
}
