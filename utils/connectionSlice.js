import { createSlice } from "@reduxjs/toolkit";


const ConnectionSlice = createSlice({
    name: "connections",
    initialState: null,
    reducers: {
        addConnections: (state, action) => {
            return action.payload;
        },
        removeConnections: (state, action) => {
            return null;
        }
    }
})

export const {addConnections} = ConnectionSlice.actions;

export default ConnectionSlice.reducer;