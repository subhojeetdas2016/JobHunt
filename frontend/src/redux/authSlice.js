import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null // Default user state
    },
    reducers: {
        setloading: (state, action) => {
            state.loading = action.payload; // Update loading state
        },
        setUser: (state, action) => {
            state.user = action.payload; // Correctly update user state
        }
    }
});

export const { setloading, setUser } = authSlice.actions;
export default authSlice.reducer;
