import {SiGithub} from "@icons-pack/react-simple-icons";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {
    LongBreakDurationField,
    PomodoroDurationField,
    ShortBreakDurationField,
    SkipDurationField,
} from "@/features/settings/components/SettingsFormFields";

export default function SettingsForm() {
  return (
    <form className="bg-card w-[85%] sm:w-[75%] max-w-7xl h-[70%] rounded-2xl flex flex-col justify-between items-start px-10 pt-20 pb-5 gap-15">
      <div className="flex flex-col w-full gap-15">
        <PomodoroDurationField />
        <ShortBreakDurationField />
        <LongBreakDurationField />
        <SkipDurationField />
      </div>
      <div className="flex w-full justify-between items-center">
        <Link href="https://github.com/proivan1711/ixqu">
          <SiGithub
            className="md:scale-125 opacity-70 duration-100 hover:opacity-100 ease-in-out"
            size={28}
          />
        </Link>
        <div className="flex justify-center items-center p-5">
          <p className="text-md">iXQU is an open source project.</p>
          <Button variant="link">
            <Link href="https://github.com/proivan1711/ixqu/graphs/contributors">
              View contributors
            </Link>
          </Button>
        </div>
      </div>
    </form>
  );
}
