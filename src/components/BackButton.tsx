"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

function BackButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant={"link"}
      className=" px-0  text-base text-muted-foreground"
    >
      <ChevronLeft size={16} className="text-background/60 " />
      Back
    </Button>
  );
}

export default BackButton;
