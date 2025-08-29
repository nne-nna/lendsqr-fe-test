import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onValueChange,
  options,
  placeholder = "Select",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const getSelectedLabel = () => {
    if (!value) return placeholder;
    const selectedOption = options.find((option) => option.value === value);
    return selectedOption ? selectedOption.label : value;
  };

  const handleSelectOption = (optionValue: string) => {
    onValueChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="filter-dropdown__custom-select" ref={selectRef}>
      <div
        className={`filter-dropdown__custom-select-trigger ${
          isOpen ? "filter-dropdown__custom-select-trigger--open" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`filter-dropdown__custom-select-value ${
            !value ? "filter-dropdown__custom-select-value--placeholder" : ""
          }`}
        >
          {getSelectedLabel()}
        </span>
        <ChevronDown
          className={`filter-dropdown__custom-select-arrow ${
            isOpen ? "filter-dropdown__custom-select-arrow--open" : ""
          }`}
          size={16}
        />
      </div>

      {isOpen && (
        <div className="filter-dropdown__custom-select-dropdown custom-scrollbar">
          <div
            className={`filter-dropdown__custom-select-option ${
              !value ? "filter-dropdown__custom-select-option--selected" : ""
            }`}
            onClick={() => handleSelectOption("")}
          >
            {placeholder}
          </div>
          {options.map((option) => (
            <div
              key={option.value}
              className={`filter-dropdown__custom-select-option ${
                value === option.value ? "filter-dropdown__custom-select-option--selected" : ""
              }`}
              onClick={() => handleSelectOption(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
