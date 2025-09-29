import { useEffect, useState } from "react";

export const useCurrentPath = () => {
    const [path, setPath] = useState(window.location.pathname || '/');

    useEffect(() => {
        const handlePopState = () => {
            setPath(window.location.pathname);
        };

    window.addEventListener("popstate", handlePopState);
    return () => {
        window.removeEventListener("popstate", handlePopState);
        };
    }, []);

    return path;
}
