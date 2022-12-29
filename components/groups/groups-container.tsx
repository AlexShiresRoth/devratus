import React, { useCallback, useEffect, } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux-hooks";
import { fetchGroups, groupState } from "../../redux/slices/groups.slice";
import axios from "axios";
import GroupItem from "./group-item";
import { GroupType } from "../../types/group.types";

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
    <div className="w-full flex flex-col items-center overflow-hidden ">
      <div className="w-11/12 flex flex-col gap-4  mt-10 overflow-hidden">
        <div className="flex flex-col gap-4 ">
          {groups.length > 0 &&
            groups?.map((group: GroupType) => (
              <GroupItem group={group} key={group?._id}/>
            ))}
        </div>
      </div>
    </div>
  );
};

export default GroupsContainer;
