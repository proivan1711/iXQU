"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  getSettings,
  setSetting as setSettingRaw,
} from "@/features/settings/services/settings";
import { DEFAULT_SETTINGS } from "@/features/timer/config";

type SettingsData = typeof DEFAULT_SETTINGS;

type SettingsContextValue = SettingsData & {
  setSetting: typeof setSettingRaw;
};
const SettingsContext = createContext<undefined | SettingsContextValue>(
  undefined,
);

type SetSettingAction<K extends keyof typeof DEFAULT_SETTINGS> = {
  type: "SET_SETTING";
  payload: {
    field: keyof typeof DEFAULT_SETTINGS;
    value: (typeof DEFAULT_SETTINGS)[K];
  };
};

type UpdateAllSettingsAction = {
  type: "UPDATE_ALL";
  payload: Omit<SettingsContextValue, "setSetting">;
};

type Actions =
  | SetSettingAction<keyof typeof DEFAULT_SETTINGS>
  | UpdateAllSettingsAction;

function reducer(state: SettingsContextValue, action: Actions) {
  switch (action.type) {
    case "SET_SETTING": {
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      } as SettingsContextValue;
    }
    case "UPDATE_ALL": {
      return {
        ...state,
        ...action.payload,
      };
    }
  }
}

export function SettingsContextProvider({ children }: { children: ReactNode }) {
  const initialState = {
    ...DEFAULT_SETTINGS,
    setSetting(...args: Parameters<typeof setSettingRaw>) {
      dispatch({
        type: "SET_SETTING",
        payload: {
          field: args[0].settingsKey,
          value: args[0].value,
        },
      });
      return setSettingRaw(...args);
    },
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "UPDATE_ALL", payload: getSettings() });
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        ...state,
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
