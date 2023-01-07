export type GroupType = {
  _id: string;
  groupName: string;
  category: string;
  resources: string[];
};

export type GroupResource = {
  resourceName: string;
  resourceLink: string;
  _id: string;
  resourceImage: string;
};
