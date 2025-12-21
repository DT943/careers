"use client";

import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

// Utility function to format date for display
const formatDateDisplay = (date: Date): string => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

export type DatePickerFieldProps = {
  label: string;
  value?: string; // ISO date string (yyyy-MM-dd) for form submission
  selectedDate?: Date | undefined;
  onChange?: (date: Date | undefined) => void;
  onValueChange?: (value: string) => void; // Optional: for direct string value updates
  placeholder?: string;
  disabled?: (date: Date) => boolean;
  fromYear?: number;
  toYear?: number;
  required?: boolean;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
};

const DatePickerField = ({
  label,
  value,
  selectedDate: controlledSelectedDate,
  onChange,
  onValueChange,
  placeholder = "Select date",
  disabled,
  fromYear = 1950,
  toYear = new Date().getFullYear(),
  required = false,
  className = "",
  inputClassName = "",
  labelClassName = "",
}: DatePickerFieldProps) => {
  // Internal state for uncontrolled mode
  const [internalSelectedDate, setInternalSelectedDate] = useState<Date | undefined>(
    value ? new Date(value) : undefined
  );
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [portalPosition, setPortalPosition] = useState<{ top: number; left: number } | null>(null);

  // Use controlled or uncontrolled date
  const selectedDate = controlledSelectedDate !== undefined ? controlledSelectedDate : internalSelectedDate;

  // Update internal state when value prop changes
  useEffect(() => {
    if (value) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        setInternalSelectedDate(date);
      }
    } else if (value === "") {
      setInternalSelectedDate(undefined);
    }
  }, [value]);

  // Calculate portal position when calendar opens
  useEffect(() => {
    if (!isOpen || !inputRef.current) return;

    const rect = inputRef.current.getBoundingClientRect();
    const calendarHeight = 340;
    const calendarWidth = 320;

    let top = rect.bottom + 8;
    if (top + calendarHeight > window.innerHeight - 16) {
      top = rect.top - calendarHeight - 8;
    }

    let left = rect.left;
    if (left + calendarWidth > window.innerWidth - 16) {
      left = window.innerWidth - calendarWidth - 16;
    }

    setPortalPosition({ top, left });
  }, [isOpen]);

  // Close date picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (controlledSelectedDate === undefined) {
      // Uncontrolled mode
      setInternalSelectedDate(date);
    }

    // Call onChange callback
    if (onChange) {
      onChange(date);
    }

    // Call onValueChange with formatted string
    if (onValueChange) {
      onValueChange(date ? formatDate(date) : "");
    }

    setIsOpen(false);
  };

  const displayValue = selectedDate ? formatDateDisplay(selectedDate) : "";

  return (
    <div className={`relative flex flex-col gap-1 text-xs font-medium text-primary-900 ${className}`}>
      <label className={labelClassName}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          readOnly
          value={displayValue}
          placeholder={placeholder}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full rounded-md px-3 py-2 text-sm text-primary-900 cursor-pointer focus:border-primary-1 focus:ring-1 focus:ring-primary-1 ${inputClassName}`}
        />
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
      {isOpen && portalPosition && (
        <div
          ref={datePickerRef}
          className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-4 min-w-[280px] [&_.rdp-nav]:flex! [&_.rdp-nav_button]:block!"
          style={{ top: portalPosition.top, left: portalPosition.left }}
        >
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            disabled={disabled}
            className="rdp-root"
            captionLayout="dropdown"
            fromYear={fromYear}
            toYear={toYear}
            showOutsideDays
            classNames={{
              months: "rdp-months",
              month: "rdp-month",
              month_caption:
                "rdp-month_caption flex items-center justify-center pt-1 relative text-sm font-semibold text-primary-900 mb-2",
              caption_label: "text-sm font-semibold text-primary-900",
              nav: "hidden items-center",
              nav_button:
                "absolute top-1 h-7 w-7 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors text-gray-600",
              nav_button_previous: "left-1",
              nav_button_next: "right-1",
              table: "rdp-table w-full",
              weekday:
                "rdp-weekday text-center font-medium text-xs text-gray-600",
              day:
                "font-normal text-sm text-primary-900 hover:bg-gray-100 rounded-full transition-colors",
              day_selected:
                "bg-[#054E72] text-white hover:bg-[#054E72] hover:text-white font-semibold",
              day_today: "font-semibold bg-gray-50",
              day_outside: "text-gray-400 opacity-50",
              day_disabled: "text-gray-300 cursor-not-allowed opacity-50",
              day_hidden: "invisible",
            }}
            modifiersClassNames={{
              selected: "rdp-day_selected",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DatePickerField;

