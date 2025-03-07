import { useState } from "react";
import { useChromeStorageLocal } from "use-chrome-storage";

import ButtonIncrementSwear from "../components/ButtonIncrementSwear";
import ButtonPayOffBalance from "../components/ButtonPayOffBalance";
import Divider from "../components/Divider";
import TabGroup from "../components/TabGroup";
import ThemeControls from "../components/ThemeControls";
import { formatCurrency } from "../utils/currency";

const isProd = process.env.NODE_ENV === "production";

const tabs = [
  { label: "$0.25", value: 0.25 },
  { label: "$0.50", value: 0.5 },
  { label: "$1.00", value: 1 },
  { label: "$2.00", value: 2 },
  { label: "$5.00", value: 5 },
];

const IndexPage = () => {
  const [selectedTabValue, setSelectedTabValue] = useState(tabs[0]);

  const [balance, setBalance] = isProd
    ? useChromeStorageLocal("balanceLocal", 0.0)
    : useState(0);

  const [swearCount, setSwearCount] = isProd
    ? useChromeStorageLocal("swearCount", 0.0)
    : useState(0);

  const handleIncrementSwear = () => {
    setBalance(balance + selectedTabValue);
    setSwearCount(swearCount + 1);
  };

  const handlePayOffBalance = () => {
    setBalance(0);
    setSwearCount(0);
  };

  return (
    <main className="max-w-md mx-auto p-4 overflow-hidden">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-center text-slate-700 dark:text-slate-300 mr-2">
            {`Balance: ${formatCurrency.format(balance)}`}
          </h1>
        </div>
        <ThemeControls />
      </div>
      <p className="text-sm text-slate-500">{`Kindly donated from ${swearCount} swears`}</p>

      <div className="flex flex-col mt-4">
        <div className="flex flex-col min-h-[70px]">
          <ButtonIncrementSwear onClick={handleIncrementSwear} />
        </div>
        <ButtonPayOffBalance
          isDisabled={balance === 0}
          onClick={handlePayOffBalance}
        />
      </div>

      <Divider />

      <p className="text-black dark:text-slate-500 font-medium">
        {"Deposit Amount:"}
      </p>

      <TabGroup
        tabs={tabs}
        onChange={(index) => setSelectedTabValue(tabs[index].value)}
      />
    </main>
  );
};

export default IndexPage;
