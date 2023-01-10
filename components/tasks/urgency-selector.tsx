import classNames from "classnames";
import React from "react";

type Props = {
  handleSelectUrgency: (
    e: React.FormEvent<HTMLSpanElement>,
    val: "low" | "medium" | "high"
  ) => void;
  urgency: "low" | "medium" | "high" | string;
};

const UrgencySelector = ({ urgency, handleSelectUrgency }: Props) => {
  return (
    <div className='w-full flex flex-col'>
      <p className='text-slate-100 font-bold text-xs mb-2'>Urgency Level</p>
      <div className='flex gap-2 w-full justify-between'>
        <span
          onClick={(e) => handleSelectUrgency(e, "low")}
          className={classNames(
            "flex items-center justify-between gap-2 rounded text-slate-50 flex-1 text-xs p-2 font-bold transition-all hover:cursor-pointer hover:bg-sky-500",
            {
              "bg-green-400": urgency !== "low",
              "bg-sky-500": urgency === "low",
            }
          )}
        >
          Low
          {urgency === "low" && (
            <span className='w-2 h-2 rounded-full bg-white block' />
          )}
        </span>
        <span
          onClick={(e) => handleSelectUrgency(e, "medium")}
          className={classNames(
            "flex items-center justify-between gap-2 rounded text-slate-50 flex-1 text-xs p-2 font-bold transition-all hover:cursor-pointer hover:bg-sky-500",
            {
              "bg-orange-400": urgency !== "medium",
              "bg-sky-500": urgency === "medium",
            }
          )}
        >
          Medium
          {urgency === "medium" && (
            <span className='w-2 h-2 rounded-full bg-white block' />
          )}
        </span>
        <span
          onClick={(e) => handleSelectUrgency(e, "high")}
          className={classNames(
            "flex items-center justify-between gap-2 rounded text-slate-50 flex-1 text-xs p-2 font-bold transition-all hover:cursor-pointer hover:bg-sky-500",
            {
              "bg-red-400": urgency !== "high",
              "bg-sky-500": urgency === "high",
            }
          )}
        >
          High
          {urgency === "high" && (
            <span className='w-2 h-2 rounded-full bg-white block' />
          )}
        </span>
      </div>
    </div>
  );
};

export default UrgencySelector;
