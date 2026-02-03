"use client";

import type React from "react";
import { useEffect, useState } from "react";

export default function useStorageState<T>(
  initialState: T,
  key: string,
  storageType: Storage,
) {
  const storage = storageType;
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialState;
    const storedValue = storage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    storage.setItem(key, JSON.stringify(value));
  }, [value, key, storage]);

  return [value, setValue] as [T, React.Dispatch<React.SetStateAction<T>>];
}
