"use client";

import { useState } from "react";
import { formatNumberWithSeparators } from "@/lib/calculations";

interface ResultCardProps {
    label: string;
    value: number;
    unit: string;
    decimals: number;
    description: string;
}

export default function ResultCard({ label, value, unit, decimals, description }: ResultCardProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const text = `${formatNumberWithSeparators(value, decimals)} ${unit}`;
        navigator.clipboard.writeText(text);
        setCopied(true);

        if (navigator.vibrate) {
            navigator.vibrate(10);
        }

        setTimeout(() => setCopied(false), 800);
    };

    return (
        <div className="flex items-center justify-between p-4 rounded-xl bg-white/30 dark:bg-black/20 hover:bg-white/40 dark:hover:bg-black/30 transition-all duration-200">
            <div className="flex-1">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {formatNumberWithSeparators(value, decimals)} {unit}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">{description}</div>
            </div>

            <button onClick={handleCopy} className={`ml-4 p-3 rounded-xl transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center ${copied ? "bg-green-500 dark:bg-green-600 scale-110" : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 active:scale-95"}`} aria-label="Копировать">
                {copied ? (
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                )}
            </button>
        </div>
    );
}
