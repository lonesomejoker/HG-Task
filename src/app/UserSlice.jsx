import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  user_details: null,
};

const userSlice = createSlice({
  name: "users_slice",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      state.users = [...state.users, action.payload];
    },
    
    updateUser: (state, action) => {
      const { id, data } = action.payload;
      const index = state.users.findIndex((user) => user.id === id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...data };
      }
    },

    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    userInfo: (state, action) => {
      state.user_details = action.payload;
    },
  },
});

export const { setUsers, addUser, updateUser, deleteUser, userInfo } =
  userSlice.actions;
export const usersReducer = userSlice.reducer;
