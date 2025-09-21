import { api } from "@/convex/_generated/api";
import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { Code2, CodeSquare, Sparkles, Star } from "lucide-react";
import { SignedIn } from "@clerk/nextjs";
import RunButton from "./RunButton";
import HeaderProfileButton from "./HeaderProfileButton";
import Link from "next/link";
import ThemePicker from "./ThemePicker";
import LanguagePicker from "./LanguagePicker";

async function Header() {
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    const user = await currentUser();

    const convexUser = await convex.query(api.users.getUser, {
        userId: user?.id || ""
    });

    return (
        <div className="relative z-10">
            <div
                className="flex items-center lg:justify-between justify-center bg-gray-950/75 backdrop-blur-xl p-5 rounded-lg"
            >
                <div className="hidden lg:flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2 group relative">
                        <div
                            className="absolute -inset-2 bg-gradient-to-r from-cyan-400/30 to-purple-400/30 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 blur-xl"
                        />
                        <div>
                            <CodeSquare className="size-7 text-cyan-500 transform -rotate-190 group-hover:rotate-0 transition-transform duration-500" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-3xl bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text font-roboto-condensed">
                                Semicolon
                            </span>
                        </div>
                    </Link>
                    <nav>
                        <Link
                            href="/snippets"
                            className="relative group flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-800 transition-all duration-300"
                        >
                            <div
                                className="absolute -inset-0.5 -z-10 bg-gradient-to-r from-cyan-400/80 to-purple-400/80 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                            />
                            <Code2 className="size-4 relative z-10 group-hover:rotate-z-180 transition-transform" />
                            <span
                                className="text-sm font-semibold relative z-10 transition-colors"
                            >
                                Code Snippets
                            </span>
                        </Link>
                    </nav>
                </div>
                <nav className="flex items-center gap-4">
                    {!convexUser?.isPro && (
                        <Link
                            href="/pricing"
                            className="flex group items-center gap-2 px-3 py-1.5 rounded-lg border border-amber-400/20 hover:border-amber-400/60 bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 transition-all duration-300"
                        >
                            <Star className="size-4 text-amber-400 group-hover:text-amber-300 group-hover:scale-115" />
                            <span className="text-sm font-medium text-amber-400/90 group-hover:text-amber-300">
                                Go Pro
                            </span>
                        </Link>
                    )}
                    <ThemePicker />
                    <LanguagePicker hasAccess={Boolean(convexUser?.isPro)} />
                    <SignedIn>
                        <RunButton />
                    </SignedIn>
                    <HeaderProfileButton />
                </nav>
            </div>
        </div>
    );
}
export default Header;