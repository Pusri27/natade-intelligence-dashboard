"use client";

import { ReactNode } from "react";

interface SkipLinkProps {
    href?: string;
    children?: ReactNode;
}

export function SkipLink({ href = "#main-content", children = "Skip to main content" }: SkipLinkProps) {
    return (
        <a
            href={href}
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-zinc-900"
        >
            {children}
        </a>
    );
}

// Focus trap for modals
interface FocusTrapProps {
    children: ReactNode;
    active?: boolean;
}

export function FocusTrap({ children, active = true }: FocusTrapProps) {
    // Simple implementation - in production use @headlessui/react or react-focus-lock
    return <div data-focus-trap={active}>{children}</div>;
}

// Screen reader only text
interface SrOnlyProps {
    children: ReactNode;
}

export function SrOnly({ children }: SrOnlyProps) {
    return <span className="sr-only">{children}</span>;
}

// Announce to screen readers
interface LiveRegionProps {
    children: ReactNode;
    mode?: "polite" | "assertive";
}

export function LiveRegion({ children, mode = "polite" }: LiveRegionProps) {
    return (
        <div
            role="status"
            aria-live={mode}
            aria-atomic="true"
            className="sr-only"
        >
            {children}
        </div>
    );
}

// Visually hidden but focusable
interface VisuallyHiddenProps {
    children: ReactNode;
    focusable?: boolean;
}

export function VisuallyHidden({ children, focusable = false }: VisuallyHiddenProps) {
    return (
        <span
            className={focusable ? "sr-only focus:not-sr-only" : "sr-only"}
            tabIndex={focusable ? 0 : undefined}
        >
            {children}
        </span>
    );
}
