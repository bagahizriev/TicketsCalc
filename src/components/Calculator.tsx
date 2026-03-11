"use client";

import { useState, useCallback } from "react";
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
            navigator.vibrate(10);
        }
    };

    const handleCopyProfit = () => {
        if (profit === null) return;

        const text = `Прибыль: ${formatNumberWithSeparators(profit)} ₽`;
        navigator.clipboard.writeText(text);

        if (navigator.vibrate) {
            navigator.vibrate([10, 50, 10]);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Input Section */}
            <div className="glass-card rounded-3xl p-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Параметры продажи</h2>

                <InputField
                    label="Цена билета"
                    value={price}
                    onChange={(value) => {
                        setPrice(value);
                        handleCalculate();
                    }}
                    placeholder="0"
                    type="decimal"
                />

                <InputField
                    label="Количество билетов"
                    value={quantity}
                    onChange={(value) => {
                        setQuantity(value);
                        handleCalculate();
                    }}
                    placeholder="0"
                    type="integer"
                />
            </div>

            {/* Platform Settings */}
            <div className="glass-card rounded-3xl p-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Настройки платформ</h2>

                <SelectField
                    label="Соотношение Qtickets"
                    value={qticketsRatio}
                    onChange={(value) => {
                        setQticketsRatio(value);
                        handleCalculate();
                    }}
                    options={[
                        { value: "0.7", label: "70%" },
                        { value: "0.5", label: "50%" },
                        { value: "1", label: "100%" },
                    ]}
                />

                <SelectField
                    label="Комиссия Qtickets"
                    value={qticketsCommission}
                    onChange={(value) => {
                        setQticketsCommission(value);
                        handleCalculate();
                    }}
                    options={[
                        { value: "0.06", label: "6%" },
                        { value: "0.08", label: "8%" },
                    ]}
                />

                <SelectField
                    label="Соотношение Ticketscloud"
                    value={ticketscloudRatio}
                    onChange={(value) => {
                        setTicketscloudRatio(value);
                        handleCalculate();
                    }}
                    options={[
                        { value: "0.3", label: "30%" },
                        { value: "0.5", label: "50%" },
                        { value: "1", label: "100%" },
                    ]}
                />

                <SelectField
                    label="Комиссия Ticketscloud"
                    value={ticketscloudCommission}
                    onChange={(value) => {
                        setTicketscloudCommission(value);
                        handleCalculate();
                    }}
                    options={[
                        { value: "0.12", label: "12%" },
                        { value: "0.1", label: "10%" },
                        { value: "0.07", label: "7%" },
                    ]}
                />
            </div>

            {/* Tax and Expenses */}
            <div className="glass-card rounded-3xl p-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Налоги и расходы</h2>

                <SelectField
                    label="Налог"
                    value={tax}
                    onChange={(value) => {
                        setTax(value);
                        handleCalculate();
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
                        handleCalculate();
                    }}
                    placeholder="0"
                    type="decimal"
                />
            </div>

            {/* Result */}
            {profit !== null && (
                <div className="glass-card rounded-3xl p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Прибыль</div>
                            <div className={`text-3xl font-bold ${profit >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>{formatNumberWithSeparators(profit)} ₽</div>
                        </div>

                        <button onClick={handleCopyProfit} className="ml-4 p-3 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 active:scale-95 transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Копировать">
                            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
                <button onClick={handleCalculate} className="w-full glass-card rounded-2xl py-4 px-6 font-semibold text-blue-600 dark:text-blue-400 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 min-h-[52px]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
                    </svg>
                    Рассчитать
                </button>

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
