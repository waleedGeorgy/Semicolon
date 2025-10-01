import Link from "next/link"
import { CodeSquare } from "lucide-react"

const Footer = () => {
    return (
        <footer className="relative border-t border-gray-700/50 mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-7">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-gray-400">
                        <CodeSquare className="size-5" />
                        <span className="text-sm">Semicolon. All rights reserved @{new Date().getFullYear()}</span>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                        <Link href="/support" className="text-gray-400 hover:text-gray-300 transition-colors">
                            Support
                        </Link>
                        <Link href="/privacy" className="text-gray-400 hover:text-gray-300 transition-colors">
                            Privacy
                        </Link>
                        <Link href="/terms" className="text-gray-400 hover:text-gray-300 transition-colors">
                            Terms
                        </Link>
                        <Link href="/" className="text-gray-400 hover:text-gray-300 transition-colors">
                            GitHub
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer