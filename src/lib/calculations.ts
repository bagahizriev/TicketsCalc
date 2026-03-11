/**
 * Форматирует число с разделителями разрядов (пробелами)
 * @param number - число для форматирования
 * @param decimalPlaces - количество знаков после запятой
 * @returns отформатированная строка
 */
export function formatNumberWithSeparators(number: number, decimalPlaces: number): string {
    const formatted = number.toFixed(decimalPlaces);
    const parts = formatted.split(".");

    let integerPart = parts[0];
    let formattedInteger = "";

    for (let i = 0; i < integerPart.length; i++) {
        const positionFromEnd = integerPart.length - i;
        if (i > 0 && positionFromEnd % 3 === 0) {
            formattedInteger += " ";
        }
        formattedInteger += integerPart[i];
    }

    if (parts.length > 1) {
        return `${formattedInteger}.${parts[1]}`;
    }

    return formattedInteger;
}

/**
 * Обрезает число до указанного количества знаков после запятой без округления
 * @param value - число для обрезки
 * @param decimals - количество знаков после запятой
 * @returns обрезанное число
 */
function truncateDecimals(value: number, decimals: number): number {
    const multiplier = Math.pow(10, decimals);
    return Math.floor(value * multiplier) / multiplier;
}

/**
 * Вычисляет рекламные метрики
 * @param budget - бюджет кампании
 * @param impressions - количество показов
 * @param clicks - количество кликов
 * @returns объект с метриками ecpc, ecpm, ctr
 */
export function calculateMetrics(
    budget: number,
    impressions: number,
    clicks: number,
): {
    ecpc: number;
    ecpm: number;
    ctr: number;
} {
    // eCPC = Бюджет / Переходы (обрезаем до 2 знаков без округления)
    const ecpc = truncateDecimals(budget / clicks, 2);

    // eCPM = (Бюджет / Показы) * 1000 (обрезаем до 2 знаков без округления)
    const ecpm = truncateDecimals((budget / impressions) * 1000, 2);

    // CTR = (Переходы / Показы) * 100 (округляем математически до 3 знаков)
    const ctr = Math.round((clicks / impressions) * 100 * 1000) / 1000;

    return {
        ecpc,
        ecpm,
        ctr,
    };
}
