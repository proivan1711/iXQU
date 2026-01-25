import { Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="justify-center items-center flex h-dvh w-full flex-col text-foreground">
      <p className="font-mono font-black text-[20rem]">404</p>
      <p className="-mt-15 text-xl font-semibold">
        The page you're looking for isn't found.
      </p>
      <Button asChild className="mt-30" size="2xl">
        <Link href="/">
          <Home className="size-5.5" />
          <span className="text-xl">Go home</span>
        </Link>
      </Button>
    </div>
  );
}
