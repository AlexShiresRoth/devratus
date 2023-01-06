import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import { GroupType } from "../types/group.types";

type Props = {
  groupId: string;
};

const useFetchGroup = ({ groupId }: Props) => {
  const [group, setGroup] = useState<GroupType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGroup = useCallback(async () => {
    if (!groupId) return;
    try {
      setIsLoading(true);
      const res = await axios(`/api/groups/fetch-group`, {
        method: "POST",
        data: { groupId },
      });

      if (res.status !== 200) throw new Error(res.data.message);

      const data = await res.data;
      setGroup(data.group);
    } catch (error) {
      console.error("Error fetching group: ", error);
      setError(JSON.stringify(error));
    }
  }, [groupId]);

  useMemo(() => {
    fetchGroup();
  }, [fetchGroup]);

  return { group, isGroupLoading: isLoading, fetchGroupError: error };
};

export default useFetchGroup;
