import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/redux-hooks";
import { fetchGroups, groupState } from "../redux/slices/groups.slice";
import useSWR from "swr";

//refetches or fetches all groups from db
const useFetchGroups = () => {
  const dispatch = useAppDispatch();
  const { groups } = useAppSelector(groupState);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchGroupsFromDb = useCallback(() => {
    (async () => {
      try {
        const groups = await axios("/api/groups/fetch-groups", {
          method: "POST",
        });

        dispatch(fetchGroups({ groups: groups.data?.groups }));
      } catch (error) {
        console.error("Error fetching groups from db: ", error);
      }
    })();
  }, [dispatch]);

  useMemo(() => {
    fetchGroupsFromDb();
  }, [fetchGroupsFromDb]);
  //should updating a resource refetch all groups?
  //seems like a possible expensive operation

  return {
    groups,
    isLoading,
  };
};

export default useFetchGroups;
