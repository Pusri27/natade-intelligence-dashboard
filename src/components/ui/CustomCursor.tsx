"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [cursorText, setCursorText] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 400 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const onMouseMove = useCallback(
        (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            setIsVisible(true);
        },
        [cursorX, cursorY]
    );

    const onMouseDown = useCallback(() => setIsClicking(true), []);
    const onMouseUp = useCallback(() => setIsClicking(false), []);
    const onMouseLeave = useCallback(() => setIsVisible(false), []);
    const onMouseEnter = useCallback(() => setIsVisible(true), []);

    useEffect(() => {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mouseup", onMouseUp);
        document.addEventListener("mouseleave", onMouseLeave);
        document.addEventListener("mouseenter", onMouseEnter);

        // Add hover detection for interactive elements
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const interactive = target.closest("a, button, [data-cursor]");

            if (interactive) {
                setIsHovering(true);
                const cursorData = interactive.getAttribute("data-cursor");
                if (cursorData) setCursorText(cursorData);
            } else {
                setIsHovering(false);
                setCursorText("");
            }
        };

        document.addEventListener("mouseover", handleMouseOver);

        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("mouseup", onMouseUp);
            document.removeEventListener("mouseleave", onMouseLeave);
            document.removeEventListener("mouseenter", onMouseEnter);
            document.removeEventListener("mouseover", handleMouseOver);
        };
    }, [onMouseMove, onMouseDown, onMouseUp, onMouseLeave, onMouseEnter]);

    // Don't render on mobile/touch devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
            >
                <motion.div
                    animate={{
                        scale: isClicking ? 0.8 : isHovering ? 2 : 1,
                        opacity: isVisible ? 1 : 0,
                    }}
                    transition={{ duration: 0.15 }}
                    className="relative -translate-x-1/2 -translate-y-1/2"
                >
                    {/* Inner dot */}
                    <div
                        className={`rounded-full bg-white transition-all duration-150 ${isHovering ? "w-12 h-12 opacity-30" : "w-3 h-3"
                            }`}
                    />

                    {/* Cursor text */}
                    {cursorText && (
                        <motion.span
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-medium text-black whitespace-nowrap"
                        >
                            {cursorText}
                        </motion.span>
                    )}
                </motion.div>
            </motion.div>

            {/* Outer ring */}
            <motion.div
                className="fixed top-0 left-0 z-[9998] pointer-events-none"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
            >
                <motion.div
                    animate={{
                        scale: isClicking ? 0.9 : isHovering ? 1.5 : 1,
                        opacity: isVisible ? 0.5 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30"
                />
            </motion.div>

            {/* Hide default cursor globally */}
            <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
        </>
    );
}
