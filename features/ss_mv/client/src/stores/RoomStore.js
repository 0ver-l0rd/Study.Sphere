import { createSlice } from '@reduxjs/toolkit';
import { RoomType } from '../../../types/Rooms';
/**
 * Colyseus' real time room list always includes the public lobby so we have to remove it manually.
 */
const isCustomRoom = (room) => {
    return room.name === RoomType.CUSTOM;
};
export const roomSlice = createSlice({
    name: 'room',
    initialState: {
        lobbyJoined: false,
        roomJoined: false,
        roomId: '',
        roomName: '',
        roomDescription: '',
        availableRooms: new Array(),
    },
    reducers: {
        setLobbyJoined: (state, action) => {
            state.lobbyJoined = action.payload;
        },
        setRoomJoined: (state, action) => {
            state.roomJoined = action.payload;
        },
        setJoinedRoomData: (state, action) => {
            state.roomId = action.payload.id;
            state.roomName = action.payload.name;
            state.roomDescription = action.payload.description;
        },
        setAvailableRooms: (state, action) => {
            state.availableRooms = action.payload.filter((room) => isCustomRoom(room));
        },
        addAvailableRooms: (state, action) => {
            if (!isCustomRoom(action.payload.room))
                return;
            const roomIndex = state.availableRooms.findIndex((room) => room.roomId === action.payload.roomId);
            if (roomIndex !== -1) {
                state.availableRooms[roomIndex] = action.payload.room;
            }
            else {
                state.availableRooms.push(action.payload.room);
            }
        },
        removeAvailableRooms: (state, action) => {
            state.availableRooms = state.availableRooms.filter((room) => room.roomId !== action.payload);
        },
    },
});
export const { setLobbyJoined, setRoomJoined, setJoinedRoomData, setAvailableRooms, addAvailableRooms, removeAvailableRooms, } = roomSlice.actions;
export default roomSlice.reducer;
