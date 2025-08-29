import React from "react";

interface TimePickerProps {
  selectedTime: {
    hours: string;
    minutes: string;
    period: string;
  };
  onTimeChange: (type: "hours" | "minutes" | "period", value: string) => void;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  selectedTime,
  onTimeChange,
}) => {
  return (
    <div className="filter-dropdown__time-picker">
      <div className="filter-dropdown__time-label">Time:</div>
      <div className="filter-dropdown__time-inputs">
        <select
          className="filter-dropdown__time-select"
          value={selectedTime.hours}
          onChange={(e) => onTimeChange("hours", e.target.value)}
        >
          {Array.from({ length: 12 }, (_, i) => {
            const hour = (i + 1).toString().padStart(2, "0");
            return (
              <option key={hour} value={hour}>
                {hour}
              </option>
            );
          })}
        </select>

        <span className="filter-dropdown__time-separator">:</span>

        <select
          className="filter-dropdown__time-select"
          value={selectedTime.minutes}
          onChange={(e) => onTimeChange("minutes", e.target.value)}
        >
          {Array.from({ length: 60 }, (_, i) => {
            const minute = i.toString().padStart(2, "0");
            return (
              <option key={minute} value={minute}>
                {minute}
              </option>
            );
          })}
        </select>

        <select
          className="filter-dropdown__time-select"
          value={selectedTime.period}
          onChange={(e) => onTimeChange("period", e.target.value)}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </div>
  );
};