import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Калькулятор прибыли",
    description: "Калькулятор прибыли от продажи билетов с учетом комиссий платформ и налогов",
    manifest: "/TicketsCalc/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
        title: "Прибыль",
    },
    icons: {
        apple: "/TicketsCalc/icon.svg",
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#f2f2f7" },
        { media: "(prefers-color-scheme: dark)", color: "#000000" },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/TicketsCalc/icon.svg" />
                <link rel="apple-touch-icon" href="/TicketsCalc/icon.svg" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                <meta name="apple-mobile-web-app-title" content="Прибыль" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        if ('serviceWorker' in navigator) {
                            window.addEventListener('load', async () => {
                                try {
                                    const registration = await navigator.serviceWorker.register('/TicketsCalc/sw.js');
                                    console.log('SW registered');
                                    
                                    // Проверка обновлений каждую минуту
                                    setInterval(() => registration.update(), 60000);
                                    
                                    // Автообновление при новой версии
                                    registration.addEventListener('updatefound', () => {
                                        const newWorker = registration.installing;
                                        if (!newWorker) return;
                                        
                                        newWorker.addEventListener('statechange', () => {
                                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                                console.log('New version! Updating...');
                                                newWorker.postMessage({ type: 'SKIP_WAITING' });
                                                setTimeout(() => window.location.reload(), 500);
                                            }
                                        });
                                    });
                                    
                                    let refreshing = false;
                                    navigator.serviceWorker.addEventListener('controllerchange', () => {
                                        if (refreshing) return;
                                        refreshing = true;
                                        window.location.reload();
                                    });
                                } catch (err) {
                                    console.log('SW failed:', err);
                                }
                            });
                        }
                    `,
                    }}
                />
            </head>
            <body className="antialiased h-full">{children}</body>
        </html>
    );
}
