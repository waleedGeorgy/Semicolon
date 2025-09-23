"use client"
import { useEffect, useState } from "react";

const useMounted = () => {
    const [mounted, isMounted] = useState(false);

    useEffect(() => {
        isMounted(true)
    }, []);

    return mounted;
}

export default useMounted