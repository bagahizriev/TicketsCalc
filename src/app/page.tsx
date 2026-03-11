"use client";

import { useState, useEffect } from "react";
import Calculator from "@/components/Calculator";
import ThemeToggle from "@/components/ThemeToggle";

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
                <div className="flex items-center justify-between">
                    <div className="w-10" /> {/* Spacer for balance */}
                    <h1 className="ios-nav-title">Калькулятор</h1>
                    <ThemeToggle />
                </div>
            </header>

            {/* Main Content */}
            <main className="ios-scroll flex-1">
                {/* Large Title Section */}
                <div className="pt-4 pb-6 px-1">
                    <h1 className="ios-large-title">Прибыль</h1>
                    <p className="ios-label-secondary mt-1">Расчет дохода от продажи билетов</p>
                </div>

                {/* Calculator */}
                <Calculator />

                {/* Bottom Spacer */}
                <div className="h-8" />
            </main>
        </div>
    );
}
