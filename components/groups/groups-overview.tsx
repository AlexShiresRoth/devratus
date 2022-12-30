import React from "react";
import useFetchGroups from "../../custom-hooks/useFetchGroups";

type Props = {
  userData: any;
};

const GroupsOverview = ({ userData }: Props) => {
  const { isLoading, groups } = useFetchGroups({ fetchData: userData });

  return <div>GroupsOverview</div>;
};

export default GroupsOverview;
