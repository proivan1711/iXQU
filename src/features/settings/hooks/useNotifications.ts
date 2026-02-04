"use client";

import { toast } from "sonner";
import { useSettings } from "@/features/settings/context/SettingsContext";

const NOTIFICATION_TOAST_ID = "notification-switcher";

export default function useNotifications() {
  const { allowedNotifications, setSetting } = useSettings();

  function getNotificationPermission() {
    toast.promise(
      async () => {
        const res = await Notification.requestPermission();
        if (res === "denied" || res === "default") {
          setSetting({
            settingsKey: "allowedNotifications",
            value: false,
          });
          await Promise.reject("Notification denied");
        } else {
          setSetting({
            settingsKey: "allowedNotifications",
            value: true,
          });
          await Promise.resolve();
        }
      },
      {
        success: "Notifications enabled",
        error: "Notification permission denied",
        loading: "Requesting notification permission",
        duration: 1000 * 3,
        id: NOTIFICATION_TOAST_ID,
      },
    );
  }

  function removeNotificationPermission() {
    if (Notification.permission !== "granted") return;
    setSetting({
      settingsKey: "allowedNotifications",
      value: false,
    });
    toast.info("Notifications disabled", {
      id: NOTIFICATION_TOAST_ID,
      duration: 2 * 1000,
    });
  }
  return {
    allowedNotifications,
    getNotificationPermission,
    removeNotificationPermission,
  };
}
