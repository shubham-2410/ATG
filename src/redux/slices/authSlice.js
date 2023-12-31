import { createSlice } from "@reduxjs/toolkit";
const userString = localStorage.getItem("user");
const tokenString = localStorage.getItem("token");

const initialState = {
    user: userString && userString !== "undefined" && userString !== null ? JSON.parse(userString) : null,
    token: tokenString && tokenString !== "undefined" && tokenString !== null ? JSON.parse(tokenString) : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, value) => {
            state.user = value.payload;
        },
        setToken(state, action) {
            state.token = action.payload;
        },
    },
});

export const { setUser, setToken } = authSlice.actions;
export default authSlice.reducer;
