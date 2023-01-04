import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type INITIAL_STATE = {
  groups: Array<{
    _id: string;
    groupName: string;
    category: string;
    resources: Array<{
      _id: string;
      resourceName: string;
      resourceLink: string;
    }>;
  }>;
};

const initialState: INITIAL_STATE = {
  groups: [],
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
    updateResourceInGroup: (
      state: INITIAL_STATE,
      action: PayloadAction<{
        group: INITIAL_STATE["groups"][number];
        resource: INITIAL_STATE["groups"][number]["resources"][number];
      }>
    ) => {
      //locate index of payload group
      const groupIndex = state.groups.findIndex(
        (group) => group._id === action.payload.group._id
      );
      //locate index of payload resource
      const resourceIndex = state.groups[groupIndex].resources.findIndex(
        (resource) => resource._id === action.payload.resource._id
      );
      //update resource in group via index
      state.groups[groupIndex].resources[resourceIndex] =
        action.payload.resource;
    },
    addResourceToGroup: (
      state,
      action: PayloadAction<{
        group: INITIAL_STATE["groups"][number];
        resource: INITIAL_STATE["groups"][number]["resources"][number];
      }>
    ) => {
      //locate index of payload group
      const groupIndex = state.groups.findIndex(
        (group) => group._id === action.payload.group._id
      );
      if (action.payload.resource !== null) {
        //add resource to group via index
        state.groups[groupIndex].resources.unshift(action.payload.resource);
      }
    },
    deleteResourceInGroup: (
      state,
      action: PayloadAction<{
        group: INITIAL_STATE["groups"][number];
        resource: INITIAL_STATE["groups"][number]["resources"][number];
      }>
    ) => {
      //locate index of payload group
      const groupIndex = state.groups.findIndex(
        (group) => group._id === action.payload.group._id
      );

      const filteredResources = state.groups[groupIndex].resources.filter(
        (resource) => resource._id !== action.payload.resource._id
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
  addResourceToGroup,
} = groupsSlice.actions;

export const groupState = (state: RootState) => state.groups;

export default groupsSlice.reducer;
