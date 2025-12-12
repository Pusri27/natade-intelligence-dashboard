"use client";

import Link from "next/link";
import { Sparkles, Github, Twitter, Linkedin, Mail } from "lucide-react";

const footerLinks = {
    product: [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Products", href: "/products" },
        { label: "Insights", href: "/insights" },
        { label: "Analytics", href: "/analytics" },
    ],
    resources: [
        { label: "Documentation", href: "/docs" },
        { label: "API Reference", href: "/api" },
        { label: "Blog", href: "/blog" },
        { label: "Changelog", href: "/changelog" },
    ],
    company: [
        { label: "About", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
        { label: "Privacy", href: "/privacy" },
    ],
};

const socialLinks = [
    { icon: Github, href: "https://github.com" },
    { icon: Twitter, href: "https://twitter.com" },
    { icon: Linkedin, href: "https://linkedin.com" },
    { icon: Mail, href: "mailto:hello@natade.io" },
];

export function Footer() {
    return (
        <footer className="relative bg-zinc-950/50 border-t border-white/5 backdrop-blur-xl">
            {/* Gradient line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Brand Column */}
                    <div className="col-span-2 lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4 group">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/20">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold tracking-tight gradient-text">
                                    NATADE
                                </span>
                                <span className="text-[10px] -mt-1 tracking-widest uppercase text-zinc-500 font-medium">
                                    Intelligence
                                </span>
                            </div>
                        </Link>
                        <p className="text-sm text-zinc-400 mb-6 max-w-xs leading-relaxed">
                            AI-powered product intelligence platform for dropshipping excellence.
                        </p>
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-lg flex items-center justify-center bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white hover:border-white/20 transition-all hover:-translate-y-0.5"
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Product Links */}
                    <div className="flex flex-col">
                        <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-zinc-500 hover:text-indigo-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div className="flex flex-col">
                        <h4 className="text-sm font-semibold text-white mb-4">Resources</h4>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-zinc-500 hover:text-indigo-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div className="flex flex-col">
                        <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-zinc-500 hover:text-indigo-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="col-span-2 md:col-span-4 lg:col-span-1">
                        <h4 className="text-sm font-semibold text-white mb-4">Stay Updated</h4>
                        <p className="text-sm text-zinc-400 mb-4">
                            Get the latest insights and updates.
                        </p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 text-sm px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5">
                    <p className="text-sm text-zinc-600">
                        © {new Date().getFullYear()} Natade Intelligence. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-sm text-zinc-500">
                        <Link href="/terms" className="hover:text-zinc-300 transition-colors">
                            Terms
                        </Link>
                        <Link href="/privacy" className="hover:text-zinc-300 transition-colors">
                            Privacy
                        </Link>
                        <Link href="/cookies" className="hover:text-zinc-300 transition-colors">
                            Cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
