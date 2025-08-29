import React from "react";

interface CalendarProps {
  selectedDate: Date | null;
  onDateSelect: (day: number) => void;
  onMonthNavigate: (direction: "prev" | "next") => void;
}

export const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateSelect,
  onMonthNavigate,
}) => {
  const generateCalendar = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  };

  const currentDate = selectedDate || new Date();

  return (
    <>
      <div className="filter-dropdown__calendar-header">
        <button
          className="filter-dropdown__calendar-nav"
          onClick={() => onMonthNavigate("prev")}
        >
          &#8249;
        </button>
        <span className="filter-dropdown__calendar-month">
          {currentDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button
          className="filter-dropdown__calendar-nav"
          onClick={() => onMonthNavigate("next")}
        >
          &#8250;
        </button>
      </div>

      <div className="filter-dropdown__calendar-grid">
        <div className="filter-dropdown__calendar-weekdays">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day} className="filter-dropdown__calendar-weekday">
              {day}
            </div>
          ))}
        </div>

        <div className="filter-dropdown__calendar-days">
          {generateCalendar(currentDate.getFullYear(), currentDate.getMonth()).map(
            (day, index) => (
              <div
                key={index}
                className={`filter-dropdown__calendar-day ${
                  day ? "filter-dropdown__calendar-day--available" : ""
                } ${
                  day &&
                  selectedDate &&
                  day === selectedDate.getDate() &&
                  currentDate.getMonth() === selectedDate.getMonth()
                    ? "filter-dropdown__calendar-day--selected"
                    : ""
                }`}
                onClick={() => day && onDateSelect(day)}
              >
                {day}
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};
