"use client"
import Link from "next/link"
import Image from "next/image"
import { Show, SignInButton } from "@clerk/nextjs"
import { Code2, LogIn, Terminal } from "lucide-react"
import ProfileButton from "./ProfileButton"
import GoProButton from "./GoProButton"
import SemicolonLogo from "@/public/semicolon.png"

const SnippetsHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#1b1b27]/60 backdrop-blur-lg border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto p-3">
        <div className="relative flex flex-wrap items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-1.5 group relative">
            <Image src={SemicolonLogo} alt="Semicolon Logo" width={24} height={24} className="group-hover:rotate-0 -rotate-45 transition-transform duration-500" />
            <span className="text-2xl bg-linear-to-r from-indigo-400 to-blue-400 text-transparent bg-clip-text font-mono hover:brightness-125 transition-all duration-500">
              Semicolon
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/snippets"
              className="group flex items-center gap-2 px-3.5 sm:py-1 py-1.5 rounded-lg text-gray-300 border border-indigo-500/60 hover:border-indigo-400/60 hover:bg-linear-to-r hover:from-blue-500/10 hover:to-purple-500/10 transition-colors duration-300 overflow-hidden"
            >
              <Code2 className="size-4 z-10 group-hover:rotate-z-180 transition-transform duration-300 group-hover:text-white" />
              <span className="text-sm z-10 group-hover:text-white transition-colors hidden sm:inline">
                Snippets
              </span>
            </Link>
            <Link
              href="/"
              className="group flex items-center gap-2 px-3.5 sm:py-1 py-1.5 rounded-lg text-gray-300 border border-blue-500/60 hover:border-blue-400/60 hover:bg-linear-to-r hover:from-blue-500/10 hover:to-purple-500/10 transition-colors duration-300 overflow-hidden"
            >
              <Terminal className="size-4 group-hover:text-white" />
              <span className="text-sm group-hover:text-white transition-colors hidden sm:inline">
                Editor
              </span>
            </Link>
            <Show when='signed-in'>
              <GoProButton />
              <ProfileButton />
            </Show>
            <Show when='signed-out'>
              <SignInButton mode="modal">
                <button className="px-1 rounded-lg flex flex-row items-center gap-2 text-gray-300 transition-colors duration-300 overflow-hidden cursor-pointer group">
                  <LogIn className="size-4 group-hover:text-white transition-colors duration-300" />
                  <span className="text-sm group-hover:text-white transition-colors duration-300">Sign In</span>
                </button>
              </SignInButton>
            </Show>
          </div>
        </div>
      </div>
    </header>
  )
}

export default SnippetsHeader