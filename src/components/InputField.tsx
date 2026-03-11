"use client";

import { useState } from "react";

interface InputFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    type: "decimal" | "integer";
    suffix?: string;
}

export default function InputField({ label, value, onChange, placeholder, type, suffix }: InputFieldProps) {
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
        <div className="ios-group-item flex items-center justify-between py-3">
            <label className="ios-label flex-shrink-0 mr-4">{label}</label>
            <div className="flex items-center flex-1 justify-end">
                <input
                    type="text"
                    inputMode={type === "decimal" ? "decimal" : "numeric"}
                    value={value}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    className="ios-input text-right w-full max-w-[140px]"
                    style={{
                        boxShadow: isFocused ? "0 0 0 3px rgba(0, 122, 255, 0.15)" : "none",
                    }}
                />
                {suffix && (
                    <span className="ios-label-secondary ml-2">{suffix}</span>
                )}
            </div>
        </div>
    );
}
