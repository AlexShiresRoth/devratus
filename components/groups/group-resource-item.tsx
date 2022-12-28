import React from "react";
import { GroupResource } from "../../types/group.types";

type Props = {
  resource: GroupResource;
};

const GroupResourceItem = ({ resource }: Props) => {
  return (
    <a
      href={resource?.resourceLink}
      target="_blank"
      rel="noopener noreferrer"
      className="min-w-[400px]"
    >
      <div className="flex flex-col gap-2 bg-sky-400/10 p-8 rounded">
        <p className="text-slate-50 font-bold uppercase  ">
          {resource?.resourceName}
        </p>

        <iframe src={resource?.resourceLink} className="rounded w-full" />
      </div>
    </a>
  );
};

export default GroupResourceItem;
