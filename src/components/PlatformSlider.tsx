"use client";

import { useState, useCallback, useEffect } from "react";

interface PlatformSliderProps {
    qticketsValue: number;
    onChange: (qticketsRatio: number, ticketscloudRatio: number) => void;
}

export default function PlatformSlider({ qticketsValue, onChange }: PlatformSliderProps) {
    const [isDragging, setIsDragging] = useState(false);
    const ticketscloudValue = Math.round((1 - qticketsValue) * 100) / 100;

    const handleInteraction = useCallback((clientX: number, rect: DOMRect) => {
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, x / rect.width));
        const newQtickets = Math.round(percentage * 100) / 100;
        const newTicketscloud = Math.round((1 - newQtickets) * 100) / 100;
        onChange(newQtickets, newTicketscloud);
    }, [onChange]);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        const rect = e.currentTarget.getBoundingClientRect();
        handleInteraction(e.clientX, rect);
        if (navigator.vibrate) navigator.vibrate(5);
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setIsDragging(true);
        const rect = e.currentTarget.getBoundingClientRect();
        handleInteraction(e.touches[0].clientX, rect);
        if (navigator.vibrate) navigator.vibrate(5);
    };

    // Handle global mouse/touch events
    useEffect(() => {
        if (!isDragging) return;

        const slider = document.getElementById("platform-slider");
        if (!slider) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = slider.getBoundingClientRect();
            handleInteraction(e.clientX, rect);
        };

        const handleTouchMove = (e: TouchEvent) => {
            const rect = slider.getBoundingClientRect();
            handleInteraction(e.touches[0].clientX, rect);
        };

        const handleEnd = () => {
            setIsDragging(false);
            if (navigator.vibrate) navigator.vibrate(3);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleEnd);
        window.addEventListener("touchmove", handleTouchMove, { passive: false });
        window.addEventListener("touchend", handleEnd);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleEnd);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleEnd);
        };
    }, [isDragging, handleInteraction]);

    const qticketsPercent = Math.round(qticketsValue * 100);
    const ticketscloudPercent = Math.round(ticketscloudValue * 100);

    return (
        <div className="py-4">
            {/* Platform Labels */}
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                    <div 
                        className="w-3 h-3 rounded-full"
                        style={{ background: "var(--ios-blue)" }}
                    />
                    <span className="ios-label font-semibold">Qtickets</span>
                    <span className="ios-label-secondary">{qticketsPercent}%</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="ios-label-secondary">{ticketscloudPercent}%</span>
                    <span className="ios-label font-semibold">Ticketscloud</span>
                    <div 
                        className="w-3 h-3 rounded-full"
                        style={{ background: "var(--ios-purple)" }}
                    />
                </div>
            </div>

            {/* Slider Track */}
            <div
                id="platform-slider"
                className="relative h-12 rounded-xl overflow-hidden cursor-pointer no-select liquid-glass"
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                style={{ touchAction: "none" }}
            >
                {/* Qtickets Section */}
                <div
                    className="absolute left-0 top-0 h-full flex items-center justify-start pl-4"
                    style={{
                        width: `${qticketsValue * 100}%`,
                        background: "linear-gradient(135deg, rgba(0, 122, 255, 0.2) 0%, rgba(0, 122, 255, 0.1) 100%)",
                    }}
                >
                    {qticketsPercent >= 25 && (
                        <span className="text-sm font-semibold" style={{ color: "var(--ios-blue)" }}>
                            Q
                        </span>
                    )}
                </div>

                {/* Ticketscloud Section */}
                <div
                    className="absolute right-0 top-0 h-full flex items-center justify-end pr-4"
                    style={{
                        width: `${ticketscloudValue * 100}%`,
                        background: "linear-gradient(135deg, rgba(175, 82, 222, 0.2) 0%, rgba(175, 82, 222, 0.1) 100%)",
                    }}
                >
                    {ticketscloudPercent >= 25 && (
                        <span className="text-sm font-semibold" style={{ color: "var(--ios-purple)" }}>
                            T
                        </span>
                    )}
                </div>

                {/* Center Handle */}
                <div
                    className="absolute top-0 bottom-0 w-1 flex items-center justify-center"
                    style={{
                        left: `${qticketsValue * 100}%`,
                        transform: "translateX(-50%)",
                    }}
                >
                    <div 
                        className="w-8 h-8 rounded-full shadow-lg flex items-center justify-center transition-transform duration-150"
                        style={{
                            background: "var(--ios-grouped-bg-secondary)",
                            boxShadow: isDragging 
                                ? "0 4px 20px rgba(0, 0, 0, 0.2)" 
                                : "0 2px 12px rgba(0, 0, 0, 0.15)",
                            transform: isDragging ? "scale(1.1)" : "scale(1)",
                        }}
                    >
                        <svg 
                            className="w-4 h-4" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            style={{ color: "var(--ios-label-secondary)" }}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9h8M8 15h8" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
