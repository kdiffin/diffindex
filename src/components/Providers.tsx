"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        delay={0}
        color="#fffd00"
        options={{ showSpinner: false }}
      />
    </>
  );
};

export default Providers;
