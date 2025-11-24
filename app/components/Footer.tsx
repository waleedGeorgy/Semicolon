import Link from "next/link"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import SemicolonLogo from "@/public/semicolon.png"
import GitHubLogo from "@/public/github.svg"

const Footer = () => {
    return (
        <footer className="relative border-t border-gray-700/50 bg-neutral-950">
            <div className="px-14 py-6">
                <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-8 gap-y-3">
                    <div className="flex flex-row items-center gap-1.5">
                        <Image src={SemicolonLogo} alt="Logo of Semicolon" width={14} height={14} />
                        <span className="text-gray-400 text-xs">Semicolon. All rights reserved @{new Date().getFullYear()}</span>
                    </div>
                    <Link href="https://github.com/waleedGeorgy/Semicolon" target="_blank" className="text-gray-400 hover:text-gray-300 transition-colors flex flex-row items-center gap-2">
                        <Image src={GitHubLogo} alt="GitHub Logo" width={14} height={14} />
                        <p className="flex flex-row items-center gap-1">
                            <span className="text-xs">GitHub</span>
                            <ExternalLink className="inline size-3" />
                        </p>
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer