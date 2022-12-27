import React, { useCallback, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux-hooks";
import { fetchGroups, groupState } from "../../redux/slices/groups.slice";
import axios from "axios";
import Heading4 from "../text/heading-4";

type Props = {
  userData: any;
};

const GroupsContainer = ({ userData }: Props) => {
  const dispatch = useAppDispatch();
  const { groups } = useAppSelector(groupState);
  const fetchGroupsFromDb = useCallback(() => {
    (async () => {
      try {
        const groups = await axios("/api/groups/fetch-groups", {
          method: "POST",
          data: { ...userData },
        });

        dispatch(fetchGroups({ groups: groups.data?.groups }));
      } catch (error) {
        console.error("Error fetching groups from db: ", error);
      }
    })();
  }, [dispatch, userData]);

  useEffect(() => {
    fetchGroupsFromDb();
  }, [fetchGroupsFromDb, groups.length]);

  console.log("groups: ", groups);
  return (
    <div className="w-full flex flex-col items-center overflow-hidden max-w-screen-2xl">
      <div className="w-11/12 flex flex-col gap-4  mt-10 overflow-hidden">
        <div className="flex flex-col gap-4 ">
          {groups.length > 0 &&
            groups?.map((group: any, i) => (
              <div
                key={group?._id}
                className="flex p-4 flex-col gap-2 overflow-hidden"
              >
                <Heading4>{group?.groupName}</Heading4>
                <p className="text-slate-400 text-sm">{group?.category}</p>
                <div className="flex gap-8 overflow-x-auto  border-[1px] border-sky-400/20 rounded p-8">
                  {group.resources?.length > 0 &&
                    group.resources?.map((resource: any, i: number) => (
                      <a
                        href={resource?.resourceLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={i}
                        className="min-w-[400px]"
                      >
                        <div className="flex flex-col gap-2 bg-sky-400/10 p-8 rounded">
                          <p className="text-slate-50 font-bold uppercase  ">
                            {resource?.resourceName}
                          </p>

                          <iframe
                            src={resource?.resourceLink}
                            className="rounded w-full"
                          />
                        </div>
                      </a>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default GroupsContainer;
