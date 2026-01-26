"use client";

import {Flame} from "lucide-react";
import {useEffect, useState} from "react";
import {Card, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import getPomodoroStreaks from "@/features/analytics/services/pomodoroStreaks";

export default function Streak() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  });

  const streak = isMounted ? getPomodoroStreaks() : 0;

  return (
    <Card className="col-span-full sm:col-span-1">
      <CardHeader>
        <CardDescription>Streak</CardDescription>
        <CardTitle className="text-6xl font-semibold mt-2 flex items-center gap-4 md:gap-6">
          <Flame
            className={`size-13 md:size-14 ${streak ? "stroke-primary" : "stroke-foreground"}`}
          />
          <span>{streak}</span>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
