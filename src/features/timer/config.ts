export const MIN_POMODORO_DURATION = 15 * 60 * 1000;
export const MAX_POMODORO_DURATION = 5 * 60 * 60 * 1000;

export const MIN_SHORT_BREAK_DURATION = 60 * 1000;
export const MAX_SHORT_BREAK_DURATION = 10 * 60 * 1000;

export const MIN_LONG_BREAK_DURATION = 10 * 60 * 1000;
export const MAX_LONG_BREAK_DURATION = 30 * 60 * 1000;

export const MIN_SKIP_DURATION = 1000;
export const MAX_SKIP_DURATION = 30 * 1000;

export const SETTINGS_LOCAL_STORAGE_KEY = "settings";
export const DEFAULT_SETTINGS = {
  pomodoroDuration: 25 * 60 * 1000,
  shortBreakDuration: 5 * 60 * 1000,
  longBreakDuration: 15 * 60 * 1000,
  skipDuration: 15 * 1000,
};

export const MIN_POMODORO_TIME_SAVE = 60 * 1000;

export const ALARM_SOUND_ID = "pomodoro-alarm";
export const TIMER_NOTIFICATION_ID = "timer-notification";
