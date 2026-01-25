"use client";

import {Home} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function ErrorPage() {
  return (
    <div className="flex flex-col justify-center items-center h-dvh">
      <h1 className="text-[25rem] font-bold">Ooops</h1>
      <span className="font-bold text-balance text-3xl">
        Something went wrong...
      </span>
      <Button asChild size="2xl" className="mt-40">
        <Link href="/">
          <Home className="size-5.5" />
          <span className="text-xl">Go home</span>
        </Link>
      </Button>
    </div>
  );
}
