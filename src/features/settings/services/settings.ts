"use client";

import {DEFAULT_SETTINGS, SETTINGS_LOCAL_STORAGE_KEY,} from "@/features/timer/config";
import {isObject} from "@/utils";

function initSettings() {
  localStorage.setItem(
    SETTINGS_LOCAL_STORAGE_KEY,
    JSON.stringify(DEFAULT_SETTINGS),
  );
  return DEFAULT_SETTINGS;
}

function validateSettings(settings: unknown): typeof DEFAULT_SETTINGS {
  if (
    isObject(settings) &&
    Object.keys(DEFAULT_SETTINGS).every((key) => Object.hasOwn(settings, key))
  )
    return settings as typeof DEFAULT_SETTINGS;

  return initSettings();
}

export function getSettings(): typeof DEFAULT_SETTINGS {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  const settings = localStorage.getItem(SETTINGS_LOCAL_STORAGE_KEY);

  if (!settings) return initSettings();

  try {
    const parsedSettings = JSON.parse(settings);
    return validateSettings(parsedSettings);
  } catch {
    console.error("There was a problem accessing settings");
    return initSettings();
  }
}

export function setSetting({
  settingsKey,
  value,
}: {
  settingsKey: keyof typeof DEFAULT_SETTINGS;
  value: number;
}): typeof DEFAULT_SETTINGS {
  const settings = getSettings();
  settings[settingsKey] = value;

  try {
    localStorage.setItem(SETTINGS_LOCAL_STORAGE_KEY, JSON.stringify(settings));
    return settings;
  } catch {
    console.error("There was a problem updating settings");
    return initSettings();
  }
}
