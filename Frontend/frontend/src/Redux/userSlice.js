import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    // authUser means only authenticated user can able to access the data
    authUser: null,
    otherUsers: null,
    selectedUsers: null,
    onlineUsers:null,
  },
  reducers: {
    // using reducers state and action we can able to change the initial state of object
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    setSelectedUsers: (state, action) => {
      state.selectedUsers = action.payload;
    },
    setOnlineUsers:(state,action)=>{
      state.onlineUsers = action.payload;
    },
    logout: (state) => {
      state.authUser = null; // Reset authUser to null on logout
    },
  },
});

export const { setAuthUser, setOtherUsers, setSelectedUsers,setOnlineUsers, logout } =
  userSlice.actions;
export default userSlice.reducer;
