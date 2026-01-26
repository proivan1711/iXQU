"use client";

import {Home} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function ErrorPage() {
  return (
    <div className="flex flex-col justify-center items-center h-dvh">
      <p className="font-bold text-[6rem] sm:text-[8rem] md:text-[11rem] lg:text-[15rem]">
        Ooops
      </p>
      <p className="mt-8 md:mt-2 text-xl md:text-xl lg:text-2xl font-semibold">
        Looks like something went wrong.
      </p>
      <Button
        asChild
        className="mt-30 flex justify-center items-center"
        size="2xl"
      >
        <Link href="/">
          <Home className="size-4 md:size-5.5 lg:size-6" />
          <span className="text-md md:text-xl lg:text-2xl">Go home</span>
        </Link>
      </Button>
    </div>
  );
}
