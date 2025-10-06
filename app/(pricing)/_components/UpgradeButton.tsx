"use client";
import { createToast } from "@/app/components/Toast";
import { ArrowBigUp } from "lucide-react";
import { useState } from "react";

export default function UpgradeButton({ userId, userEmail }: { userId: string, userEmail: string }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleUpgrade = async () => {
        setIsLoading(true);

        try {
            const res = await fetch("/api/create-checkout-session", {
                method: "POST",
                body: JSON.stringify({ userId, userEmail }),
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error("Failed to initialize checkout.")
            }
        } catch (error) {
            console.log(error);
            createToast("error", "Something went wrong. Please try again.")
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleUpgrade}
            disabled={isLoading}
            className="cursor-pointer group inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500/75 to-indigo-600/75 hover:from-indigo-400/75 hover:to-indigo-700/75 transition-colors duration-300 disabled:opacity-50 rounded-lg"
        >
            <ArrowBigUp className="size-5 group-hover:-translate-y-0.5 transition-all duration-300" />
            {isLoading ? 'Processing...' : 'Upgrade to Pro'}
        </button>
    );
}
