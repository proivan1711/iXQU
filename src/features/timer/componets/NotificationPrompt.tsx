"use client";

import { Check, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getData } from "@/features/analytics/services/analyticsDatabase";
import { getSettings, setSetting } from "@/features/settings/services/settings";
import { MIN_POMODOROS_FOR_NOTIFICATION_AUTO_ASK } from "@/features/timer/config";

export default function NotificationPrompt() {
  const {
    pomodoros: { length: pomodorosCount },
  } = getData();

  const [hasAllowedNotifications, setHasAllowedNotifications] = useState<
    null | boolean
  >(() => getSettings().allowedNotifications);

  if (
    hasAllowedNotifications === null &&
    pomodorosCount >= MIN_POMODOROS_FOR_NOTIFICATION_AUTO_ASK
  ) {
    return (
      <Dialog defaultOpen={true}>
        <DialogContent aria-describedby="Notification Permission for pomodoro">
          <DialogTitle>Stay in flow with gentle reminders?</DialogTitle>
          <DialogHeader>
            Get a small notification when your Pomodoro or break finishes — even
            if you're in another tab.
          </DialogHeader>
          <DialogDescription>
            No spam — only when a Pomodoro or break completes. Sound always
            works 😊
            <br />
            <br />
            <span className="text-xs text-muted-foreground italic font-medium">
              You'll see one quick browser confirmation — just click "Allow"
              there too.
            </span>
          </DialogDescription>
          <DialogFooter>
            <DialogClose
              onClick={() => {
                setSetting({
                  settingsKey: "allowedNotifications",
                  value: false,
                });
                setHasAllowedNotifications(false);
              }}
              asChild={true}
            >
              <Button variant="outline">
                <X />
                <span>No thanks</span>
              </Button>
            </DialogClose>
            <DialogClose
              asChild={true}
              onClick={() => {
                toast.promise(
                  async () => {
                    const res = await Notification.requestPermission();
                    if (res === "denied" || res === "default") {
                      setSetting({
                        settingsKey: "allowedNotifications",
                        value: false,
                      });
                      setHasAllowedNotifications(false);
                      await Promise.reject("Notification denied");
                    } else {
                      setSetting({
                        settingsKey: "allowedNotifications",
                        value: true,
                      });
                      setHasAllowedNotifications(true);
                      await Promise.resolve();
                    }
                  },
                  {
                    success: "Notifications allowed",
                    error: "Notification permission denied",
                    loading: "Requesting notification permission",
                    duration: 1000 * 10,
                  },
                );
              }}
            >
              <Button>
                <Check />
                <span>Yes please</span>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  return null;
}
