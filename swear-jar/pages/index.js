import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";

const IndexPage = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <SunIcon
          className="w-10 h-10 text-slate-500"
          role="button"
          onClick={() => setTheme("light")}
        />
      );
    } else {
      return (
        <MoonIcon
          className="w-10 h-10 text-slate-500"
          role="button"
          onClick={() => setTheme("dark")}
        />
      );
    }
  };

  if (!mounted) return null;

  return (
    <main className="max-w-lg mx-auto">
      <header className="h-15m dark:border-gray-700">
        <div className=" white dark:bg-slate-800 container px-4 sm:px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl text-slate-500 font-bold text-center">
            {" Hello world!"}
          </h1>
          {renderThemeChanger()}
        </div>
      </header>
    </main>
  );
};

export default IndexPage;
