"use client";

import { Flame } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import getPomodoroStreaks from "@/features/analytics/services/pomodoroStreaks";

export default function Streak() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  });

  const streak = isMounted ? getPomodoroStreaks() : 0;

  return (
    <Card className="md:max-w-fit mb-10 flex-row justify-start gap-20 items-center p-10">
      <Flame
        size={110}
        className={streak === 0 ? "stroke-foreground" : "stroke-primary"}
      />
      <span className="">
        <span className="text-8xl font-mono font-bold">{streak}</span>
        <span className="font-mono font-bold text-3xl ml-4">days</span>
      </span>
    </Card>
  );
}
