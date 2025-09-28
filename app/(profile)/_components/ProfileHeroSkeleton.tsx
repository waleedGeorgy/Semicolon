function ProfileHeroSkeleton() {
  return (
    <div className="relative mb-8 bg-[#1b1b27] rounded-2xl p-8 border border-gray-700/50 overflow-hidden">
      <div className="relative flex items-center gap-6">
        {/* Avatar skeleton */}
        <div className="size-24 rounded-full bg-gray-800 animate-pulse" />
        {/* User info skeleton */}
        <div className="space-y-3">
          <div className="flex flex-row items-center gap-3">
            <div className="h-10 w-48 bg-gray-800 rounded animate-pulse" />
            <div className="h-7 w-24 bg-gray-800 rounded-full animate-pulse" />
          </div>
          <div className="flex flex-row items-center gap-3">
            <div className="h-5 w-40 bg-gray-800 rounded-full animate-pulse" />
            <span className="text-lg text-gray-400">|</span>
            <div className="h-5 w-40 bg-gray-800 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Stats cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="group relative px-5 py-4 rounded-xl bg-gray-800 border border-gray-700/50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br opacity-5" />
            <div className="relative space-y-4">
              {/* Stat card header skeleton */}
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="h-8 w-16 bg-[#1b1b27] rounded animate-pulse" />
                  <div className="h-4 w-32 bg-[#1b1b27] rounded animate-pulse" />
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#1b1b27] animate-pulse" />
              </div>
              {/* Stat card footer skeleton */}
              <div className="pt-4 border-t border-gray-700/50 flex items-center gap-1.5">
                <div className="h-4 w-4 bg-[#1b1b27] rounded animate-pulse" />
                <div className="h-4 w-20 bg-[#1b1b27] rounded animate-pulse" />
                <div className="h-4 w-16 bg-[#1b1b27] rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileHeroSkeleton;
