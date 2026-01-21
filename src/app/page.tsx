import Clock from "@/features/timer/componets/Clock";
import TimerIslandNav from "@/features/timer/componets/TimerIslandNav";
import TimerPlayControls from "@/features/timer/componets/TimerPlayControls";

export default function PomodoroTimer() {
  return (
    <div className="w-full h-dvh bg-background flex justify-center items-center flex-col">
      <TimerIslandNav />
      <Clock />
      <TimerPlayControls />
    </div>
  );
}
