import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice.js";
import messageReducer from "./messageSlice.js";
import socketReducer from "./socketSlice.js";
const store = configureStore({
    reducer:{
        user:userReducer,
        message:messageReducer,
        socket:socketReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['socket/setSocket'],
        // Ignore these paths in the state
        ignoredPaths: ['socket.socket'],
      },
    }),
});

export default store;