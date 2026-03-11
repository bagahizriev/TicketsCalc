"use client";

import { useState, useCallback, useEffect } from "react";
import InputField from "./InputField";
import PlatformSlider from "./PlatformSlider";
import { calculateProfit, formatNumberWithSeparators } from "@/lib/calculations";

// Storage keys for persistent settings
const STORAGE_KEYS = {
    QCOMMISSION: "tickets-qcommission",
    TCLOUD_COMMISSION: "tickets-tcloud-commission",
    Q_RATIO: "tickets-qratio",
    TAX: "tickets-tax",
};

export default function Calculator() {
    // Non-persistent state (resets on reload)
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [expenses, setExpenses] = useState("");
    const [profit, setProfit] = useState<number | null>(null);
    const [showCopied, setShowCopied] = useState(false);

    // Persistent state (saved to localStorage)
    const [qticketsRatio, setQticketsRatio] = useState(0.7);
    const [ticketscloudRatio, setTicketscloudRatio] = useState(0.3);
    const [qticketsCommission, setQticketsCommission] = useState("6");
    const [ticketscloudCommission, setTicketscloudCommission] = useState("12");
    const [tax, setTax] = useState("6");

    // Load persistent settings on mount
    useEffect(() => {
        if (typeof window === "undefined") return;

        const savedQCommission = localStorage.getItem(STORAGE_KEYS.QCOMMISSION);
        const savedTCloudCommission = localStorage.getItem(STORAGE_KEYS.TCLOUD_COMMISSION);
        const savedQRatio = localStorage.getItem(STORAGE_KEYS.Q_RATIO);
        const savedTax = localStorage.getItem(STORAGE_KEYS.TAX);

        if (savedQCommission) setQticketsCommission(savedQCommission);
        if (savedTCloudCommission) setTicketscloudCommission(savedTCloudCommission);
        if (savedTax) setTax(savedTax);

        if (savedQRatio) {
            const ratio = parseFloat(savedQRatio);
            if (!isNaN(ratio) && ratio >= 0 && ratio <= 1) {
                setQticketsRatio(ratio);
                setTicketscloudRatio(Math.round((1 - ratio) * 100) / 100);
            }
        }
    }, []);

    // Save to localStorage when persistent values change
    useEffect(() => {
        if (typeof window === "undefined") return;
        localStorage.setItem(STORAGE_KEYS.QCOMMISSION, qticketsCommission);
    }, [qticketsCommission]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        localStorage.setItem(STORAGE_KEYS.TCLOUD_COMMISSION, ticketscloudCommission);
    }, [ticketscloudCommission]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        localStorage.setItem(STORAGE_KEYS.Q_RATIO, qticketsRatio.toString());
    }, [qticketsRatio]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        localStorage.setItem(STORAGE_KEYS.TAX, tax);
    }, [tax]);

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

        const result = calculateProfit(priceNum, quantityNum, qticketsRatio, (parseFloat(qticketsCommission) || 0) / 100, ticketscloudRatio, (parseFloat(ticketscloudCommission) || 0) / 100, (parseFloat(tax) || 0) / 100, expensesNum);

        setProfit(result);
    }, [price, quantity, qticketsRatio, qticketsCommission, ticketscloudRatio, ticketscloudCommission, tax, expenses]);

    useEffect(() => {
        handleCalculate();
    }, [handleCalculate]);

    const handlePlatformChange = useCallback((newQtickets: number, newTicketscloud: number) => {
        setQticketsRatio(newQtickets);
        setTicketscloudRatio(newTicketscloud);
        if (navigator.vibrate) navigator.vibrate(3);
    }, []);

    const handleClear = () => {
        setPrice("");
        setQuantity("");
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
                    <InputField label="Цена билета" value={price} onChange={setPrice} placeholder="0" type="decimal" suffix="₽" />
                    <InputField label="Количество" value={quantity} onChange={setQuantity} placeholder="0" type="integer" suffix="шт" />
                </div>
            </section>

            {/* Platform Settings */}
            <section className="animate-ios-slide-up">
                <h2 className="ios-caption mb-3 px-1">ПЛАТФОРМЫ</h2>
                <div className="ios-group liquid-glass px-4">
                    {/* Commissions */}
                    <div className="flex items-center justify-between py-3 border-b border-gray-200/20">
                        <div className="flex-1 mr-4">
                            <label className="ios-label block mb-1">Комиссия Qtickets</label>
                            <input
                                type="text"
                                inputMode="decimal"
                                value={qticketsCommission}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/[^\d.]/g, "");
                                    const parts = val.split(".");
                                    if (parts.length > 2) return;
                                    setQticketsCommission(val);
                                }}
                                onBlur={() => {
                                    const num = parseFloat(qticketsCommission);
                                    if (!isNaN(num) && num >= 0 && num <= 100) {
                                        setQticketsCommission(num.toString());
                                    } else {
                                        setQticketsCommission("6");
                                    }
                                }}
                                placeholder="6"
                                className="ios-input text-right w-full"
                            />
                            <span className="ios-label-secondary ml-2">%</span>
                        </div>
                        <div className="flex-1 ml-4">
                            <label className="ios-label block mb-1 text-right">Комиссия Ticketscloud</label>
                            <input
                                type="text"
                                inputMode="decimal"
                                value={ticketscloudCommission}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/[^\d.]/g, "");
                                    const parts = val.split(".");
                                    if (parts.length > 2) return;
                                    setTicketscloudCommission(val);
                                }}
                                onBlur={() => {
                                    const num = parseFloat(ticketscloudCommission);
                                    if (!isNaN(num) && num >= 0 && num <= 100) {
                                        setTicketscloudCommission(num.toString());
                                    } else {
                                        setTicketscloudCommission("12");
                                    }
                                }}
                                placeholder="12"
                                className="ios-input text-right w-full"
                            />
                            <span className="ios-label-secondary ml-2">%</span>
                        </div>
                    </div>

                    {/* Platform Ratio Slider */}
                    <PlatformSlider qticketsValue={qticketsRatio} onChange={handlePlatformChange} />
                </div>
            </section>

            {/* Tax and Expenses */}
            <section className="animate-ios-slide-up">
                <h2 className="ios-caption mb-3 px-1">НАЛОГИ И РАСХОДЫ</h2>
                <div className="ios-group liquid-glass">
                    <div className="ios-group-item flex items-center justify-between py-3">
                        <label className="ios-label">Налог</label>
                        <div className="flex items-center flex-1 justify-end">
                            <input
                                type="text"
                                inputMode="decimal"
                                value={tax}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/[^\d.]/g, "");
                                    const parts = val.split(".");
                                    if (parts.length > 2) return;
                                    setTax(val);
                                }}
                                onBlur={() => {
                                    const num = parseFloat(tax);
                                    if (!isNaN(num) && num >= 0 && num <= 100) {
                                        setTax(num.toString());
                                    } else {
                                        setTax("6");
                                    }
                                }}
                                placeholder="6"
                                className="ios-input text-right w-24"
                            />
                        </div>
                    </div>
                    <InputField label="Расходы" value={expenses} onChange={setExpenses} placeholder="0" type="decimal" suffix="₽" />
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
