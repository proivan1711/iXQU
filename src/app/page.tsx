import {PomodoroContextProvider} from "@/contexts/PomodoroContext";
import Clock from "@/features/timer/componets/Clock";
import NotificationPrompt from "@/features/timer/componets/NotificationPrompt";
import TimerIslandNav from "@/features/timer/componets/TimerIslandNav";
import TimerPlayControls from "@/features/timer/componets/TimerPlayControls";

export default function PomodoroTimer() {
  return (
    <div className="w-full h-dvh bg-background flex justify-center items-center flex-col">
      <PomodoroContextProvider>
        <TimerIslandNav />
        <Clock />
        <TimerPlayControls />
        <NotificationPrompt />
      </PomodoroContextProvider>
    </div>
  );
}
