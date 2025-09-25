import { api } from "@/convex/_generated/api";
import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { Code2, CodeSquare, Star } from "lucide-react";
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
        <div className="mb-3">
            <div
                className="flex flex-wrap items-center lg:justify-between justify-center bg-[#1b1b27] px-5 py-3.5 rounded-lg gap-6"
            >
                <div className="flex items-center gap-4 lg:gap-8">
                    <Link href="/" className="flex items-center gap-2 group relative">
                        <div
                            className="absolute -inset-2 bg-gradient-to-r from-blue-400/25 via-sky-400/25 to-cyan-400/25 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-xl"
                        />
                        <CodeSquare className="size-7 text-blue-400 transform -rotate-190 group-hover:rotate-0 transition-transform duration-500" />
                        <span className="text-3xl bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400 text-transparent bg-clip-text font-roboto-condensed hidden lg:inline-block">
                            Semicolon
                        </span>
                    </Link>
                    <nav className="flex flex-row items-center gap-3">
                        <Link
                            href="/snippets"
                            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-gray-300 bg-gray-900 border border-blue-900 hover:border-blue-400/40 hover:bg-gradient-to-r hover:from-blue-400/40 hover:to-purple-400/40 transition-colors duration-300 shadow-lg overflow-hidden"
                        >
                            <Code2 className="size-4 z-10 group-hover:rotate-z-180 transition-transform duration-300 group-hover:text-white" />
                            <span className="text-sm z-10 group-hover:text-white transition-colors hidden lg:inline-block">
                                Snippets
                            </span>
                        </Link>
                        {!convexUser?.isPro && (
                            <Link
                                href="/pricing"
                                className="flex group items-center gap-2 px-3.5 py-1.5 rounded-lg border border-amber-400/20 hover:border-amber-400/60 bg-gradient-to-r from-amber-400/10 to-orange-400/10 hover:from-amber-400/20 hover:to-orange-400/20 transition-colors duration-300"
                            >
                                <Star className="size-4 text-amber-400 group-hover:text-amber-300" />
                                <span className="text-sm font-medium text-amber-400/90 group-hover:text-amber-300 hidden lg:inline-block">
                                    Go Pro
                                </span>
                            </Link>
                        )}
                    </nav>
                </div>
                <nav className="flex items-center gap-3">
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