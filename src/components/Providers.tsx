"use client";

import { ReactNode } from "react";
import { Preloader } from "@/components/ui/Preloader";
import { ShortcutsOverlay } from "@/components/ui/ShortcutsOverlay";
import { FloatingRadialMenu } from "@/components/ui/RadialMenu";
import { ToastProvider } from "@/components/ui/Toast";

interface ProvidersProps {
    children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <ToastProvider>
            {/* Cinematic Preloader */}
            <Preloader />

            {/* Keyboard Shortcuts Overlay */}
            <ShortcutsOverlay />

            {/* Main Content */}
            {children}

            {/* Floating Radial Menu */}
            <FloatingRadialMenu />
        </ToastProvider>
    );
}
