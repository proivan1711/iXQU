import type { Metadata } from "next";
import SettingsForm from "@/features/settings/components/SettingsForm";

export const metadata: Metadata = {
  title: "Settings",
  description:
    "Customize your pomodoro experience, pomodoro time, notifications, breaks and more.",
};

export default function Settings() {
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-dvh">
      <h1 className="text-7xl font-sans font-semibold text-balance mb-20">
        Settings
      </h1>
      <SettingsForm />
    </div>
  );
}
