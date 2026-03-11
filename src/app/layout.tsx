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
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
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
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        if ('serviceWorker' in navigator) {
                            window.addEventListener('load', () => {
                                navigator.serviceWorker.register('/TicketsCalc/sw.js')
                                    .then(reg => console.log('SW registered:', reg))
                                    .catch(err => console.log('SW registration failed:', err));
                            });
                        }
                    `,
                    }}
                />
            </head>
            <body className="antialiased">{children}</body>
        </html>
    );
}
