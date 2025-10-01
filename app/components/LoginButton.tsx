import { SignInButton } from "@clerk/nextjs";
import { LogIn } from "lucide-react";

function LoginButton() {
    return (
        <SignInButton mode="modal">
            <button
                className="group flex items-center gap-2 px-4 py-1.5 rounded-lg text-gray-300 hover:text-gray-100 border border-indigo-500/60 hover:border-indigo-400/60 hover:bg-indigo-500/60 transition-colors duration-300 cursor-pointer">
                <LogIn className="size-4" />
                <span>Sign In</span>
            </button>
        </SignInButton>
    );
}
export default LoginButton;
