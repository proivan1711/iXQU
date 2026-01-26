"use client";

import { usePomodoro } from "@/contexts/PomodoroContext";

export default function Clock() {
  const { seconds, minutes, hours } = usePomodoro();

  return (
    <h1
      className={`font-extrabold tabular-nums tracking-tighter ${hours ? "text-[5rem]" : "text-[7rem]"} sm:text-[9rem] md:text-[10rem] lg:text-[13rem] xl:text-[15rem] text-foreground text-balance flex justify-center items-center gap-1 sm:gap-2 md:gap-3`}
    >
      {Boolean(hours) && <span>{hours}</span>}
      {Boolean(hours) && <span>:</span>}
      <span>{minutes.toString().padStart(2, "0")}</span>
      <span>:</span>
      <span>{seconds.toString().padStart(2, "0")}</span>
    </h1>
  );
}
