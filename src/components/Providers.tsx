"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Toaster } from "./ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ProgressBar
        height="4px"
        delay={500}
        color="#fffd00"
        options={{ showSpinner: false }}
      />
      <Toaster />
    </QueryClientProvider>
  );
};

export default Providers;
