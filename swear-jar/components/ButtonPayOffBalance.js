import React from "react";
import { useReward } from "react-rewards";

const ButtonPayOffBalance = ({
  label = "Pay off Balance",
  isDisabled = false,
  onClick,
}) => {
  const { reward: emojiRewardMoney } = useReward("emojiRewardMoney", "emoji", {
    emoji: ["💵"],
    position: "absolute",
    angle: "90",
  });

  const handleClick = () => {
    emojiRewardMoney();
    onClick();
  };

  return (
    <button
      id="emojiRewardMoney"
      disabled={isDisabled}
      className="mt-2 p-2 rounded-md text-slate-500 text-sm hover:bg-slate-200 hover:dark:bg-slate-800 hover:dark:text-slate-500"
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default ButtonPayOffBalance;
