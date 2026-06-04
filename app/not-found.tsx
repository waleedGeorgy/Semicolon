"use client"
import Link from "next/link"

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-[#0e0e13] font-sans text-gray-300 flex flex-col items-center justify-center p-4 text-center">
            <h1 className="text-4xl font-bold mb-4">ERROR 404</h1>
            <p className="text-lg mb-8">The resource you are looking for is either deleted or modified.</p>
            <div className="flex items-center gap-3">
                <Link href="/" className="text-indigo-400 hover:underline">Return to Code Editor</Link>
                <span className="text-gray-500">|</span>
                <Link href="/snippets" className="text-indigo-400 hover:underline">Browse Snippets</Link>
            </div>
        </div>
    )
}

export default NotFoundPage