/**
 * Регистрирует Service Worker и обрабатывает обновления
 */
export function registerServiceWorker() {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
        return;
    }

    window.addEventListener("load", async () => {
        try {
            const registration = await navigator.serviceWorker.register("/TicketsCalc/sw.js");
            console.log("SW registered:", registration);

            // Проверка обновлений каждые 60 секунд
            setInterval(() => {
                registration.update();
            }, 60000);

            // Обработка обновлений
            registration.addEventListener("updatefound", () => {
                const newWorker = registration.installing;
                if (!newWorker) return;

                newWorker.addEventListener("statechange", () => {
                    if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                        // Новая версия доступна
                        console.log("New version available! Reloading...");

                        // Автоматически активировать новую версию
                        newWorker.postMessage({ type: "SKIP_WAITING" });

                        // Перезагрузить страницу через 500мс
                        setTimeout(() => {
                            window.location.reload();
                        }, 500);
                    }
                });
            });

            // Обработка контроллера
            let refreshing = false;
            navigator.serviceWorker.addEventListener("controllerchange", () => {
                if (refreshing) return;
                refreshing = true;
                window.location.reload();
            });
        } catch (err) {
            console.log("SW registration failed:", err);
        }
    });
}

/**
 * Очищает кеш и перезагружает страницу
 */
export async function clearCacheAndReload() {
    if ("serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration && registration.active) {
            registration.active.postMessage({ type: "CLEAR_CACHE" });
        }

        // Очистить также кеш браузера
        if ("caches" in window) {
            const cacheNames = await caches.keys();
            await Promise.all(cacheNames.map((name) => caches.delete(name)));
        }

        window.location.reload();
    }
}
