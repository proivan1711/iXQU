"use client";

import type { UUID } from "node:crypto";
import { createContext, type ReactNode, useContext, useState } from "react";
import {
  addGoal as addGoalService,
  addTimeToGoal as addTimeToGoalService,
  deleteGoal as deleteGoalService,
  getGoals,
  updateGoal as updateGoalService,
} from "@/features/goals/services/goalsDatabase";
import type { Goal, Goals } from "@/features/goals/types";

type GoalsContextType = {
  goals: Goal[];
  activeGoals: Goal[];
  completedGoals: Goal[];
  addGoal: (title: string, goalSeconds: number) => void;
  updateGoal: (
    id: UUID,
    updates: Partial<Omit<Goal, "id" | "createdAt">>,
  ) => void;
  addTimeToGoal: (id: UUID, seconds: number) => void;
  deleteGoal: (id: UUID) => void;
  refreshGoals: () => void;
};

const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

export function GoalsProvider({ children }: { children: ReactNode }) {
  const [goals, setGoals] = useState<Goals>(() => getGoals());

  const addGoal = (title: string, goalSeconds: number) => {
    const newGoal = addGoalService({ title, goalSeconds });
    setGoals((prev) => [...prev, newGoal]);
  };

  const updateGoal = (
    id: UUID,
    updates: Partial<Omit<Goal, "id" | "createdAt">>,
  ) => {
    const updatedGoal = updateGoalService({ id, updates });
    if (updatedGoal) {
      setGoals((prev) =>
        prev.map((goal) => (goal.id === id ? updatedGoal : goal)),
      );
    }
  };

  const addTimeToGoal = (id: UUID, seconds: number) => {
    const updatedGoal = addTimeToGoalService(id, seconds);
    if (updatedGoal) {
      setGoals((prev) =>
        prev.map((goal) => (goal.id === id ? updatedGoal : goal)),
      );
    }
  };

  const deleteGoal = (id: UUID) => {
    const success = deleteGoalService(id);
    if (success) {
      setGoals((prev) => prev.filter((goal) => goal.id !== id));
    }
  };

  const refreshGoals = () => {
    setGoals(getGoals());
  };

  const activeGoals = goals.filter((goal) => !goal.completedAt);
  const completedGoals = goals.filter((goal) => goal.completedAt);

  return (
    <GoalsContext.Provider
      value={{
        goals,
        activeGoals,
        completedGoals,
        addGoal,
        updateGoal,
        addTimeToGoal,
        deleteGoal,
        refreshGoals,
      }}
    >
      {children}
    </GoalsContext.Provider>
  );
}

export function useGoals() {
  const context = useContext(GoalsContext);
  if (context === undefined) {
    throw new Error("useGoals must be used within a GoalsProvider");
  }
  return context;
}
