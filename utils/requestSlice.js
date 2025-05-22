import { createSlice } from "@reduxjs/toolkit";

const RequestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
      removeRequest: (state, action) => {
    return state.filter((request) => request._id !== action.payload);
  },
  },
});

export const { addRequests, removeRequest } = RequestSlice.actions;

export default RequestSlice.reducer;
