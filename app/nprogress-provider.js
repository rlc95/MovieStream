"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Optional: customize NProgress
NProgress.configure({ showSpinner: false });

export default function NProgressProvider() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    router.events?.on("routeChangeStart", handleStart);
    router.events?.on("routeChangeComplete", handleStop);
    router.events?.on("routeChangeError", handleStop);

    // For usePathname in App Router
    handleStart();
    const timeout = setTimeout(() => {
      handleStop();
    }, 300); // fake delay to show loader

    return () => {
      clearTimeout(timeout);
      router.events?.off("routeChangeStart", handleStart);
      router.events?.off("routeChangeComplete", handleStop);
      router.events?.off("routeChangeError", handleStop);
    };
  }, [pathname]);

  return null;
}
