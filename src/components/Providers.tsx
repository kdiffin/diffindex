"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Toaster } from "./ui/toaster";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        delay={500}
        color="#fffd00"
        options={{ showSpinner: false }}
      />
      <Toaster />
    </>
  );
};

export default Providers;
