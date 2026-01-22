"use client";

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useState,
} from "react";
import { useTimer } from "react-timer-hook";
import { useSettings } from "@/features/settings/context/SettingsContext";

type Mode = "pomodoro" | "shortBreak" | "longBreak";

const PomodoroContext = createContext<
  | {
      seconds: number;
      minutes: number;
      hours: number;
      isRunning: boolean;
      start: () => void;
      pause: () => void;
      resume: () => void;
      restart: (optMode?: Mode) => void;
      skipBackward: () => void;
      skip: () => void;
      mode: Mode;
      setMode: Dispatch<SetStateAction<Mode>>;
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

  const [mode, setMode] = useState<Mode>("pomodoro");

  const modeDurations = {
    pomodoro: pomodoroDuration,
    shortBreak: shortBreakDuration,
    longBreak: longBreakDuration,
  };

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
  });

  const restart = (optMode: Mode = mode) => {
    if (optMode !== mode) setMode(optMode);

    rawRestart(new Date(Date.now() + modeDurations[optMode]));
  };
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
