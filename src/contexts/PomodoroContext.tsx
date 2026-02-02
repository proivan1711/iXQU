"use client";

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTimer } from "react-timer-hook";
import { toast } from "sonner";
import useSound from "use-sound";
import { savePomodoro } from "@/features/analytics/services/analyticsDatabase";
import { useSettings } from "@/features/settings/context/SettingsContext";
import TimeUpNotification from "@/features/timer/componets/TimeUpNotification";
import {
  ALARM_SOUND_ID,
  MIN_POMODORO_TIME_SAVE,
  TIMER_NOTIFICATION_ID,
} from "@/features/timer/config";

export type Mode = "pomodoro" | "shortBreak" | "longBreak";

const PomodoroContext = createContext<
  | {
      seconds: number;
      minutes: number;
      hours: number;
      totalMilliseconds: number;
      isRunning: boolean;
      start: () => void;
      pause: () => void;
      resume: () => void;
      restart: (optMode?: Mode) => void;
      skipBackward: () => void;
      skip: () => void;
      mode: Mode;
      setMode: Dispatch<SetStateAction<Mode>>;
      pomodoroSessionId: string;
    }
  | undefined
>(undefined);

export function PomodoroContextProvider({ children }: { children: ReactNode }) {
  const {
    pomodoroDuration,
    shortBreakDuration,
    longBreakDuration,
    skipDuration,
  } = useSettings();

  const pomodoroSession = useRef<string>(crypto.randomUUID());
  const [mode, setMode] = useState<Mode>("pomodoro");

  const [playAlarm, { stop: stopAlarm }] = useSound("/sounds/alarm.mp3", {
    id: ALARM_SOUND_ID,
    interrupt: true,
  });

  const modeDurations = useMemo(
    () => ({
      pomodoro: pomodoroDuration,
      shortBreak: shortBreakDuration,
      longBreak: longBreakDuration,
    }),
    [pomodoroDuration, shortBreakDuration, longBreakDuration],
  );

  const expiryTimestamp = new Date(Date.now() + modeDurations[mode]);

  const {
    minutes,
    seconds,
    hours,
    isRunning,
    start,
    pause,
    resume,
    restart: rawRestart,
    totalMilliseconds,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      if (mode === "pomodoro") {
        savePomodoro({
          id: pomodoroSession.current,
          goalTime: pomodoroDuration,
          totalTime: pomodoroDuration - totalMilliseconds,
        });
      }
      pomodoroSession.current = crypto.randomUUID();
    },
  });

  const saveStateRef = useRef({
    id: pomodoroSession.current,
    goalTime: pomodoroDuration,
    totalTime: pomodoroDuration - totalMilliseconds,
    mode,
  });
  const lastNotifiedSession = useRef<string | null>(null);

  const restart = useCallback(
    function restart(optMode: Mode = mode) {
      if (
        mode === "pomodoro" &&
        optMode !== mode &&
        saveStateRef.current.totalTime >= MIN_POMODORO_TIME_SAVE
      ) {
        savePomodoro({
          id: pomodoroSession.current,
          goalTime: saveStateRef.current.goalTime,
          totalTime:
            saveStateRef.current.goalTime - saveStateRef.current.totalTime,
        });
      }
      if (optMode === "pomodoro") pomodoroSession.current = crypto.randomUUID();

      if (optMode !== mode) setMode(optMode);

      rawRestart(new Date(Date.now() + modeDurations[optMode]));
    },
    [mode, rawRestart, modeDurations],
  );

  const skip = () =>
    totalMilliseconds &&
    rawRestart(
      new Date(
        totalMilliseconds + skipDuration <= modeDurations[mode]
          ? Date.now() + totalMilliseconds + skipDuration
          : Date.now() + modeDurations[mode],
      ),
      isRunning,
    );

  const skipBackward = () =>
    totalMilliseconds &&
    rawRestart(
      new Date(Math.abs(Date.now() + totalMilliseconds - skipDuration)),
      isRunning,
    );

  const handleVisibilityChange = useCallback(
    function handleVisibilityChange() {
      if (
        document.hidden &&
        mode === "pomodoro" &&
        pomodoroDuration - totalMilliseconds >= MIN_POMODORO_TIME_SAVE
      ) {
        savePomodoro({
          id: pomodoroSession.current,
          goalTime: pomodoroDuration,
          totalTime: pomodoroDuration - totalMilliseconds,
        });
      }
    },
    [pomodoroDuration, totalMilliseconds, mode],
  );

  const handlePomodoroInterval = useCallback(() => {
    const { id, totalTime, goalTime } = saveStateRef.current;
    if (mode === "pomodoro" && goalTime - totalTime >= MIN_POMODORO_TIME_SAVE) {
      savePomodoro({
        id,
        goalTime,
        totalTime,
      });
    }
  }, [mode]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: no need for mode dependency
  useEffect(() => {
    rawRestart(new Date(Date.now() + modeDurations[mode]));
  }, [
    pomodoroDuration,
    shortBreakDuration,
    longBreakDuration,
    rawRestart,
    modeDurations,
  ]);

  useEffect(() => {
    saveStateRef.current = {
      id: pomodoroSession.current,
      goalTime: pomodoroDuration,
      totalTime: pomodoroDuration - totalMilliseconds,
      mode,
    };
  });

  useEffect(() => {
    if (
      totalMilliseconds === 0 &&
      !(lastNotifiedSession.current === pomodoroSession.current)
    ) {
      lastNotifiedSession.current = pomodoroSession.current;
      const classes = ["blur-md", "pointer-events-none"];

      const main = document.querySelector("main");
      const sidebar = document.querySelector("[data-slot='sidebar']");

      document.body.classList.add("overflow-hidden");
      main?.classList.add(...classes);
      sidebar?.classList.add(...classes);

      toast.message(<TimeUpNotification mode={mode} restart={restart} />, {
        position: "top-center",
        id: TIMER_NOTIFICATION_ID,
        duration: 100000 * 1000,
        onDismiss() {
          stopAlarm();
          document.body.classList.remove("overflow-hidden");
          main?.classList.remove(...classes);
          sidebar?.classList.remove(...classes);
        },
        onAutoClose() {
          restart(mode === "pomodoro" ? "shortBreak" : "pomodoro");
        },
      });
      playAlarm();
    }
  }, [mode, playAlarm, restart, stopAlarm, totalMilliseconds]);

  useEffect(() => {
    const timerId = window.setInterval(handlePomodoroInterval, 60 * 1000);

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(timerId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [handleVisibilityChange, handlePomodoroInterval]);

  return (
    <PomodoroContext.Provider
      value={{
        seconds,
        minutes,
        hours,
        isRunning,
        start,
        pause,
        resume,
        restart,
        skipBackward,
        skip,
        mode,
        setMode,
        totalMilliseconds,
        pomodoroSessionId: pomodoroSession.current,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
}

export function usePomodoro() {
  const pomodoroData = useContext(PomodoroContext);

  if (pomodoroData === undefined)
    throw new Error(
      "usePomodoro should be used within PomodoroContextProvider",
    );

  return pomodoroData;
}
