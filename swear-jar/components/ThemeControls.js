import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { SunIcon, MoonIcon } from "@heroicons/react/solid";

const ThemeControls = () => {
  const [mounted, setMounted] = useState(false);

  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (currentTheme === "dark") {
    return (
      <SunIcon
        className="w-6 h-6 text-slate-300"
        role="button"
        onClick={() => setTheme("light")}
      />
    );
  } else {
    return (
      <MoonIcon
        className="w-6 h-6 text-slate-700"
        role="button"
        onClick={() => setTheme("dark")}
      />
    );
  }
};

export default ThemeControls;
