"use client";

import { useState } from "react";

interface InputFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    type: "decimal" | "integer";
}

export default function InputField({ label, value, onChange, placeholder, type }: InputFieldProps) {
    const [isFocused, setIsFocused] = useState(false);

    const sanitizeInput = (text: string): string => {
        if (!text) return "";

        text = text.replace(/\s/g, "");
        text = text.replace(/[_'`]/g, "");
        text = text.replace(/,/g, ".");

        if (type === "integer") {
            text = text.replace(/[^\d]/g, "");
        } else {
            text = text.replace(/[^\d.-]/g, "");
            const parts = text.split(".");
            if (parts.length > 2) {
                text = parts[0] + "." + parts.slice(1).join("");
            }
        }

        return text;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sanitized = sanitizeInput(e.target.value);
        onChange(sanitized);
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
            <input type="text" inputMode={type === "decimal" ? "decimal" : "numeric"} value={value} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} placeholder={placeholder} className={`w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/30 border-2 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${isFocused ? "border-blue-500 dark:border-blue-400 shadow-lg" : "border-gray-200 dark:border-gray-700"} focus:outline-none min-h-[48px] text-base`} />
        </div>
    );
}
