import { Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="justify-center items-center flex h-dvh w-full flex-col text-foreground">
      <p className="font-mono font-black text-[10rem] sm:text-[13rem] md:text-[16rem] lg:text-[20rem]">
        404
      </p>
      <p className="-mt-8 md:-mt-15 text-md md:text-xl lg:text-2xl font-semibold">
        Looks like this page took a break
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
