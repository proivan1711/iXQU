"use client";

import {BriefcaseBusiness, Coffee, Palmtree} from "lucide-react";
import {Button} from "@/components/ui/button";
import {usePomodoro} from "@/contexts/PomodoroContext";

export default function TimerIslandNav() {
  const { mode, restart } = usePomodoro();

  return (
    <div className="p-2 md:p-4 border-border border rounded-3xl flex absolute top-1/8 gap-1 md:gap-2">
      <Button
        size={"2xl"}
        variant={mode === "pomodoro" ? "default" : "outline"}
        onClick={() => {
          if (mode === "pomodoro") return;
          restart("pomodoro");
        }}
      >
        <BriefcaseBusiness />
        <span>Work</span>
      </Button>
      <Button
        size={"2xl"}
        variant={mode === "shortBreak" ? "default" : "outline"}
        onClick={() => {
          if (mode === "shortBreak") return;
          restart("shortBreak");
        }}
      >
        <Coffee />
        <span>Short break</span>
      </Button>
      <Button
        size={"2xl"}
        variant={mode === "longBreak" ? "default" : "outline"}
        onClick={() => {
          if (mode === "longBreak") return;
          restart("longBreak");
        }}
      >
        <Palmtree />
        <span>Long break</span>
      </Button>
    </div>
  );
}
