"use client";

import { useEffect, useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useSettings } from "@/features/settings/context/SettingsContext";
import useNotifications from "@/features/settings/hooks/useNotifications";
import {
  MAX_LONG_BREAK_DURATION,
  MAX_POMODORO_DURATION,
  MAX_SHORT_BREAK_DURATION,
  MAX_SKIP_DURATION,
  MIN_LONG_BREAK_DURATION,
  MIN_POMODORO_DURATION,
  MIN_SHORT_BREAK_DURATION,
  MIN_SKIP_DURATION,
} from "@/features/timer/config";

const minPomodoroDurInMinutes = MIN_POMODORO_DURATION / 1000 / 60;
const maxPomodoroDurInMinutes = MAX_POMODORO_DURATION / 1000 / 60;

const minShortBreakDurInMinutes = MIN_SHORT_BREAK_DURATION / 1000 / 60;
const maxShortBreakInMinutes = MAX_SHORT_BREAK_DURATION / 1000 / 60;

const minLongBreakDurInMinutes = MIN_LONG_BREAK_DURATION / 1000 / 60;
const maxLongBreakDurInMinutes = MAX_LONG_BREAK_DURATION / 1000 / 60;

const minSkipInSeconds = MIN_SKIP_DURATION / 1000;
const maxSkipInSeconds = MAX_SKIP_DURATION / 1000;

export function PomodoroDurationField() {
  const timerId = useRef<number | null>(null);
  const isMounted = useRef<boolean>(false);

  const { pomodoroDuration: pomodoroSettingsDuration, setSetting } =
    useSettings();

  const pomodoroDurationInMinutes = pomodoroSettingsDuration / 1000 / 60;

  const [pomodoroDuration, setPomodoroDuration] = useState<number>(
    minPomodoroDurInMinutes,
  );

  useEffect(() => {
    setPomodoroDuration(pomodoroDurationInMinutes);
    isMounted.current = true;
  }, [pomodoroDurationInMinutes]);

  return (
    <div className="flex-col flex w-4/5 gap-3">
      <label htmlFor="pomodoro-duration" className="font-semibold text-lg">
        Pomodoro duration
      </label>
      {isMounted && (
        <Slider
          onValueChange={(value: [number]) => {
            setPomodoroDuration(Number(value.at(0)));
            if (timerId.current) clearTimeout(timerId.current);
            timerId.current = window.setTimeout(() => {
              setSetting({
                settingsKey: "pomodoroDuration",
                value: (value.at(0) as number) * 1000 * 60,
              });
            }, 500);
          }}
          value={[pomodoroDuration]}
          id="pomodoro-duration"
          min={minPomodoroDurInMinutes}
          max={maxPomodoroDurInMinutes}
        />
      )}
      <span className="text-md font-semibold font-mono">
        {Math.floor(pomodoroDuration / 60)}h {Math.floor(pomodoroDuration % 60)}
        min
      </span>
    </div>
  );
}

export function ShortBreakDurationField() {
  const timerId = useRef<number | null>(null);
  const isMounted = useRef<boolean>(false);

  const { shortBreakDuration: settingsShortBreakDuration, setSetting } =
    useSettings();

  const shortBreakDurationInMinutes = settingsShortBreakDuration / 1000 / 60;

  const [shortBreakDuration, setShortBreakDuration] = useState<number>(
    minShortBreakDurInMinutes,
  );

  useEffect(() => {
    setShortBreakDuration(shortBreakDurationInMinutes);
    isMounted.current = true;
  }, [shortBreakDurationInMinutes]);

  return (
    <div className="flex-col flex w-4/5 gap-3">
      <label htmlFor="short-break-duration" className="font-semibold text-lg">
        Short break duration
      </label>
      {isMounted && (
        <Slider
          onValueChange={(value: [number]) => {
            setShortBreakDuration(Number(value.at(0)));
            if (timerId.current) clearTimeout(timerId.current);
            timerId.current = window.setTimeout(() => {
              setSetting({
                settingsKey: "shortBreakDuration",
                value: (value.at(0) as number) * 60 * 1000,
              });
            }, 500);
          }}
          value={[shortBreakDuration]}
          id="short-break-duration"
          min={minShortBreakDurInMinutes}
          max={maxShortBreakInMinutes}
        />
      )}
      <span className="text-md font-semibold font-mono">
        {shortBreakDuration}
        min
      </span>
    </div>
  );
}

export function LongBreakDurationField() {
  const timerId = useRef<number | null>(null);
  const isMounted = useRef<boolean>(false);

  const { longBreakDuration: settingsLongBreakDuration, setSetting } =
    useSettings();

  const longBreakDurationInMinutes = settingsLongBreakDuration / 1000 / 60;

  const [longBreakDuration, setLongBreakDuration] = useState<number>(
    minLongBreakDurInMinutes,
  );

  useEffect(() => {
    setLongBreakDuration(longBreakDurationInMinutes);
    isMounted.current = true;
  }, [longBreakDurationInMinutes]);

  return (
    <div className="flex-col flex w-4/5 gap-3">
      <label htmlFor="long-break-duration" className="font-semibold text-lg">
        Long break duration
      </label>
      {isMounted && (
        <Slider
          onValueChange={(value: [number]) => {
            setLongBreakDuration(Number(value.at(0)));
            if (timerId.current) clearTimeout(timerId.current);
            timerId.current = window.setTimeout(() => {
              setSetting({
                settingsKey: "longBreakDuration",
                value: (value.at(0) as number) * 60 * 1000,
              });
            }, 500);
          }}
          value={[longBreakDuration]}
          id="long-break-duration"
          min={minLongBreakDurInMinutes}
          max={maxLongBreakDurInMinutes}
        />
      )}
      <span className="text-md font-semibold font-mono">
        {longBreakDuration}
        min
      </span>
    </div>
  );
}

export function SkipDurationField() {
  const timerId = useRef<number | null>(null);
  const isMounted = useRef<boolean>(false);

  const { skipDuration: settingsSkipDuration, setSetting } = useSettings();

  const skipDurationInSeconds = settingsSkipDuration / 1000;

  const [skipDuration, setSkipDuration] = useState<number>(minSkipInSeconds);

  useEffect(() => {
    setSkipDuration(skipDurationInSeconds);
    isMounted.current = true;
  }, [skipDurationInSeconds]);

  return (
    <div className="flex-col flex w-4/5 gap-3">
      <label htmlFor="skip-duration" className="font-semibold text-lg">
        Skip duration
      </label>
      {isMounted && (
        <Slider
          onValueChange={(value: [number]) => {
            setSkipDuration(Number(value.at(0)));
            if (timerId.current) clearTimeout(timerId.current);
            timerId.current = window.setTimeout(() => {
              setSetting({
                settingsKey: "skipDuration",
                value: (value.at(0) as number) * 1000,
              });
            }, 500);
          }}
          value={[skipDuration]}
          id="skip-duration"
          min={minSkipInSeconds}
          max={maxSkipInSeconds}
        />
      )}
      <span className="text-md font-semibold font-mono">{skipDuration} s</span>
    </div>
  );
}

export function NotificationField() {
  const {
    getNotificationPermission,
    allowedNotifications,
    removeNotificationPermission,
  } = useNotifications();

  return (
    <div className="flex items-center gap-5">
      <label
        htmlFor="notification-switch"
        className="text-md font-semibold font-mono"
      >
        Notifications for timer
      </label>
      <Switch
        checked={allowedNotifications ?? false}
        onCheckedChange={(isChecked) => {
          isChecked
            ? getNotificationPermission()
            : removeNotificationPermission();
        }}
        id="notification-switch"
      />
    </div>
  );
}
