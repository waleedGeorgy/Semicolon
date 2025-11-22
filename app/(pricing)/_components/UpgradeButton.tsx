"use client";
import { useState } from "react";
import { ArrowBigUp } from "lucide-react";
import { createToast } from "@/app/components/Toast";

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
            className="flex group items-center gap-2 px-4 py-2 rounded-md border border-amber-400/20 hover:border-amber-400/60 bg-gradient-to-r from-amber-400/10 to-orange-400/10 hover:from-amber-400/20 hover:to-orange-400/20 transition-colors duration-300 font-roboto-condensed text-gray-300"
        >
            <ArrowBigUp className="size-5 group-hover:-translate-y-0.5 transition-all duration-300 text-amber-400 group-hover:text-amber-300" />
            <span className="font-medium text-amber-400/90 group-hover:text-amber-300">{isLoading ? 'Processing...' : 'Upgrade to Pro'}</span>
        </button>
    );
}
