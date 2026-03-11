"use client";

import { useState, useEffect } from "react";
import Calculator from "@/components/Calculator";

export default function Home() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="h-full flex flex-col">
            {/* iOS Background */}
            <div className="ios-background" />

            {/* iOS Navigation Bar */}
            <header className="ios-nav">
                <div className="flex items-center justify-center">
                    <h1 className="ios-nav-title">Калькулятор</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="ios-scroll flex-1">
                {/* Calculator */}
                <Calculator />

                {/* Bottom Spacer */}
                <div className="h-8" />
            </main>
        </div>
    );
}
