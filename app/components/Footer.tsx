import Link from "next/link"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import SemicolonLogo from "@/public/semicolon.png"
import GitHubLogo from "@/public/github.svg"

const Footer = () => {
    return (
        <footer className="relative border-t border-gray-700/50 mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-7">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Image src={SemicolonLogo} alt="Logo of Semicolon" width={16} height={16} />
                        <span className="text-xs text-gray-400">Semicolon. All rights reserved @{new Date().getFullYear()}</span>
                    </div>
                    <div>
                        <Link href="https://github.com/waleedGeorgy/Semicolon" target="_blank" className="text-gray-400 hover:text-gray-300 transition-colors flex flex-row items-center gap-2">
                            <Image src={GitHubLogo} alt="GitHub Logo" width={16} height={16} />
                            <p className="text-xs flex flex-row items-center gap-1">
                                <span className="font-semibold">GitHub</span>
                                <ExternalLink className="inline size-3" />
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer