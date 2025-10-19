import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Code2, Star, LogIn } from "lucide-react";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import RunButton from "./RunButton";
import ThemePicker from "./ThemePicker";
import LanguagePicker from "./LanguagePicker";
import ProfileButton from "../../components/ProfileButton";
import Image from "next/image";
import SemicolonLogo from "@/public/semicolon.png";

async function HeaderWithCodeButtons() {
    // TODO: Change the logo
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    const user = await currentUser();

    const convexUser = await convex.query(api.users.getUser, {
        userId: user?.id || ""
    });

    return (
        <div className="mb-3">
            <div className="flex flex-wrap items-center lg:justify-between justify-center bg-[#1b1b27] px-5 py-3.5 rounded-lg gap-6">
                <div className="flex items-center gap-4 lg:gap-8">
                    <Link href="/" className="flex items-center gap-1.5 group relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/30 to-indigo-400/30 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-xl" />
                        <Image src={SemicolonLogo} alt="Semicolon Logo" width={28} height={28} className="group-hover:rotate-y-180 transition-transform duration-500" />
                        <span className="text-3xl bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text font-roboto-condensed hidden lg:inline-block">
                            Semicolon
                        </span>
                    </Link>
                    <Link
                        href="/snippets"
                        className="group flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-gray-300 border border-indigo-500/60 hover:border-indigo-400/60 hover:bg-indigo-500/50 transition-colors duration-300 shadow-lg overflow-hidden"
                    >
                        <Code2 className="size-4 z-10 group-hover:rotate-z-180 transition-all duration-300 group-hover:text-white" />
                        <span className="text-sm z-10 group-hover:text-white transition-colors hidden lg:inline-block">
                            Snippets
                        </span>
                    </Link>
                </div>
                <nav className="flex items-center gap-3">
                    <ThemePicker />
                    <LanguagePicker hasAccess={Boolean(convexUser?.isPro)} />
                    <SignedIn>
                        <RunButton />
                    </SignedIn>
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
                    <SignedIn>
                        <ProfileButton />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton>
                            <button className="px-3 py-1.5 rounded-lg flex flex-row items-center gap-2 text-gray-300 border border-indigo-500/60 hover:border-indigo-400/60 hover:bg-indigo-500/50 transition-colors duration-300 shadow-lg overflow-hidden cursor-pointer group">
                                <LogIn className="size-4 group-hover:text-white transition-colors duration-300" />
                                <span className="text-sm group-hover:text-white transition-colors duration-300">Sign In</span>
                            </button>
                        </SignInButton>
                    </SignedOut>
                </nav>
            </div>
        </div>
    );
}
export default HeaderWithCodeButtons;