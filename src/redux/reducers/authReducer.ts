import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AuthState {
    fullname: string,
    id: string,
    email: string,
    accesstoken: string,
    photoURL:string,
}

const initialState: AuthState = {
    fullname: '',
    id: '',
    email: '',
    accesstoken: '',
    photoURL: '',
};

const authSlice = createSlice({
    name: "auth",
    initialState: {
        authData: initialState
    },
    reducers: {
        addAuth: (state, action: PayloadAction<AuthState>) => {
            state.authData = action.payload;
        },

        removeAuth: (state) => {
            state.authData = initialState;
        },

        updateAuth: (state, action: PayloadAction<Partial<AuthState>>) => {
            state.authData = {
                ...state.authData,
                ...action.payload
            };
        }
    },
});

export const authReducer = authSlice.reducer;
export const { addAuth, removeAuth, updateAuth } = authSlice.actions;

export const authSelector = (state: RootState) => state.auth.authData;
