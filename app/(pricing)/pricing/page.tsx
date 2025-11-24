import { SignedIn, SignedOut } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server"
import { Star } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import ProPlanActivatedPage from "../_components/ProPlanActivatedPage";
import FeatureCategory from "../_components/FeatureCategory";
import FeatureItem from "../_components/FeatureItem";
import UpgradeButton from "../_components/UpgradeButton";
import Header from "@/app/components/Header";
import LoginButton from "@/app/components/LoginButton";

const PricingPage = async () => {
    const user = await currentUser();

    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    const convexUser = await convex.query(api.users.getUser, { userId: user?.id || "" });

    const FEATURES = {
        development: [
            "Access to all coding languages",
            "Access to every available theme",
            "...more features down the line",
        ]
    };

    if (convexUser?.isPro) return <ProPlanActivatedPage />

    return (
        <main className="relative min-h-screen bg-[#0e0e13] font-sans">
            <Header />
            <div className="relative py-14 px-4">
                <div className="max-w-5xl mx-auto">
                    {/* Hero */}
                    <div className="text-center mb-8">
                        <div className="relative inline-block">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 blur-2xl opacity-20 rounded-xl" />
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-roboto-condensed mb-4 text-gray-300">
                                Become A Pro Member
                            </h1>
                        </div>
                        <p className="text-xl text-gray-300">
                            Elevate Your Coding Experience Today With <span className="font-bold">Semicolon</span> Pro
                        </p>
                    </div>
                    {/* Pricing card */}
                    <div className="relative max-w-2xl mx-auto">
                        <div className="absolute -inset-px bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-25" />
                        <div className="relative bg-[#1b1b27] rounded-2xl">
                            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                            <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
                            <div className="relative p-8 md:p-10">
                                {/* Pricing card header */}
                                <div className="text-center mb-8 space-y-3">
                                    <div className="inline-flex p-3.5 rounded-xl bg-yellow-500/10">
                                        <Star className="size-7 text-yellow-500 animate-wiggle" />
                                    </div>
                                    <h2 className="text-4xl font-light font-roboto-condensed text-gray-300">Lifetime Pro Access</h2>
                                    <div className="flex items-baseline justify-center gap-2">
                                        <span className="text-lg text-gray-400 font-semibold">A one-time</span>
                                        <span className="text-5xl font-semibold text-indigo-500">$14.99</span>
                                        <span className="text-lg text-gray-400">payment</span>
                                    </div>
                                </div>
                                {/* Features list */}
                                <div className="flex flex-col items-center mb-10">
                                    <FeatureCategory label="Features">
                                        {FEATURES.development.map((feature, idx) => (
                                            <FeatureItem key={idx}>{feature}</FeatureItem>
                                        ))}
                                    </FeatureCategory>
                                </div>
                                {/* CTA */}
                                <div className="flex justify-center">
                                    <SignedIn>
                                        <UpgradeButton userId={user!.id} userEmail={user?.emailAddresses[0].emailAddress as string} />
                                    </SignedIn>
                                    <SignedOut>
                                        <LoginButton />
                                    </SignedOut>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default PricingPage