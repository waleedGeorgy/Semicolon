"use client";
import { Show, UserButton } from "@clerk/nextjs";
import { User2 } from "lucide-react";
import LoginButton from "./LoginButton";

const ProfileButton = () => {
  return (
    <>
      <UserButton appearance={{
        elements: {
          avatarBox: {
            width: "1.75rem",
            height: "1.75rem",
          },
        },
        variables: {
          colorBackground: "#1b1b27"
        }
      }}>
        <UserButton.MenuItems>
          <UserButton.Link
            label="Profile"
            labelIcon={<User2 className="size-4" />}
            href="/profile"
          />
        </UserButton.MenuItems>
      </UserButton>
      <Show when='signed-out'>
        <LoginButton />
      </Show>
    </>
  );
};

export default ProfileButton;