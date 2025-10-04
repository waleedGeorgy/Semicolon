import Header from "@/app/components/Header"
import { ArrowRight, Star } from "lucide-react"
import Link from "next/link"

const ProPlanActivatedPage = () => {
  return (
    <div className="bg-[#0e0e13] font-sans">
      <Header />
      <div className="px-4 h-[80vh] flex items-center justify-center">
        <div className="min-w-xl mx-auto text-center">
          <div className="rounded-xl p-7 bg-[#1b1b27] border border-gray-700/50">
            <div className="space-y-6">
              <div className="inline-flex p-3 rounded-2xl bg-yellow-500/10">
                <Star className="size-7 text-yellow-400" />
              </div>
              <div className="flex flex-col gap-2 items-center justify-center">
                <h1 className="text-4xl font-roboto-condensed">Pro Plan Is Active</h1>
                <h2 className="text-gray-400">Enjoy the full capabilities of <span className="font-semibold">Semicolon</span>!</h2>
              </div>
              <hr className="text-gray-700/80" />
              <div className="flex flex-row flex-wrap gap-2.5 items-center justify-center">
                <Link href="/" className="inline-flex items-center text-sm justify-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 rounded-lg transition-all duration-300 group">
                  <span>Open Editor</span>
                  <ArrowRight className="size-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>
                <h3>Or</h3>
                <Link href="/snippets" className="inline-flex items-center text-sm justify-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 rounded-lg transition-all duration-300 group">
                  <span>View Snippets</span>
                  <ArrowRight className="size-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProPlanActivatedPage