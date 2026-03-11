"use client";

import { useState, useCallback } from "react";
import InputField from "./InputField";
import ResultCard from "./ResultCard";
import { calculateMetrics, formatNumberWithSeparators } from "@/lib/calculations";

export default function Calculator() {
    const [budget, setBudget] = useState("");
    const [impressions, setImpressions] = useState("");
    const [clicks, setClicks] = useState("");
    const [results, setResults] = useState<{
        ecpc: number;
        ecpm: number;
        ctr: number;
    } | null>(null);

    const handleCalculate = useCallback(() => {
        if (!budget || !impressions || !clicks) {
            setResults(null);
            return;
        }

        const budgetNum = parseFloat(budget);
        const impressionsNum = parseInt(impressions);
        const clicksNum = parseInt(clicks);

        if (isNaN(budgetNum) || isNaN(impressionsNum) || isNaN(clicksNum)) {
            setResults(null);
            return;
        }

        if (clicksNum === 0 || impressionsNum === 0) {
            setResults(null);
            return;
        }

        const metrics = calculateMetrics(budgetNum, impressionsNum, clicksNum);
        setResults(metrics);
    }, [budget, impressions, clicks]);

    const handleClear = () => {
        setBudget("");
        setImpressions("");
        setClicks("");
        setResults(null);

        if (navigator.vibrate) {
            navigator.vibrate(10);
        }
    };

    const handleCopyAll = () => {
        if (!results || !budget || !impressions || !clicks) return;

        const budgetFormatted = formatNumberWithSeparators(parseFloat(budget), 2);
        const impressionsFormatted = formatNumberWithSeparators(parseInt(impressions), 0);
        const clicksFormatted = formatNumberWithSeparators(parseInt(clicks), 0);
        const ctrFormatted = formatNumberWithSeparators(results.ctr, 3);
        const ecpcFormatted = formatNumberWithSeparators(results.ecpc, 2);
        const ecpmFormatted = formatNumberWithSeparators(results.ecpm, 2);

        const text = `Потрачено: ${budgetFormatted} ₽, Показы: ${impressionsFormatted}, Переходы: ${clicksFormatted}, CTR: ${ctrFormatted} %, eCPC: ${ecpcFormatted} ₽, eCPM: ${ecpmFormatted} ₽`;

        navigator.clipboard.writeText(text);

        if (navigator.vibrate) {
            navigator.vibrate([10, 50, 10]);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Input Section */}
            <div className="glass-card rounded-3xl p-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Входные параметры</h2>

                <InputField
                    label="Бюджет"
                    value={budget}
                    onChange={(value) => {
                        setBudget(value);
                        handleCalculate();
                    }}
                    placeholder="0.00"
                    type="decimal"
                />

                <InputField
                    label="Показы"
                    value={impressions}
                    onChange={(value) => {
                        setImpressions(value);
                        handleCalculate();
                    }}
                    placeholder="0"
                    type="integer"
                />

                <InputField
                    label="Переходы"
                    value={clicks}
                    onChange={(value) => {
                        setClicks(value);
                        handleCalculate();
                    }}
                    placeholder="0"
                    type="integer"
                />
            </div>

            {/* Results Section */}
            {results && (
                <div className="glass-card rounded-3xl p-6 space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Результаты</h2>

                    <ResultCard label="eCPC" value={results.ecpc} unit="₽" decimals={2} description="Эффективная стоимость клика" />

                    <ResultCard label="eCPM" value={results.ecpm} unit="₽" decimals={2} description="Эффективная стоимость тысячи показов" />

                    <ResultCard label="CTR" value={results.ctr} unit="%" decimals={3} description="Коэффициент кликабельности" />
                </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
                {results && (
                    <button onClick={handleCopyAll} className="w-full glass-card rounded-2xl py-4 px-6 font-semibold text-gray-900 dark:text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 min-h-[52px]">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                        </svg>
                        Копировать все результаты
                    </button>
                )}

                <button onClick={handleClear} className="w-full glass-card rounded-2xl py-4 px-6 font-semibold text-red-600 dark:text-red-400 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 min-h-[52px]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Очистить
                </button>
            </div>
        </div>
    );
}
