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

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
            <select value={value} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} className={`w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/30 border-2 transition-all duration-200 text-gray-900 dark:text-white ${isFocused ? "border-blue-500 dark:border-blue-400 shadow-lg" : "border-gray-200 dark:border-gray-700"} focus:outline-none min-h-[48px] text-base cursor-pointer`}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
