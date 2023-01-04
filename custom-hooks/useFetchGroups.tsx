import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/redux-hooks";
import { fetchGroups, groupState } from "../redux/slices/groups.slice";

type Props = {
  fetchData: any;
};

//refetches or fetches all groups from db
const useFetchGroups = ({ fetchData }: Props) => {
  const dispatch = useAppDispatch();
  const { groups } = useAppSelector(groupState);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchGroupsFromDb = useCallback(() => {
    (async () => {
      try {
        const groups = await axios("/api/groups/fetch-groups", {
          method: "POST",
          data: { ...fetchData },
        });

        dispatch(fetchGroups({ groups: groups.data?.groups }));
      } catch (error) {
        console.error("Error fetching groups from db: ", error);
      }
    })();
  }, [dispatch, fetchData]);

  useEffect(() => {
    fetchGroupsFromDb();
  }, [fetchGroupsFromDb, groups.length, groups]);
  //should updating a resource refetch all groups?
  //seems like a possible expensive operation

  return {
    groups,
    isLoading,
  };
};

export default useFetchGroups;
