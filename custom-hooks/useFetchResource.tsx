import axios from "axios";
import useSWR from "swr";
import { GroupResource } from "../types/group.types";

type Props = {
  resourceId: string;
};

const fetcher = ({
  url,
  args,
}: {
  url: string;
  args: { resourceId: string };
}) =>
  axios(url, {
    method: "POST",
    data: args,
  });

const useFetchResource = ({
  resourceId,
}: Props): {
  resource: GroupResource;
  isResourceLoading: boolean;
  resourceFetchError: any;
} => {
  const { data, isLoading, error } = useSWR(
    { url: "/api/resources/resource", args: { resourceId } },
    fetcher
  );

  return {
    resource: data?.data?.resource,
    isResourceLoading: isLoading,
    resourceFetchError: error,
  };
};

export default useFetchResource;
