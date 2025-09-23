import { Play } from "lucide-react"

const RunButton = () => {
  return (
    <>
      <button className="flex flex-row items-center gap-1.5 border border-emerald-500/50 bg-emerald-400/20 px-3 py-1.5 rounded-lg cursor-pointer hover:border-emerald-400/50 hover:bg-emerald-400/25 transition-colors duration-300">
        <Play className="size-4 text-emerald-400/85" />
        <span className="text-sm">Run</span>
      </button>
    </>
  )
}

export default RunButton