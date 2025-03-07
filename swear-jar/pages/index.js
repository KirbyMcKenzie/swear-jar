import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";
import { useState, useEffect, Fragment } from "react";
import { useChromeStorageLocal } from "use-chrome-storage";
import { useReward } from "react-rewards";

import { Tab } from "@headlessui/react";

const isProduction = process.env.NODE_ENV === "production";

const tabs = [
  { label: "$0.25", value: 0.25 },
  { label: "$0.50", value: 0.5 },
  { label: "$1.00", value: 1 },
  { label: "$2.00", value: 2 },
  { label: "$5.00", value: 5 },
];

const initialTab = tabs[0];

const IndexPage = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  const { reward: emojiRewardSwear } = useReward("emojiRewardSwear", "emoji", {
    emoji: ["🤬"],
    position: "absolute",
    angle: "90",
  });

  const { reward: emojiRewardMoney } = useReward("emojiRewardMoney", "emoji", {
    emoji: ["💵"],
    position: "absolute",
    angle: "90",
  });

  const [balance, setBalance] = isProduction
    ? useChromeStorageLocal("balanceLocal", 0.0)
    : useState(0);

  const [numSwears, setNumSwears] = isProduction
    ? useChromeStorageLocal("numSwearsLocal", 0.0)
    : useState(0);

  const [selectedTabValue, setSelectedTabValue] = useState(initialTab.value);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;

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

  if (!mounted) return null;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <main
      className="max-w-lg mx-auto p-4 overflow-hidden"
      style={{ minWidth: 400, maxHeight: 800, overflow: "hidden" }}
    >
      <div className="container flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-center text-slate-700 dark:text-slate-300 mr-2">
            {`Balance: ${formatter.format(balance)}`}
          </h1>
        </div>
        {renderThemeChanger()}
      </div>

      <p className="text-sm text-slate-500">{`Kindly donated from ${numSwears} swears`}</p>

      <div className="flex flex-col mt-4">
        <div className="flex flex-col" style={{ minHeight: 70 }}>
          <button
            id="emojiRewardSwear"
            className="bg-red-600 dark:bg-red-500 text-white text-lg font-bold py-4 px-4 rounded border-b-8 border-red-700 active:border-b-0 active:translate-y-1"
            onClick={() => {
              setBalance(balance + selectedTabValue);
              setNumSwears(numSwears + 1);
              emojiRewardSwear();
            }}
          >
            {"Oh, *$%^@!"}
          </button>
        </div>
        <button
          id="emojiRewardMoney"
          disabled={balance === 0}
          className="mt-2 p-2 rounded-md text-slate-500 text-sm hover:bg-slate-200 hover:dark:bg-slate-800 hover:dark:text-slate-500"
          onClick={() => {
            setBalance(0);
            setNumSwears(0);
            emojiRewardMoney();
          }}
        >
          {"Pay off Balance"}
        </button>
      </div>

      <div class="relative flex py-5 items-center">
        <div class="flex-grow border-t border-slate-400" />
      </div>

      <p className="text-black dark:text-slate-500 font-medium">
        {"Deposit Amount:"}
      </p>

      <Tab.Group onChange={(index) => setSelectedTabValue(tabs[index].value)}>
        <Tab.List className="flex flex-row justify-evenly">
          {tabs.map(({ label }) => (
            <Tab as={Fragment} key={label}>
              {({ selected }) => (
                <button
                  style={{ width: 80 }}
                  className={`mt-2 p-2 rounded-full text-slate-500 text-sm hover:bg-slate-200 hover:dark:bg-slate-800 hover:dark:text-slate-500 ${
                    selected ? "bg-slate-200 dark:bg-slate-800" : ""
                  }`}
                >
                  {label}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </main>
  );
};

export default IndexPage;
