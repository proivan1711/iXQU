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
import {useTimer} from "react-timer-hook";
import {savePomodoro} from "@/features/analytics/services/analyticsDatabase";
import {useSettings} from "@/features/settings/context/SettingsContext";
import {MIN_POMODORO_TIME} from "@/features/timer/config";

type Mode = "pomodoro" | "shortBreak" | "longBreak";

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
          totalTime: pomodoroDuration,
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

  const restart = useCallback(
    function restart(optMode: Mode = mode) {
      const elapsedTime =
        saveStateRef.current.goalTime - saveStateRef.current.totalTime;
      if (
        mode === "pomodoro" &&
        optMode !== mode &&
        elapsedTime >= MIN_POMODORO_TIME
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
        totalMilliseconds >= MIN_POMODORO_TIME
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
    const { mode, id, goalTime, totalTime } = saveStateRef.current;
    const elapsedTime = goalTime - totalTime;
    if (mode === "pomodoro" && elapsedTime >= MIN_POMODORO_TIME) {
      savePomodoro({
        id,
        goalTime,
        totalTime,
      });
    }
  }, []);

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
    if (
      mode === "pomodoro" &&
      saveStateRef.current.totalTime >= MIN_POMODORO_TIME
    )
      savePomodoro({ id: pomodoroSession.current, goalTime: pomodoroDuration });
  }, [mode, pomodoroDuration]);

  useEffect(() => {
    saveStateRef.current = {
      id: pomodoroSession.current,
      goalTime: pomodoroDuration,
      totalTime: totalMilliseconds,
      mode,
    };
  });

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
