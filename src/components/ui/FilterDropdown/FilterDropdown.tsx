import React from "react";
import { FilterDropdownProps } from "@/types/Filter";
import { CustomSelect } from "./CustomSelect";
import { DatePicker } from "./DatePicker";
import "./FilterDropdown.scss";

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  title,
  type,
  value,
  onValueChange,
  onApplyFilter,
  onReset,
  isVisible,
  options = [],
  placeholder = "",
}) => {
  if (!isVisible) return null;

  const renderFilterInput = () => {
    switch (type) {
      case "select":
        return (
          <CustomSelect
            value={value}
            onValueChange={onValueChange}
            options={options}
            placeholder={placeholder || "Select"}
          />
        );

      case "date":
        return (
          <DatePicker
            value={value}
            onValueChange={onValueChange}
            placeholder={placeholder || "Date"}
          />
        );

      case "input":
      default:
        return (
          <input
            type="text"
            className="filter-dropdown__input"
            placeholder={placeholder || title}
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
          />
        );
    }
  };

  const formatTitle = (text: string) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  return (
    <div className="filter-dropdown">
      <div className="filter-dropdown__header">
        <h4 className="filter-dropdown__title">{formatTitle(title)}</h4>
      </div>

      <div className="filter-dropdown__body">{renderFilterInput()}</div>

      <div className="filter-dropdown__actions">
        <button
          type="button"
          className="filter-dropdown__btn filter-dropdown__btn--reset"
          onClick={onReset}
        >
          Reset
        </button>
        <button
          type="button"
          className="filter-dropdown__btn filter-dropdown__btn--filter"
          onClick={onApplyFilter}
        >
          Filter
        </button>
      </div>
    </div>
  );
};

export default FilterDropdown;