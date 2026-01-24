import SettingsForm from "@/features/settings/components/SettingsForm";

export default function Settings() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-dvh">
      <h1 className="text-7xl font-sans font-semibold text-balance mb-20">
        Settings
      </h1>
      <SettingsForm />
    </div>
  );
}
