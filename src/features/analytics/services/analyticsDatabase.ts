import { isObject, isValidISOString } from "@/utils";

const ANALYTICS_LOCAL_STORAGE_KEY = "analytics";
const INITIAL_ANALYTICS = {
  pomodoros: [],
};

type AnalyticsPomodoro = {
  id: string;
  pomodoroDuration: number;
  date: string;
};

type Analytics = {
  pomodoros: AnalyticsPomodoro[];
};

function initAnalytic(): Analytics {
  localStorage.setItem(
    ANALYTICS_LOCAL_STORAGE_KEY,
    JSON.stringify(INITIAL_ANALYTICS),
  );
  return INITIAL_ANALYTICS;
}

function validatePomodoro(item: unknown): item is AnalyticsPomodoro {
  return (
    isObject(item) &&
    typeof item.id === "string" &&
    typeof item.pomodoroDuration === "number" &&
    isValidISOString(item.date)
  );
}

function validatePomodoros(
  pomodoros: unknown,
): pomodoros is Record<"pomodoros", AnalyticsPomodoro[]> {
  if (Array.isArray(pomodoros)) {
    return pomodoros.every(validatePomodoro);
  }
  return false;
}

function validateAnalyticsData(data: unknown): boolean {
  return isObject(data) && validatePomodoros(data.pomodoros);
}

function _getData() {
  const data = localStorage.getItem(ANALYTICS_LOCAL_STORAGE_KEY);

  if (!data) {
    return initAnalytic();
  }

  try {
    const parsedData = JSON.parse(data);
    if (validateAnalyticsData(parsedData)) return parsedData;
    else return initAnalytic();
  } catch {
    console.error("There was a problem getting analytics from localStorage");
    return initAnalytic();
  }
}
