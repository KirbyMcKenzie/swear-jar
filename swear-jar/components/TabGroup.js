import React, { Fragment } from "react";
import { Tab } from "@headlessui/react";

const TabGroup = ({ tabs, onChange }) => {
  return (
    <Tab.Group onChange={onChange}>
      <Tab.List className="flex flex-row justify-evenly">
        {tabs.map(({ label }) => (
          <Tab as={Fragment} key={label}>
            {({ selected }) => (
              <button
                className={`w-20 mt-2 p-2 rounded-full text-slate-500 text-sm hover:bg-slate-200 hover:dark:bg-slate-800 hover:dark:text-slate-500 ${
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
  );
};

export default TabGroup;
