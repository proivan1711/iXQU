import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <Spinner className="size-20" />
    </div>
  );
}
