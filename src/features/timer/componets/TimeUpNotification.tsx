import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { Mode } from "@/contexts/PomodoroContext";
import { TIMER_NOTIFICATION_ID } from "@/features/timer/config";

export default function TimeUpNotification({
  restart,
  mode,
}: {
  restart: (optMode?: Mode) => void;
  mode: Mode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-balance text-center text-3xl font-bold font-mono min-[600px]:ml-8">
        Time is up!
      </h1>
      <div className="flex justify-between items-end gap-8">
        <Button
          onClick={() => {
            toast.dismiss(TIMER_NOTIFICATION_ID);
          }}
          variant="ghost"
        >
          Exit
        </Button>
        <div className="flex flex-col gap-4">
          <Button
            onClick={() => {
              restart(mode === "pomodoro" ? "shortBreak" : "shortBreak");
              toast.dismiss(TIMER_NOTIFICATION_ID);
            }}
            variant="outline"
          >
            {mode === "pomodoro"
              ? "Take short break"
              : "Take another short break"}
          </Button>
          <Button
            onClick={() => {
              restart(mode === "pomodoro" ? "longBreak" : "pomodoro");
              toast.dismiss(TIMER_NOTIFICATION_ID);
            }}
          >
            {mode === "pomodoro" ? "Take long break" : "Start new pomodoro"}
          </Button>
        </div>
      </div>
    </div>
  );
}
