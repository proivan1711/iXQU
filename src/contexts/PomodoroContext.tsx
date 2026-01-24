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
    useState,
} from "react";
import {useTimer} from "react-timer-hook";
import {useSettings} from "@/features/settings/context/SettingsContext";

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
  });

  const restart = useCallback(
    function restart(optMode: Mode = mode) {
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: needs to rerender on settings change
  useEffect(() => {
    restart(mode);
  }, [pomodoroDuration, shortBreakDuration, longBreakDuration, mode, restart]);

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
