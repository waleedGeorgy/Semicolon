import { SignInButton } from "@clerk/nextjs";
import { LogIn } from "lucide-react";

function LoginButton() {
    return (
        <SignInButton mode="modal">
            <button
                className="group flex items-center gap-2 rounded-md text-gray-300 hover:text-gray-100 cursor-pointer text-sm">
                <LogIn className="size-4" />
                <span>Sign In</span>
            </button>
        </SignInButton>
    );
}
export default LoginButton;
