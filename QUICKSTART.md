# Быстрый старт

## 1. Установка зависимостей

```bash
npm install
```

## 2. Локальный запуск

```bash
npm run dev
```

Откройте http://localhost:3000 в браузере.

## 3. Деплой на GitHub Pages

### Вариант A: Через GitHub Desktop (проще)

1. Откройте GitHub Desktop
2. File → Add Local Repository → выберите папку проекта
3. Publish repository → назовите `TicketsCalc`
4. Перейдите на github.com в Settings → Pages
5. Source: выберите "GitHub Actions"

### Вариант B: Через командную строку

```bash
# Создайте репозиторий на github.com с именем TicketsCalc

# Затем выполните:
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ВАШ_USERNAME/TicketsCalc.git
git push -u origin main

# Перейдите в Settings → Pages → Source: GitHub Actions
```

## 4. Готово!

Ваше приложение будет доступно по адресу:
`https://ВАШ_USERNAME.github.io/TicketsCalc/`

## Возможности

✅ Работает офлайн (PWA)
✅ Устанавливается на iOS/Android/Desktop
✅ Светлая и темная темы
✅ Haptic feedback на мобильных
✅ Копирование результатов
✅ iOS liquid glass дизайн

## Установка как приложение

### iOS

Safari → Поделиться → На экран «Домой»

### Android

Chrome → Меню → Установить приложение

### Desktop

Chrome/Edge → Иконка установки в адресной строке
