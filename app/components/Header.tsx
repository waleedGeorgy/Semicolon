"use client"
import Link from "next/link"
import { Code2, Terminal } from "lucide-react"
import ProfileButton from "./ProfileButton"
import GoProButton from "./GoProButton"
import Image from "next/image"
import SemicolonLogo from "@/public/semicolon.png"

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#1b1b27]/80 backdrop-blur border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 py-3.5">
        <div className="relative flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group relative">
            <div
              className="absolute -inset-2 bg-gradient-to-r from-blue-400/25 to-indigo-400/25 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-xl"
            />
            <Image src={SemicolonLogo} alt="Semicolon Logo" width={28} height={28} className="group-hover:rotate-y-180 transition-transform duration-500" />
            <span className="text-3xl bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text font-roboto-condensed">
              Semicolon
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/snippets"
              className="group flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-gray-300 border border-indigo-500/60 hover:border-indigo-400/60 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 transition-colors duration-300 shadow-lg overflow-hidden"
            >
              <Code2 className="size-4 z-10 group-hover:rotate-z-180 transition-transform duration-300 group-hover:text-white" />
              <span className="text-sm z-10 group-hover:text-white transition-colors">
                Snippets
              </span>
            </Link>
            <Link
              href="/"
              className="group flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-gray-300 border border-blue-500/60 hover:border-blue-400/60 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 transition-colors duration-300 shadow-lg overflow-hidden"
            >
              <Terminal className="size-4 group-hover:text-white" />
              <span className="text-sm group-hover:text-white transition-colors">
                Back to editor
              </span>
            </Link>
            <GoProButton />
            <ProfileButton />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header