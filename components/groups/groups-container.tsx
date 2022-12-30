import GroupItem from "./group-item";
import { GroupType } from "../../types/group.types";
import useFetchGroups from "../../custom-hooks/useFetchGroups";

type Props = {
  userData: any;
};

const GroupsContainer = ({ userData }: Props) => {
  const { isLoading, groups } = useFetchGroups({ fetchData: userData });

  return (
    <div className="w-full flex flex-col items-center overflow-hidden ">
      <div className="w-11/12 flex flex-col gap-4  mt-10 overflow-hidden">
        <div className="flex flex-col gap-4 ">
          {groups.length > 0 &&
            groups?.map((group: GroupType) => (
              <GroupItem group={group} key={group?._id} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default GroupsContainer;
