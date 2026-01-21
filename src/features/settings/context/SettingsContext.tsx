"use client";

import {createContext, type ReactNode, useContext} from "react";

interface SettingsContextValue {
  pomodoroDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  skipDuration: number;
}

const SettingsContext = createContext<undefined | SettingsContextValue>(
  undefined,
);

export function SettingsContextProvider({ children }: { children: ReactNode }) {
  // Placeholders
  const pomodoroDuration = 25 * 60 * 1000;
  const shortBreakDuration = 5 * 60 * 1000;
  const longBreakDuration = 15 * 60 * 1000;
  const skipDuration = 5 * 1000;

  return (
    <SettingsContext.Provider
      value={{
        pomodoroDuration,
        shortBreakDuration,
        longBreakDuration,
        skipDuration,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const settings = useContext(SettingsContext);

  if (settings === undefined)
    throw new Error(
      "useSettings() must be used inside a SettingsContextProvider",
    );

  return settings;
}
