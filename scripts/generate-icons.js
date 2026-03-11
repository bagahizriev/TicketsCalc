// Скрипт для генерации иконок из SVG
// Запустите: node scripts/generate-icons.js

const fs = require("fs");
const path = require("path");

console.log("Для генерации PNG иконок из SVG используйте онлайн-конвертер:");
console.log("1. Откройте public/icon.svg");
console.log("2. Конвертируйте в PNG 192x192 и 512x512 на https://cloudconvert.com/svg-to-png");
console.log("3. Сохраните как public/icon-192.png и public/icon-512.png");
console.log("\nИли используйте команду с установленным ImageMagick:");
console.log("convert -background none -resize 192x192 public/icon.svg public/icon-192.png");
console.log("convert -background none -resize 512x512 public/icon.svg public/icon-512.png");
