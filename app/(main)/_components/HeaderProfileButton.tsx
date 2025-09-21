"use client";
import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { User2 } from "lucide-react";

const HeaderProfileButton = () => {
  return (
    <>
      <UserButton>
        <UserButton.MenuItems>
          <UserButton.Link
            label="Profile"
            labelIcon={<User2 className="size-4" />}
            href="/profile"
          />
        </UserButton.MenuItems>
      </UserButton>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </>
  );
};

export default HeaderProfileButton;