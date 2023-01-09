import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type INITIAL_STATE = {
  refetchTriggers: Array<any>;
  groups: Array<{
    _id: string;
    groupName: string;
    category: string;
    resources: string[];
  }>;
};

const initialState: INITIAL_STATE = {
  groups: [],
  refetchTriggers: [],
};

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    addGroup: (
      state: INITIAL_STATE,
      action: PayloadAction<{ group: INITIAL_STATE["groups"][number] }>
    ) => {
      state.groups.push(action.payload?.group);
    },
    fetchGroups: (
      state: INITIAL_STATE,
      action: PayloadAction<{ groups: INITIAL_STATE["groups"] }>
    ) => {
      state.groups = action.payload.groups;
    },
    removeGroup: (state, action: PayloadAction<{ groupId: string }>) => {
      state.groups = state.groups.filter(
        (group) => group._id !== action.payload.groupId
      );
    },
    //not sure this is needed anymore
    updateResourceInGroup: (
      state: INITIAL_STATE,
      action: PayloadAction<{
        group: INITIAL_STATE["groups"][number];
        resourceId: string;
      }>
    ) => {
      //locate index of payload group
      const groupIndex = state.groups.findIndex(
        (group) => group._id === action.payload.group._id
      );
      //locate index of payload resource
    },
    addResourcesToGroup: (
      state,
      action: PayloadAction<{
        group: INITIAL_STATE["groups"][number];
        resources: INITIAL_STATE["groups"][number]["resources"];
      }>
    ) => {
      //locate index of payload group
      const groupIndex = state.groups.findIndex(
        (group) => group._id === action.payload.group._id
      );
      if (action.payload.resources.length > 0) {
        //action will provide all resources in group
        //shouldn't it just provide the new ones?
        state.groups[groupIndex].resources = action.payload.resources;
      }
    },
    deleteResourceInGroup: (
      state,
      action: PayloadAction<{
        group: INITIAL_STATE["groups"][number];
        resourceId: string;
      }>
    ) => {
      //locate index of payload group
      const groupIndex = state.groups.findIndex(
        (group) => group._id === action.payload.group._id
      );

      const filteredResources = state.groups[groupIndex].resources.filter(
        (resource) => resource !== action.payload.resourceId
      );
      //set resources to filtered resources
      state.groups[groupIndex].resources = filteredResources;
    },
    updateGroup: (
      state,
      action: PayloadAction<{
        group: INITIAL_STATE["groups"][number];
      }>
    ) => {
      //locate index of payload group
      const groupIndex = state.groups.findIndex(
        (group) => group._id === action.payload.group._id
      );
      if (action.payload.group !== null) {
        //add resource to group via index
        state.groups[groupIndex] = action.payload.group;
      }
    },
  },
});

export const {
  addGroup,
  fetchGroups,
  updateResourceInGroup,
  removeGroup,
  updateGroup,
  deleteResourceInGroup,
  addResourcesToGroup,
} = groupsSlice.actions;

export const groupState = (state: RootState) => state.groups;

export default groupsSlice.reducer;
