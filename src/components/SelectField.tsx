"use client";

import { useState } from "react";

interface SelectFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
}

export default function SelectField({ label, value, onChange, options }: SelectFieldProps) {
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
        if (navigator.vibrate) {
            navigator.vibrate(5);
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
        if (navigator.vibrate) {
            navigator.vibrate(5);
        }
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const selectedLabel = options.find(opt => opt.value === value)?.label || value;

    return (
        <div className="ios-group-item flex items-center justify-between py-3">
            <label className="ios-label">{label}</label>
            <div className="flex items-center">
                <span className="ios-label-secondary mr-2">{selectedLabel}</span>
                <select
                    value={value}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    style={{
                        WebkitAppearance: "none",
                        appearance: "none",
                    }}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <svg 
                    className="w-4 h-4 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    style={{ color: "var(--ios-label-tertiary)" }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </div>
    );
}
