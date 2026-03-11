"use client";

import { useState, useCallback, useEffect } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { calculateProfit, formatNumberWithSeparators } from "@/lib/calculations";

export default function Calculator() {
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [qticketsRatio, setQticketsRatio] = useState("0.7");
    const [qticketsCommission, setQticketsCommission] = useState("0.06");
    const [ticketscloudRatio, setTicketscloudRatio] = useState("0.3");
    const [ticketscloudCommission, setTicketscloudCommission] = useState("0.12");
    const [tax, setTax] = useState("0.06");
    const [expenses, setExpenses] = useState("");
    const [profit, setProfit] = useState<number | null>(null);
    const [showCopied, setShowCopied] = useState(false);

    const handleCalculate = useCallback(() => {
        if (!price || !quantity) {
            setProfit(null);
            return;
        }

        const priceNum = parseFloat(price);
        const quantityNum = parseInt(quantity);
        const expensesNum = expenses ? parseFloat(expenses) : 0;

        if (isNaN(priceNum) || isNaN(quantityNum) || isNaN(expensesNum)) {
            setProfit(null);
            return;
        }

        const result = calculateProfit(priceNum, quantityNum, parseFloat(qticketsRatio), parseFloat(qticketsCommission), parseFloat(ticketscloudRatio), parseFloat(ticketscloudCommission), parseFloat(tax), expensesNum);

        setProfit(result);
    }, [price, quantity, qticketsRatio, qticketsCommission, ticketscloudRatio, ticketscloudCommission, tax, expenses]);

    useEffect(() => {
        handleCalculate();
    }, [handleCalculate]);

    const handleClear = () => {
        setPrice("");
        setQuantity("");
        setQticketsRatio("0.7");
        setQticketsCommission("0.06");
        setTicketscloudRatio("0.3");
        setTicketscloudCommission("0.12");
        setTax("0.06");
        setExpenses("");
        setProfit(null);

        if (navigator.vibrate) {
            navigator.vibrate([10, 30, 10]);
        }
    };

    const handleCopyProfit = () => {
        if (profit === null) return;

        const text = `${formatNumberWithSeparators(profit)} ₽`;
        navigator.clipboard.writeText(text);
        setShowCopied(true);

        if (navigator.vibrate) {
            navigator.vibrate([5, 40, 5]);
        }

        setTimeout(() => setShowCopied(false), 1500);
    };

    return (
        <div className="stagger-children space-y-6">
            {/* Main Parameters */}
            <section className="animate-ios-slide-up">
                <h2 className="ios-caption mb-3 px-1">ПАРАМЕТРЫ ПРОДАЖИ</h2>
                <div className="ios-group liquid-glass">
                    <InputField
                        label="Цена билета"
                        value={price}
                        onChange={(value) => {
                            setPrice(value);
                        }}
                        placeholder="0"
                        type="decimal"
                        suffix="₽"
                    />
                    <InputField
                        label="Количество"
                        value={quantity}
                        onChange={(value) => {
                            setQuantity(value);
                        }}
                        placeholder="0"
                        type="integer"
                        suffix="шт"
                    />
                </div>
            </section>

            {/* Platform Settings */}
            <section className="animate-ios-slide-up">
                <h2 className="ios-caption mb-3 px-1">ПЛАТФОРМЫ</h2>
                <div className="ios-group liquid-glass">
                    <SelectField
                        label="Qtickets доля"
                        value={qticketsRatio}
                        onChange={(value) => {
                            setQticketsRatio(value);
                        }}
                        options={[
                            { value: "0.7", label: "70%" },
                            { value: "0.5", label: "50%" },
                            { value: "1", label: "100%" },
                        ]}
                    />
                    <SelectField
                        label="Qtickets комиссия"
                        value={qticketsCommission}
                        onChange={(value) => {
                            setQticketsCommission(value);
                        }}
                        options={[
                            { value: "0.06", label: "6%" },
                            { value: "0.08", label: "8%" },
                        ]}
                    />
                    <SelectField
                        label="Ticketscloud доля"
                        value={ticketscloudRatio}
                        onChange={(value) => {
                            setTicketscloudRatio(value);
                        }}
                        options={[
                            { value: "0.3", label: "30%" },
                            { value: "0.5", label: "50%" },
                            { value: "1", label: "100%" },
                        ]}
                    />
                    <SelectField
                        label="Ticketscloud комиссия"
                        value={ticketscloudCommission}
                        onChange={(value) => {
                            setTicketscloudCommission(value);
                        }}
                        options={[
                            { value: "0.12", label: "12%" },
                            { value: "0.1", label: "10%" },
                            { value: "0.07", label: "7%" },
                        ]}
                    />
                </div>
            </section>

            {/* Tax and Expenses */}
            <section className="animate-ios-slide-up">
                <h2 className="ios-caption mb-3 px-1">НАЛОГИ И РАСХОДЫ</h2>
                <div className="ios-group liquid-glass">
                    <SelectField
                        label="Налог"
                        value={tax}
                        onChange={(value) => {
                            setTax(value);
                        }}
                        options={[
                            { value: "0.06", label: "6%" },
                            { value: "0.105", label: "10.5%" },
                            { value: "0.11", label: "11%" },
                        ]}
                    />
                    <InputField
                        label="Расходы"
                        value={expenses}
                        onChange={(value) => {
                            setExpenses(value);
                        }}
                        placeholder="0"
                        type="decimal"
                        suffix="₽"
                    />
                </div>
            </section>

            {/* Result */}
            {profit !== null && (
                <section className={`animate-ios-spring liquid-glass-elevated rounded-[20px] p-4 sm:p-5 ${profit >= 0 ? "result-positive" : "result-negative"}`}>
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                            <div className="ios-label-secondary mb-1 text-sm">Прибыль</div>
                            <div
                                className="text-[28px] sm:text-[34px] font-bold tracking-tight truncate"
                                style={{
                                    color: profit >= 0 ? "var(--ios-green)" : "var(--ios-red)",
                                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                                }}
                            >
                                {formatNumberWithSeparators(profit)}
                                <span className="text-[20px] sm:text-[24px] ml-1">₽</span>
                            </div>
                        </div>

                        <button onClick={handleCopyProfit} className="relative p-2.5 sm:p-3 rounded-full liquid-glass active:scale-95 transition-transform duration-200 no-select flex-shrink-0" aria-label="Копировать">
                            {showCopied ? (
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: "var(--ios-green)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: "var(--ios-label-secondary)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            )}
                            {showCopied && (
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-medium px-2 py-1 rounded-lg liquid-glass whitespace-nowrap" style={{ color: "var(--ios-label)" }}>
                                    Скопировано
                                </span>
                            )}
                        </button>
                    </div>
                </section>
            )}

            {/* Action Buttons */}
            <section className="animate-ios-slide-up space-y-3 pt-2 pb-4">
                <button onClick={handleCalculate} className="w-full ios-button ios-button-filled ios-button-large liquid-glass-elevated">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Рассчитать
                </button>

                <button onClick={handleClear} className="w-full ios-button ios-button-destructive ios-button-large liquid-glass" style={{ background: "var(--glass-bg)" }}>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Очистить
                </button>
            </section>
        </div>
    );
}
