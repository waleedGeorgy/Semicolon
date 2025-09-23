"use client"
import { useCodeEditorStore } from "@/app/store/useCodeEditorStore";
import { useEffect, useRef, useState } from "react";
import { LANGUAGE_CONFIG } from "../_constants";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ChevronDownIcon, LockKeyhole } from "lucide-react";
import useMounted from "@/app/hooks/useMounted";

const LanguagePicker = ({ hasAccess }: { hasAccess: boolean }) => {
    const [isOpen, setIsOpen] = useState(false);

    const mounted = useMounted();

    const dropdownRef = useRef<HTMLDivElement>(null);

    const { language, setLanguage } = useCodeEditorStore();

    const languageData = LANGUAGE_CONFIG[language];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLanguageSelection = (languageId: string) => {
        if (!hasAccess && languageId !== "javascript") return null

        setLanguage(languageId);

        setIsOpen(false)
    }

    if (!mounted) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`group relative flex items-center gap-2 px-3 py-1.5 bg-[#1e1e2e]/80 rounded-lg transition-colors duration-300 border border-gray-800/50 hover:border-gray-700 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/5 ${!hasAccess && language !== "javascript" ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                <div className="size-4">
                    <Image
                        src={languageData.logoPath}
                        alt="programming language logo"
                        width={24}
                        height={24}
                        className="w-full h-full object-contain relative z-10"
                    />
                </div>

                <span className="text-gray-200 min-w-[80px] text-left group-hover:text-white transition-colors text-sm">
                    {languageData.label}
                </span>

                <ChevronDownIcon
                    className={`size-4 text-gray-400 transition-all duration-300 group-hover:text-gray-300 ${isOpen ? "rotate-180" : ""}`}
                />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -12, scale: 1 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12, scale: 1 }}
                        transition={{ duration: 0.25 }}
                        className="absolute top-full left-0 mt-1.5 w-64 bg-[#1e1e2e]/95 backdrop-blur-xl rounded-lg border border-stone-800 shadow-xl z-50"
                    >
                        <div className="px-3 py-2">
                            <p className="text-xs font-medium text-gray-400">Select a language</p>
                        </div>

                        <div className="overflow-y-auto overflow-x-hidden">
                            {Object.values(LANGUAGE_CONFIG).map((lang, index) => {
                                const isLocked = !hasAccess && lang.id !== "javascript";

                                return (
                                    <motion.div
                                        key={lang.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="relative group"
                                    >
                                        <button
                                            className={`relative w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 transition-all duration-200 ${language === lang.id ? "bg-blue-500/10 text-blue-400" : "text-gray-300"} ${isLocked ? "opacity-50" : "hover:bg-[#262637]"}`}
                                            onClick={() => handleLanguageSelection(lang.id)}
                                            disabled={isLocked}
                                        >
                                            <Image
                                                width={16}
                                                height={16}
                                                src={lang.logoPath}
                                                alt={`${lang.label} logo`}
                                                className="object-contain relative z-10 w-auto h-auto"
                                            />
                                            <span className="flex-1 text-left group-hover:text-white transition-colors font-light">
                                                {lang.label}
                                            </span>

                                            {/* selected language border */}
                                            {language === lang.id && (
                                                <motion.div
                                                    className="absolute inset-0 border-2 border-blue-500/30 rounded-lg"
                                                    transition={{
                                                        type: "spring",
                                                        bounce: 0.2,
                                                        duration: 0.6,
                                                    }}
                                                />
                                            )}
                                            {isLocked && (
                                                <LockKeyhole className="size-4 text-gray-400" />
                                            )}
                                        </button>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default LanguagePicker