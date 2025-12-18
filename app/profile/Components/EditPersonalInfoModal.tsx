"use client";

import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { ApplicantProfile, useUpdateProfile } from "@/hooks";
import ProfileModalShell from "../../../components/ProfileModalShell";
import { COUNTRIES } from "@/constants/countries";
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

type EditPersonalInfoModalProps = {
  open: boolean;
  onClose: () => void;
  profile: ApplicantProfile;
};

const EditPersonalInfoModal = ({
  open,
  onClose,
  profile,
}: EditPersonalInfoModalProps) => {
  const { mutateAsync: updateProfile, isLoading } = useUpdateProfile();

  // Split stored phone number (e.g. "+963987234768") into country code and local number
  const rawPhone = profile.phoneNumber ?? "";
  const phoneMatch = rawPhone.match(/^(\+\d{1,3})(\d+)$/);
  const initialCountryPhoneCode = phoneMatch ? phoneMatch[1] : "";
  const initialPhoneNumber = phoneMatch ? phoneMatch[2] : rawPhone;

  const [form, setForm] = useState({
    firstName: profile.firstName ?? "",
    lastName: profile.lastName ?? "",
    country: profile.country ?? "",
    city: profile.city ?? "",
    countryPhoneCode: initialCountryPhoneCode,
    phoneNumber: initialPhoneNumber,
    dateOfBirth: profile.dateOfBirth?.split("T")[0] ?? "",
    nationality: profile.nationality ?? "",
    linkedInUrl: profile.linkedInUrl ?? "",
    portfolioUrl: profile.portfolioUrl ?? "",
  });

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    profile.dateOfBirth ? new Date(profile.dateOfBirth) : undefined
  );
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const dateInputRef = useRef<HTMLInputElement | null>(null);

  // Close date picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsDatePickerOpen(false);
      }
    };

    if (isDatePickerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDatePickerOpen]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = formatDate(date);
      handleChange("dateOfBirth", formattedDate);
    }
    setIsDatePickerOpen(false);
  };

  const handleSubmit = async () => {
    const fd = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (val === undefined || val === null || String(val).length === 0) {
        return;
      }

      if (key === "countryPhoneCode") {
        // merged into phoneNumber, don't send separately
        return;
      }

      if (key === "phoneNumber") {
        const fullPhone = `${form.countryPhoneCode ?? ""}${form.phoneNumber ?? ""}`;
        if (fullPhone.trim().length > 0) {
          fd.append("phoneNumber", fullPhone);
        }
        return;
      }

      fd.append(key, val as string);
    });

    await updateProfile(fd);
    onClose();
  };

  const footer = (
    <>
      <button
        onClick={onClose}
        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-primary-900 hover:bg-gray-50"
      >
        Cancel
      </button>
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="rounded-md bg-[#054E72] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95 disabled:opacity-60"
      >
        {isLoading ? "Saving..." : "Save"}
      </button>
    </>
  );

  if (!open) return null;

  return (
    <ProfileModalShell
      onClose={onClose}
      footer={footer}
      maxWidthClass="max-w-4xl"
    >
      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <Field
          label="First Name *"
          value={form.firstName}
          onChange={(v) => handleChange("firstName", v)}
        />
        <Field
          label="Last Name *"
          value={form.lastName}
          onChange={(v) => handleChange("lastName", v)}
        />
        <Field label="Country *" value={form.country} onChange={(v) => handleChange("country", v)} />
        <Field label="City *" value={form.city} onChange={(v) => handleChange("city", v)} />
        <Field
          label="Country Phone Code *"
          value={form.countryPhoneCode}
          onChange={(v) => handleChange("countryPhoneCode", v)}
          placeholder="e.g. +963"
        />
        <Field
          label="Phone Number *"
          value={form.phoneNumber}
          onChange={(v) => handleChange("phoneNumber", v)}
        />
        <DatePickerField
          label="Date of Birth *"
          value={form.dateOfBirth}
          selectedDate={selectedDate}
          isOpen={isDatePickerOpen}
          onToggle={() => setIsDatePickerOpen(!isDatePickerOpen)}
          onDateSelect={handleDateSelect}
          datePickerRef={datePickerRef}
          inputRef={dateInputRef}
        />
        <label className="flex flex-col gap-1 text-xs font-medium text-primary-900">
          Nationality *
          <select
            value={form.nationality || "Syria"}
            onChange={(e) => handleChange("nationality", e.target.value)}
            className="rounded-md border border-gray-200 px-3 py-2 text-sm text-primary-900 bg-white focus:border-primary-1 focus:ring-1 focus:ring-primary-1"
          >
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>
        <Field
          label="LinkedIn Profile (Optional)"
          value={form.linkedInUrl}
          onChange={(v) => handleChange("linkedInUrl", v)}
        />
        <Field
          label="Portfolio/Website (Optional)"
          value={form.portfolioUrl}
          onChange={(v) => handleChange("portfolioUrl", v)}
        />
      </div>
    </ProfileModalShell>
  );
};

const Field = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) => (
  <label className="flex flex-col gap-1 text-xs font-medium text-primary-900">
    {label}
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-md border border-gray-200 px-3 py-2 text-sm text-primary-900 focus:border-primary-1 focus:ring-1 focus:ring-primary-1"
    />
  </label>
);

type DatePickerFieldProps = {
  label: string;
  value: string;
  selectedDate: Date | undefined;
  isOpen: boolean;
  onToggle: () => void;
  onDateSelect: (date: Date | undefined) => void;
  datePickerRef: React.RefObject<HTMLDivElement | null>;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

const DatePickerField = ({
  label,
  value,
  selectedDate,
  isOpen,
  onToggle,
  onDateSelect,
  datePickerRef,
  inputRef,
}: DatePickerFieldProps) => {
  const displayValue = selectedDate ? formatDateDisplay(selectedDate) : "";
  const [portalPosition, setPortalPosition] = useState<{ top: number; left: number } | null>(null);

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
  }, [isOpen, inputRef]);

  return (
    <div className="relative flex flex-col gap-1 text-xs font-medium text-primary-900">
      <label>{label}</label>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          readOnly
          value={displayValue}
          placeholder="Select date"
          onClick={onToggle}
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-primary-900 cursor-pointer focus:border-primary-1 focus:ring-1 focus:ring-primary-1"
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
          className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-4 min-w-[280px]"
          style={{ top: portalPosition.top, left: portalPosition.left }}
        >
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={onDateSelect}
            className="rdp-root"
            captionLayout="dropdown"
            fromYear={1950}
            toYear={new Date().getFullYear()}
            showOutsideDays
            classNames={{
              months: "rdp-months",
              month: "rdp-month",
              month_caption:
                "rdp-month_caption flex items-center justify-center pt-1 relative text-sm font-semibold text-primary-900 mb-2",
              caption_label: "text-sm font-semibold text-primary-900",
              nav: "rdp-nav flex items-center",
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

export default EditPersonalInfoModal;
