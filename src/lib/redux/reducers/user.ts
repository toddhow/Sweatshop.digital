import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@types';

const initialState: User = null;

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser(state, action: PayloadAction<User>) {
            state = action.payload;
            return state;
        },
    },
});

export const { updateUser } = user.actions;

export default user.reducer;
