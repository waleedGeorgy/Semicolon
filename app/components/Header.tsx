import Link from "next/link"
import { SignedOut } from "@clerk/nextjs"
import { Code2, CodeSquare, Star, Terminal } from "lucide-react"
import ProfileButton from "./ProfileButton"

const Header = () => {
  return (
    <div className="sticky top-0 z-50 w-full bg-[#1b1b27]/85 backdrop-blur border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 py-3.5">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4 lg:gap-8">
            <Link href="/" className="flex items-center gap-2 group relative">
              <div
                className="absolute -inset-2 bg-gradient-to-r from-blue-400/25 via-sky-400/25 to-cyan-400/25 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-xl"
              />
              <CodeSquare className="size-7 text-blue-400 transform -rotate-190 group-hover:rotate-0 transition-transform duration-500" />
              <span className="text-3xl bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400 text-transparent bg-clip-text font-roboto-condensed">
                Semicolon
              </span>
            </Link>
            <Link
              href="/snippets"
              className="group flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-gray-300 border border-indigo-500/60 hover:border-indigo-400/60 hover:bg-indigo-500/50 transition-colors duration-300 shadow-lg overflow-hidden"
            >
              <Code2 className="size-4 z-10 group-hover:rotate-z-180 transition-transform duration-300 group-hover:text-white" />
              <span className="text-sm z-10 group-hover:text-white transition-colors">
                Snippets
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="group flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-gray-300 border border-blue-500/60 hover:border-blue-400/60 hover:bg-blue-500/50 transition-colors duration-300 shadow-lg overflow-hidden"
            >
              <Terminal className="size-4 group-hover:text-white" />
              <span className="text-sm group-hover:text-white transition-colors">
                Back to editor
              </span>
            </Link>
            <SignedOut>
              <Link
                href="/pricing"
                className="flex group items-center gap-2 px-3.5 py-1.5 rounded-lg border border-amber-400/20 hover:border-amber-400/60 bg-gradient-to-r from-amber-400/10 to-orange-400/10 hover:from-amber-400/20 hover:to-orange-400/20 transition-colors duration-300"
              >
                <Star className="size-4 text-amber-400 group-hover:text-amber-300" />
                <span className="text-sm font-medium text-amber-400/90 group-hover:text-amber-300">
                  Go Pro
                </span>
              </Link>
            </SignedOut>
            <ProfileButton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header