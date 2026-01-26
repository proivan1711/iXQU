"use client";

import { useEffect, useState } from "react";
import AnalyticsPomodoroTimePerDayChart from "@/features/analytics/components/AnalyticsPomodoroTimePerDayChart";
import Streak from "@/features/analytics/components/Streak";
import TotalPomodorosCard from "@/features/analytics/components/TotalPomodorosCard";
import TotalTimePomodoro from "@/features/analytics/components/TotalTimePomodoro";
import { getData } from "@/features/analytics/services/analyticsDatabase";

export default function Analytics() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  });

  const { pomodoros } = getData();
  const totalHours = Math.floor(
    pomodoros.reduce(
      (acc, pomodoro) => acc + pomodoro.totalDuration / 1000 / 60,
      0,
    ),
  );

  return (
    <div className="p-10 md:p-20">
      <h1 className="text-7xl md:text-9xl text-balance font-semibold text-center mb-20">
        Analytics
      </h1>
      <div className="grid gap-7 grid-cols-2 sm:grid-cols-[1fr_1fr_1fr] sm:grid-rows-[1fr_auto] sm:gap-10">
        <Streak />
        <TotalPomodorosCard
          totalPomodorosCount={isMounted ? pomodoros.length : 0}
        />
        <TotalTimePomodoro totalHours={isMounted ? totalHours : 0} />
        <AnalyticsPomodoroTimePerDayChart />
      </div>
    </div>
  );
}
