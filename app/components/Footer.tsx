import { CodeSquare } from "lucide-react"
import Link from "next/link"

const Footer = () => {
    return (
        <footer className="relative border-t border-slate-800 mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-gray-400">
                        <CodeSquare className="size-6" />
                        <span>Developed for developers, by developers</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link href="/support" className="text-gray-400 hover:text-gray-300 transition-colors">
                            Support
                        </Link>
                        <Link href="/privacy" className="text-gray-400 hover:text-gray-300 transition-colors">
                            Privacy
                        </Link>
                        <Link href="/terms" className="text-gray-400 hover:text-gray-300 transition-colors">
                            Terms
                        </Link>
                        <Link href="/terms" className="text-gray-400 hover:text-gray-300 transition-colors">
                            GitHub
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer