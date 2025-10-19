import Link from "next/link"
import Image from "next/image";
import { CodeSquare } from "lucide-react"
import GitHubLogo from "@/public/github.svg";

const Footer = () => {
    return (
        <footer className="relative border-t border-gray-700/50 mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-7">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5 text-gray-400">
                        <CodeSquare className="size-4" />
                        <span className="text-xs">Semicolon. All rights reserved @{new Date().getFullYear()}</span>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                        <Link href="https://github.com/waleedGeorgy/Semicolon" target="_blank" className="text-gray-400 hover:text-gray-300 transition-colors flex flex-row items-center gap-2">
                            <Image src={GitHubLogo} alt="GitHub Logo" width={16} height={16} />
                            <span className="text-xs">GitHub</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer