const isDeveloping = process.env.NODE_ENV === "development";

export const MIN_POMODORO_DURATION = isDeveloping ? 0 : 15 * 60 * 1000;
export const MAX_POMODORO_DURATION = 5 * 60 * 60 * 1000;

export const MIN_SHORT_BREAK_DURATION = 60 * 1000;
export const MAX_SHORT_BREAK_DURATION = isDeveloping
  ? 1000 * 60 * 1000
  : 10 * 60 * 1000;

export const MIN_LONG_BREAK_DURATION = isDeveloping ? 0 : 10 * 60 * 1000;
export const MAX_LONG_BREAK_DURATION = 30 * 60 * 1000;

export const MIN_SKIP_DURATION = isDeveloping ? 1 : 1000;
export const MAX_SKIP_DURATION = isDeveloping ? 60 * 60 * 1000 : 30 * 1000;

export const SETTINGS_LOCAL_STORAGE_KEY = "settings";
export const DEFAULT_SETTINGS = {
  pomodoroDuration: isDeveloping ? 5 * 1000 : 25 * 60 * 1000,
  shortBreakDuration: isDeveloping ? 2 * 1000 : 5 * 60 * 1000,
  longBreakDuration: isDeveloping ? 4 * 1000 : 15 * 60 * 1000,
  skipDuration: isDeveloping ? 100 * 60 * 1000 : 15 * 1000,
  allowedNotifications: null as null | boolean,
};

export const MIN_POMODORO_TIME_SAVE = 60 * 1000;

export const ALARM_SOUND_ID = "pomodoro-alarm";
export const TIMER_NOTIFICATION_ID = "timer-notification";

export const MIN_POMODOROS_FOR_NOTIFICATION_AUTO_ASK = isDeveloping ? 0 : 2;
