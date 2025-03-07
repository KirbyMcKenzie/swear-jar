import React from "react";
import { useReward } from "react-rewards";

const ButtonIncrementSwear = ({ onClick, label = "Oh, *$%^@!" }) => {
  const { reward: emojiRewardSwear } = useReward("emojiRewardSwear", "emoji", {
    emoji: ["🤬"],
    position: "absolute",
    angle: "90",
  });

  const handleClick = () => {
    emojiRewardSwear();
    onClick();
  };

  return (
    <button
      id="emojiRewardSwear"
      className="bg-red-600 dark:bg-red-500 text-white text-lg font-bold py-4 px-4 rounded border-b-8 border-red-700 active:border-b-0 active:translate-y-1"
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default ButtonIncrementSwear;
