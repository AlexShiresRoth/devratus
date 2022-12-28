import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type INITIAL_STATE = {
  groups: Array<{
    _id: string;
    groupName: string;
    category: string;
    resources:
      | Array<{
          resourceName: string;
          resourceLink: string;
        }>
      | [];
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
  },
});

export const { addGroup, fetchGroups } = groupsSlice.actions;

export const groupState = (state: RootState) => state.groups;

export default groupsSlice.reducer;
