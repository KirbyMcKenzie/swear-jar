import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";

const IndexPage = () => {
  const [mounted, setMounted] = useState(false);
  const [balance, setBalance] = useState(0);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <SunIcon
          className="w-8 h-8 text-white"
          role="button"
          onClick={() => setTheme("light")}
        />
      );
    } else {
      return (
        <MoonIcon
          className="w-8 h-8 text-black"
          role="button"
          onClick={() => setTheme("dark")}
        />
      );
    }
  };

  if (!mounted) return null;

  // Create our number formatter.
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  /* $2,500.00 */

  return (
    <main className="max-w-lg mx-auto p-4">
      <div className=" white container flex justify-between items-center">
        <h1 className="text-3xl font-bold text-center">{"Swear Jar"}</h1>
        {renderThemeChanger()}
      </div>

      <div className="flex flex-col">
        <div className="my-2">
          <span>{`Balance: ${formatter.format(balance)}`}</span>
        </div>
        <button
          className="bg-red-600 dark:bg-red-500 hover:bg-yellow-800 text-white font-medium py-4 px-4 rounded border-b-8 border-red-700 active:border-b-0 active:translate-y-1"
          onClick={() => setBalance(balance + 1)}
        >
          {"Deposit $2.00 "}
        </button>
      </div>
    </main>
  );
};

export default IndexPage;
