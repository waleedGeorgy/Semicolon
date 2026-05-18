"use client";
import { useEffect, useState } from "react";
import { Show, UserButton, useUser } from "@clerk/nextjs";
import { User2 } from "lucide-react";
import LoginButton from "./LoginButton";
import useMounted from "../hooks/useMounted";

const ProfileButton = () => {
  const { isLoaded } = useUser();
  const isMounted = useMounted();

  const [clerkError, setClerkError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const maxRetries = 3

  useEffect(() => {
    if (isLoaded && clerkError) {
      setClerkError(false)
    }
  }, [isLoaded, clerkError]);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (
        event.error?.message?.includes('Clerk') ||
        event.error?.message?.includes('failed_to_load_clerk_ui')
      ) {
        console.warn('Clerk error detected:', event.error.message)
        setClerkError(true)

        if (retryCount < maxRetries) {
          setTimeout(() => {
            window.location.reload()
          }, 2000 * (retryCount + 1))
          setRetryCount(prev => prev + 1)
        }
      }
    }

    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [retryCount])

  if (!isMounted || !isLoaded) {
    return (
      <div className="size-7 rounded-full bg-gray-700 animate-pulse ring-1 ring-gray-600" />
    )
  }

  if (clerkError && retryCount < maxRetries) {
    return (
      <button
        onClick={() => {
          setRetryCount(0)
          window.location.reload()
        }}
        className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 
                   text-red-400 text-sm hover:bg-red-500/20 transition-colors"
      >
        Retry
      </button>
    )
  }

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