import axios from "axios";
import useSWR from "swr";

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

const useFetchTasksOnResource = ({ resourceId }: Props) => {
  const { data, error, isLoading } = useSWR(
    resourceId
      ? {
          url: "/api/tasks/resource-tasks",
          args: { resourceId },
        }
      : null,
    fetcher
  );

  return {
    tasks: data?.data?.tasks,
    isTasksLoading: isLoading,
    tasksFetchError: error,
  };
};

export default useFetchTasksOnResource;
