"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ModeToggle() {
  const { setTheme } = useTheme();

  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <Button
      size="lg"
      onClick={() => {
        const isDarkModeConst = !isDarkMode;
        setIsDarkMode(isDarkModeConst);
        setTheme(isDarkModeConst ? "dark" : "light");
      }}
    >
      {isDarkMode ? <Sun /> : <Moon />}
    </Button>
  );
}
