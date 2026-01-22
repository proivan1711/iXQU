"use client";

import {
  ArrowBigLeftDash,
  ArrowBigRightDash,
  Pause,
  Play,
  RotateCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePomodoro } from "@/contexts/PomodoroContext";

export default function TimerPlayControls() {
  const { isRunning, resume, pause, restart, skipBackward, skip } =
    usePomodoro();

  return (
    <div className="-mb-10 mt-10 border-border rounded-2xl px-3 py-2 sm:px-6 sm:py-4 md:px-9 md:py-6 border grid grid-cols-[1fr_5fr] md:grid-cols-[1fr_6fr] justify-center items-center">
      <Button size="icon-xl" onClick={() => restart()}>
        <RotateCw />
      </Button>
      <div className="flex w-full justify-center items-center gap-2 md:gap-4">
        <Button size="icon-xl" onClick={skipBackward}>
          <ArrowBigLeftDash />
        </Button>
        <Button
          size="icon-4xl"
          className="rounded-full"
          onClick={isRunning ? pause : resume}
        >
          {isRunning ? <Pause /> : <Play />}
        </Button>
        <Button size="icon-xl" onClick={skip}>
          <ArrowBigRightDash />
        </Button>
      </div>
    </div>
  );
}
