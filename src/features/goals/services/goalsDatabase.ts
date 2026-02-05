import type { UUID } from "node:crypto";
import { type Goal, GoalSchema, type Goals } from "@/features/goals/types";

const GOALS_LOCAL_STORAGE_KEY = "goals";
const INITIAL_GOALS: Goals = [];

function initGoals(): Goals {
  localStorage.setItem(GOALS_LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_GOALS));
  return INITIAL_GOALS;
}

function validateGoal(item: unknown): item is Goal {
  return GoalSchema.safeParse(item).success;
}

function validateGoals(goals: unknown): goals is Goals {
  if (Array.isArray(goals)) {
    return goals.every(validateGoal);
  }
  return false;
}

export function getGoals(): Goals {
  if (typeof window === "undefined") return INITIAL_GOALS;

  const data = localStorage.getItem(GOALS_LOCAL_STORAGE_KEY);

  if (!data) {
    console.warn("No local goals data found");
    console.log("Initializing goals data");
    return initGoals();
  }

  try {
    const parsedData = JSON.parse(data);
    if (validateGoals(parsedData)) {
      return parsedData;
    } else {
      console.error("Goals data corrupted");
      console.warn("Resetting goals data");
      return initGoals();
    }
  } catch {
    console.error("There was a problem getting goals from localStorage");
    return initGoals();
  }
}

export function addGoal({
  title,
  goalSeconds,
}: {
  title: string;
  goalSeconds: number;
}): Goal {
  const goals = getGoals();

  const newGoal: Goal = {
    id: crypto.randomUUID() as UUID,
    title,
    goalSeconds,
    completedSeconds: 0,
    createdAt: new Date().toISOString(),
  };

  goals.push(newGoal);

  localStorage.setItem(GOALS_LOCAL_STORAGE_KEY, JSON.stringify(goals));

  return newGoal;
}

export function updateGoal({
  id,
  updates,
}: {
  id: UUID;
  updates: Partial<Omit<Goal, "id" | "createdAt">>;
}): Goal | null {
  const goals = getGoals();

  const goalIndex = goals.findIndex((goal) => goal.id === id);

  if (goalIndex === -1) {
    console.error(`Goal with id ${id} not found`);
    return null;
  }

  const updatedGoal = {
    ...goals[goalIndex],
    ...updates,
  };

  goals[goalIndex] = updatedGoal;

  localStorage.setItem(GOALS_LOCAL_STORAGE_KEY, JSON.stringify(goals));

  return updatedGoal;
}

export function addTimeToGoal(id: UUID, seconds: number): Goal | null {
  const goals = getGoals();
  const goal = goals.find((g) => g.id === id);

  if (!goal) {
    console.error(`Goal with id ${id} not found`);
    return null;
  }

  return updateGoal({
    id,
    updates: {
      completedSeconds: goal.completedSeconds + seconds,
    },
  });
}

export function deleteGoal(id: UUID): boolean {
  const goals = getGoals();

  const filteredGoals = goals.filter((goal) => goal.id !== id);

  if (filteredGoals.length === goals.length) {
    console.error(`Goal with id ${id} not found`);
    return false;
  }

  localStorage.setItem(GOALS_LOCAL_STORAGE_KEY, JSON.stringify(filteredGoals));

  return true;
}
