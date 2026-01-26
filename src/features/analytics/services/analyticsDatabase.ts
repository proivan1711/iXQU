import { isObject, isValidISOString } from "@/utils";

const ANALYTICS_LOCAL_STORAGE_KEY = "analytics";
const INITIAL_ANALYTICS = {
  pomodoros: [],
};

type AnalyticsPomodoro = {
  id: string;
  date: string;
  totalDuration: number;
  goalDuration: number;
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
    typeof item.totalDuration === "number" &&
    typeof item.goalDuration === "number" &&
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

export function getData(): Analytics {
  if (typeof window === "undefined") return INITIAL_ANALYTICS;

  const data = localStorage.getItem(ANALYTICS_LOCAL_STORAGE_KEY);

  if (!data) {
    console.warn("No local analytics data found");
    console.log("Initializing analytics data");
    return initAnalytic();
  }

  try {
    const parsedData = JSON.parse(data);
    if (validateAnalyticsData(parsedData)) {
      return parsedData;
    } else {
      console.error("Pomodoro data corrupted");
      console.warn("Resetting pomodoro data");
      return initAnalytic();
    }
  } catch {
    console.error("There was a problem getting analytics from localStorage");
    return initAnalytic();
  }
}

/*for (let i = 0; i < 100; i++) {
  savePomodoro({
    id: crypto.randomUUID(),
    totalTime: Math.floor(25 * Math.random() * 1000 * 60),
    goalTime: 25 * 60 * 1000,
  });
}*/

export function savePomodoro({
  id,
  goalTime,
  totalTime,
}: {
  id: string;
  goalTime: number;
  totalTime: number;
}) {
  const data = getData();

  const filteredPomodoros = data.pomodoros.filter(
    (pomodoro) => pomodoro.id !== id,
  );

  const pomodoro: AnalyticsPomodoro = {
    id,
    date: new Date().toISOString(),
    goalDuration: goalTime,
    totalDuration: totalTime || 0,
  };

  data.pomodoros = filteredPomodoros;
  data.pomodoros.push(pomodoro);

  localStorage.setItem(ANALYTICS_LOCAL_STORAGE_KEY, JSON.stringify(data));
}
