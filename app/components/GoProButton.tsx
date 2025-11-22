"use client"
import Link from "next/link";
import { Star } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";

const GoProButton = () => {
    const { user } = useUser();

    const convexUser = useQuery(api.users.getUser, {
        userId: user?.id || ""
    });

    if (convexUser?.isPro) {
        return null;
    } else {
        return (
            <Link href="/pricing" className="flex group items-center gap-2 px-3.5 py-1 rounded-md border border-amber-400/20 hover:border-amber-400/60 bg-gradient-to-r from-amber-400/10 to-orange-400/10 hover:from-amber-400/20 hover:to-orange-400/20 transition-colors duration-300 font-roboto-condensed">
                <Star className="size-4 text-amber-400 group-hover:text-amber-300" />
                <span className="text-sm font-medium text-amber-400/90 group-hover:text-amber-300 hidden lg:inline-block">
                    Go Pro
                </span>
            </Link>
        )
    }
}

export default GoProButton