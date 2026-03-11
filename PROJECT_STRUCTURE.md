# Структура проекта

```
TicketsCalc/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions для автодеплоя
├── public/
│   ├── icon.svg                # Иконка приложения (SVG)
│   ├── manifest.json           # PWA манифест
│   ├── sw.js                   # Service Worker
│   ├── robots.txt              # Для SEO
│   ├── .nojekyll               # Для GitHub Pages
│   └── create-icons.html       # Генератор PNG иконок
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Корневой layout с PWA setup
│   │   ├── page.tsx            # Главная страница
│   │   ├── globals.css         # Глобальные стили
│   │   └── offline/
│   │       └── page.tsx        # Страница офлайн режима
│   ├── components/
│   │   ├── Calculator.tsx      # Основной компонент калькулятора
│   │   ├── InputField.tsx      # Поле ввода с валидацией
│   │   ├── ResultCard.tsx      # Карточка результата
│   │   └── ThemeToggle.tsx     # Переключатель темы
│   └── lib/
│       └── calculations.ts     # Логика вычислений метрик
├── .gitignore
├── next.config.js              # Конфигурация Next.js (basePath для GH Pages)
├── package.json
├── postcss.config.js
├── tailwind.config.ts          # Конфигурация Tailwind CSS
├── tsconfig.json
├── README.md                   # Основная документация
├── DEPLOYMENT.md               # Подробная инструкция по деплою
├── QUICKSTART.md               # Быстрый старт
└── PROJECT_STRUCTURE.md        # Этот файл
```

## Ключевые файлы

### Конфигурация

- `next.config.js` - настройка статического экспорта и basePath для GitHub Pages
- `tailwind.config.ts` - кастомные цвета и настройки для glass effect
- `public/manifest.json` - PWA манифест с метаданными приложения

### Компоненты

- `Calculator.tsx` - управляет состоянием и логикой калькулятора
- `InputField.tsx` - валидация и форматирование ввода
- `ResultCard.tsx` - отображение результата с кнопкой копирования
- `ThemeToggle.tsx` - переключение светлой/темной темы

### Логика

- `calculations.ts` - содержит:
    - `calculateMetrics()` - вычисление eCPC, eCPM, CTR
    - `formatNumberWithSeparators()` - форматирование чисел с пробелами
    - `truncateDecimals()` - обрезка без округления

### PWA

- `sw.js` - Service Worker для офлайн работы
- `manifest.json` - метаданные для установки приложения
- `layout.tsx` - регистрация Service Worker

## Особенности реализации

### Вычисления (из старого приложения)

```typescript
// eCPC и eCPM - обрезаются до 2 знаков БЕЗ округления
ecpc = Math.floor((budget / clicks) * 100) / 100;

// CTR - округляется математически до 3 знаков
ctr = Math.round((clicks / impressions) * 100 * 1000) / 1000;
```

### Форматирование

Числа форматируются с пробелами как разделителями разрядов:

- `1234.56` → `1 234.56`
- `1000000` → `1 000 000`

### Glass Effect

Реализован через Tailwind CSS:

```css
.glass-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.18);
}
```

### Темы

- Автоопределение системной темы
- Сохранение выбора в localStorage
- Плавные переходы между темами

### Доступность

- Минимальный размер touch-таргетов: 44x44px
- Haptic feedback на iOS
- Keyboard navigation
- Screen reader support
- WCAG AA color contrast

## Технологии

- **Next.js 14** - React фреймворк с SSG
- **TypeScript** - типизация
- **Tailwind CSS** - стилизация
- **PWA** - Service Worker + Manifest
- **GitHub Actions** - CI/CD

## Команды

```bash
npm run dev      # Разработка (localhost:3000)
npm run build    # Сборка для продакшена
npm run start    # Запуск продакшен сборки
npm run lint     # Проверка кода
```

## Деплой

При push в `main` автоматически:

1. Устанавливаются зависимости
2. Собирается проект
3. Экспортируются статические файлы
4. Деплоятся на GitHub Pages

Результат: `https://USERNAME.github.io/TicketsCalc/`
