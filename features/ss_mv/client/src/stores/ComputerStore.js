import { createSlice } from '@reduxjs/toolkit';
import ShareScreenManager from '../web/ShareScreenManager';
import phaserGame from '../PhaserGame';
import { sanitizeId } from '../util';
const initialState = {
    computerDialogOpen: false,
    computerId: null,
    myStream: null,
    peerStreams: new Map(),
    shareScreenManager: null,
};
export const computerSlice = createSlice({
    name: 'computer',
    initialState,
    reducers: {
        openComputerDialog: (state, action) => {
            if (!state.shareScreenManager) {
                state.shareScreenManager = new ShareScreenManager(action.payload.myUserId);
            }
            const game = phaserGame.scene.keys.game;
            game.disableKeys();
            state.shareScreenManager.onOpen();
            state.computerDialogOpen = true;
            state.computerId = action.payload.computerId;
        },
        closeComputerDialog: (state) => {
            // Tell server the computer dialog is closed.
            const game = phaserGame.scene.keys.game;
            game.enableKeys();
            game.network.disconnectFromComputer(state.computerId);
            for (const { call } of state.peerStreams.values()) {
                call.close();
            }
            state.shareScreenManager?.onClose();
            state.computerDialogOpen = false;
            state.myStream = null;
            state.computerId = null;
            state.peerStreams.clear();
        },
        setMyStream: (state, action) => {
            state.myStream = action.payload;
        },
        addVideoStream: (state, action) => {
            state.peerStreams.set(sanitizeId(action.payload.id), {
                call: action.payload.call,
                stream: action.payload.stream,
            });
        },
        removeVideoStream: (state, action) => {
            state.peerStreams.delete(sanitizeId(action.payload));
        },
    },
});
export const { closeComputerDialog, openComputerDialog, setMyStream, addVideoStream, removeVideoStream, } = computerSlice.actions;
export default computerSlice.reducer;
