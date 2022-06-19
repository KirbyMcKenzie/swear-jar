import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";
import { useChromeStorageLocal } from "use-chrome-storage";

const IndexPage = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  const [balance, setBalance, isPersistent, error] = useChromeStorageLocal(
    "counterLocal",
    0
  );

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

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <main className="max-w-lg mx-auto p-4" style={{ minWidth: 400 }}>
      <div className=" white container flex justify-between items-center">
        <h1 className="text-3xl font-bold text-center">
          {`Balance: ${formatter.format(balance)}`}
        </h1>
        {renderThemeChanger()}
      </div>

      <div className="flex flex-col mt-4">
        <button
          className="bg-red-600 dark:bg-red-500 hover:bg-yellow-800 text-white font-medium py-4 px-4 rounded border-b-8 border-red-700 active:border-b-0 active:translate-y-1"
          onClick={() => setBalance(balance + 2)}
        >
          {"Deposit $2.00 "}
        </button>
        <button className="mt-4" onClick={() => setBalance(0)}>
          {"Clear"}
        </button>
      </div>
    </main>
  );
};

export default IndexPage;
