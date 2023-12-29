import { configureStore, createSlice } from "@reduxjs/toolkit";


const loginInitialState = { isLogin: true, token: '' };

const loginSlice = createSlice({
    name: 'login',
    initialState: loginInitialState,
    reducers: {
        changeLogin: (state) => {
            state.isLogin = !state.isLogin;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        }
    }
})

const store = configureStore({
    reducer: loginSlice.reducer
});

export const loginActions = loginSlice.actions;

export default store;