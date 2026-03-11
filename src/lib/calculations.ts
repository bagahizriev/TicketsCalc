/**
 * Форматирует число с разделителями разрядов (пробелами)
 * @param number - число для форматирования
 * @returns отформатированная строка
 */
export function formatNumberWithSeparators(number: number): string {
    return Math.round(number)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/**
 * Вычисляет прибыль от продажи билетов
 * @param price - цена одного билета
 * @param quantity - количество билетов
 * @param qticketsRatio - соотношение продаж через Qtickets (0-1)
 * @param qticketsCommission - комиссия Qtickets (0-1)
 * @param ticketscloudRatio - соотношение продаж через Ticketscloud (0-1)
 * @param ticketscloudCommission - комиссия Ticketscloud (0-1)
 * @param tax - налог (0-1)
 * @param expenses - дополнительные расходы
 * @returns прибыль
 */
export function calculateProfit(price: number, quantity: number, qticketsRatio: number, qticketsCommission: number, ticketscloudRatio: number, ticketscloudCommission: number, tax: number, expenses: number): number {
    // Общая выручка
    const revenue = price * quantity;

    // Комиссии платформ
    const qticketsCommissionAmount = revenue * qticketsRatio * qticketsCommission;
    const ticketscloudCommissionAmount = revenue * ticketscloudRatio * ticketscloudCommission;
    const totalCommissions = qticketsCommissionAmount + ticketscloudCommissionAmount;

    // Выручка после комиссий
    const revenueAfterCommissions = revenue - totalCommissions;

    // Налог от выручки после комиссий
    const taxAmount = tax * revenueAfterCommissions;

    // Итоговая прибыль
    const profit = revenueAfterCommissions - taxAmount - expenses;

    return profit;
}
