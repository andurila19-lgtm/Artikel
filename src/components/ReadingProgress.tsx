"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
    const [readingProgress, setReadingProgress] = useState(0);

    useEffect(() => {
        const updateScroll = () => {
            const currentProgress = window.scrollY;
            const scrollHeight = document.body.scrollHeight - window.innerHeight;
            if (scrollHeight) {
                setReadingProgress(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
            }
        };

        window.addEventListener("scroll", updateScroll);
        return () => window.removeEventListener("scroll", updateScroll);
    }, []);

    if (readingProgress === 0) return null;

    return (
        <div className="fixed top-0 left-0 w-full z-50 h-1 bg-muted">
            <div
                className="h-full bg-primary transition-all duration-150 ease-out"
                style={{ width: `${readingProgress}%` }}
            />
        </div>
    );
}
