"use client"
import { useCodeEditorStore } from "@/app/store/useCodeEditorStore";
import { useEffect, useRef, useState } from "react";
import { THEMES } from "../_constants";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import useMounted from "@/app/hooks/useMounted";

const ThemePicker = () => {
    const [isOpen, setIsOpen] = useState(false);

    const mounted = useMounted();
    
    const { theme, setTheme } = useCodeEditorStore();

    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentTheme = THEMES.find((t) => t.id === theme);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!mounted) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Dropdown activator */}
            <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(!isOpen)}
                className="group relative flex items-center gap-2 px-3 py-1.5 bg-[#1e1e2e]/80 rounded-lg border border-gray-800 hover:border-gray-700 w-[180px] hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/5 transition-colors duration-300"
            >
                {/* hover state bg decorator */}
                <div className="relative size-3.5 rounded-full border border-gray-600 group-hover:border-gray-500 transition-colors" style={{ background: currentTheme?.color }} />
                <span className="text-gray-300 text-left group-hover:text-white transition-colors text-sm font-medium">
                    {currentTheme?.label}
                </span>
                {isOpen ? (<ChevronDown className="size-4 rotate-z-180 transition-all duration-200 ml-auto" />) : (<ChevronDown className="size-4 rotate-z-0 transition-all duration-200 ml-auto" />)}
            </motion.button>
            {/* Theme list */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -12, scale: 1 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-full left-0 mt-1.5 w-full min-w-[240px] bg-[#1e1e2e]/95 backdrop-blur-xl rounded-lg border border-stone-800 shadow-xl z-50"
                    >
                        <div className="px-3 py-2">
                            <p className="text-xs font-medium text-gray-400">Select a theme</p>
                        </div>

                        {THEMES.map((t, index) => (
                            <motion.button
                                key={t.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative group w-full flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 rounded-lg ${theme === t.id ? "bg-blue-500/10 hover:bg-[#262637] text-blue-400" : "text-gray-300"}`}
                                onClick={() => setTheme(t.id)}
                            >
                                {/* label */}
                                <span className="flex-1 text-left group-hover:text-white transition-colors font-light">
                                    {t.label}
                                </span>
                                {/* color indicator */}
                                <div
                                    className="relative size-4 rounded-full border border-gray-600 group-hover:border-gray-500 group-hover:scale-110 transition-colors"
                                    style={{ background: t.color }}
                                />
                                {/* active theme border */}
                                {theme === t.id && (
                                    <motion.div
                                        className="absolute inset-0 border border-blue-500/30 rounded-lg"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ThemePicker