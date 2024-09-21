import { enableMapSet } from 'immer';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserStore';
import computerReducer from './ComputerStore';
import whiteboardReducer from './WhiteboardStore';
import chatReducer from './ChatStore';
import roomReducer from './RoomStore';
enableMapSet();
const store = configureStore({
    reducer: {
        user: userReducer,
        computer: computerReducer,
        whiteboard: whiteboardReducer,
        chat: chatReducer,
        room: roomReducer,
    },
    // Temporary disable serialize check for redux as we store MediaStream in ComputerStore.
    // https://stackoverflow.com/a/63244831
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});
export default store;
