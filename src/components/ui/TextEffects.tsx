"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface TextScrambleProps {
    text: string;
    className?: string;
    speed?: number;
    trigger?: "hover" | "inView" | "always";
}

const chars = "!<>-_\\/[]{}—=+*^?#________";

export function TextScramble({
    text,
    className = "",
    speed = 30,
    trigger = "hover",
}: TextScrambleProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isScrambling, setIsScrambling] = useState(trigger === "always");

    const scramble = useCallback(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        if (char === " ") return " ";
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                clearInterval(interval);
                setDisplayText(text);
            }

            iteration += 1 / 3;
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    useEffect(() => {
        if (isScrambling) {
            const cleanup = scramble();
            return cleanup;
        }
    }, [isScrambling, scramble]);

    const handleMouseEnter = () => {
        if (trigger === "hover") {
            setIsScrambling(true);
            setTimeout(() => setIsScrambling(false), text.length * speed * 3);
        }
    };

    return (
        <motion.span
            onMouseEnter={handleMouseEnter}
            className={`font-mono ${className}`}
            style={{ fontVariantNumeric: "tabular-nums" }}
        >
            {displayText}
        </motion.span>
    );
}

// Typewriter effect component
interface TypewriterProps {
    text: string;
    className?: string;
    speed?: number;
    delay?: number;
    cursor?: boolean;
}

export function Typewriter({
    text,
    className = "",
    speed = 50,
    delay = 0,
    cursor = true,
}: TypewriterProps) {
    const [displayText, setDisplayText] = useState("");
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            let index = 0;
            const interval = setInterval(() => {
                setDisplayText(text.slice(0, index + 1));
                index++;
                if (index >= text.length) {
                    clearInterval(interval);
                }
            }, speed);

            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timeout);
    }, [text, speed, delay]);

    useEffect(() => {
        if (!cursor) return;
        const interval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);
        return () => clearInterval(interval);
    }, [cursor]);

    return (
        <span className={className}>
            {displayText}
            {cursor && (
                <span
                    className={`inline-block w-[2px] h-[1em] bg-current ml-1 ${showCursor ? "opacity-100" : "opacity-0"
                        }`}
                />
            )}
        </span>
    );
}
