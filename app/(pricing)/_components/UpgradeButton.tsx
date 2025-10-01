import { ArrowBigUp, Zap } from "lucide-react";
import Link from "next/link";

export default function UpgradeButton() {
    return (
        <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg hover:from-indigo-400 hover:to-indigo-700 transition-all duration-300">
            <ArrowBigUp className="size-5 group-hover:-translate-y-0.5 transition-all duration-300" />
            Upgrade to Pro
        </Link>
    );
}
