import React, { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "./Calendar";
import { TimePicker } from "./TimePicker";
import { calendarIcon } from "../../../assets";

interface DatePickerProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onValueChange,
  placeholder = "Date",
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState({
    hours: "10",
    minutes: "00",
    period: "AM",
  });
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };

    if (isCalendarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCalendarOpen]);

  useEffect(() => {
    if (value && value !== selectedDate?.toISOString()) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        setSelectedDate(date);
        const hours = date.getHours();
        const period = hours >= 12 ? "PM" : "AM";
        const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
        setSelectedTime({
          hours: displayHours.toString().padStart(2, "0"),
          minutes: date.getMinutes().toString().padStart(2, "0"),
          period,
        });
      }
    } else if (!value) {
      setSelectedDate(null);
      setSelectedTime({ hours: "10", minutes: "00", period: "AM" });
    }
  }, [value]);

  const formatDateForDisplay = (dateValue: string) => {
    if (!dateValue) return "";
    const date = new Date(dateValue);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleDateSelect = (day: number) => {
    const currentDate = selectedDate || new Date();
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );

    const hours =
      selectedTime.period === "PM" && selectedTime.hours !== "12"
        ? parseInt(selectedTime.hours) + 12
        : selectedTime.period === "AM" && selectedTime.hours === "12"
        ? 0
        : parseInt(selectedTime.hours);

    newDate.setHours(hours, parseInt(selectedTime.minutes), 0, 0);
    setSelectedDate(newDate);
    onValueChange(newDate.toISOString());
  };

  const handleTimeChange = (
    type: "hours" | "minutes" | "period",
    value: string
  ) => {
    const newTime = { ...selectedTime, [type]: value };
    setSelectedTime(newTime);

    if (selectedDate) {
      const hours =
        newTime.period === "PM" && newTime.hours !== "12"
          ? parseInt(newTime.hours) + 12
          : newTime.period === "AM" && newTime.hours === "12"
          ? 0
          : parseInt(newTime.hours);

      const updatedDate = new Date(selectedDate);
      updatedDate.setHours(hours, parseInt(newTime.minutes), 0, 0);
      setSelectedDate(updatedDate);
      onValueChange(updatedDate.toISOString());
    }
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const currentDate = selectedDate || new Date();
    const newDate = new Date(currentDate);

    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }

    setSelectedDate(newDate);
  };

  return (
    <div className="filter-dropdown__date-container" ref={calendarRef}>
      <input
        type="text"
        className="filter-dropdown__input filter-dropdown__input--date"
        placeholder={placeholder}
        value={value ? formatDateForDisplay(value) : ""}
        readOnly
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
      />

      <img
        src={calendarIcon}
        className="filter-dropdown__date-icon"
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        alt="calendar"
      />

      {isCalendarOpen && (
        <div className="filter-dropdown__calendar">
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            onMonthNavigate={navigateMonth}
          />
          <TimePicker
            selectedTime={selectedTime}
            onTimeChange={handleTimeChange}
          />
        </div>
      )}
    </div>
  );
};
