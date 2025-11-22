"use client"
import Link from "next/link"

const ErrorPage = () => {
    return (
        <div className="min-h-screen bg-[#0e0e13] font-sans text-gray-300 flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold mb-4">Something went wrong.</h1>
            <p className="text-lg mb-8">We're sorry for the inconvenience. Please try refreshing the page or come back later.</p>
            <div className="flex items-center gap-3">
                <Link href="/" className="text-indigo-400 hover:underline">Return to Code Editor</Link>
                <span className="text-gray-500">|</span>
                <Link href="/snippets" className="text-indigo-400 hover:underline">Browse Snippets</Link>
            </div>

        </div>
    )
}

export default ErrorPage