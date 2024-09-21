import { createSlice } from '@reduxjs/toolkit';
import phaserGame from '../PhaserGame';
const initialState = {
    whiteboardDialogOpen: false,
    whiteboardId: null,
    whiteboardUrl: null,
    urls: new Map(),
};
export const whiteboardSlice = createSlice({
    name: 'whiteboard',
    initialState,
    reducers: {
        openWhiteboardDialog: (state, action) => {
            state.whiteboardDialogOpen = true;
            state.whiteboardId = action.payload;
            const url = state.urls.get(action.payload);
            if (url)
                state.whiteboardUrl = url;
            const game = phaserGame.scene.keys.game;
            game.disableKeys();
        },
        closeWhiteboardDialog: (state) => {
            const game = phaserGame.scene.keys.game;
            game.enableKeys();
            game.network.disconnectFromWhiteboard(state.whiteboardId);
            state.whiteboardDialogOpen = false;
            state.whiteboardId = null;
            state.whiteboardUrl = null;
        },
        setWhiteboardUrls: (state, action) => {
            state.urls.set(action.payload.whiteboardId, `https://wbo.ophir.dev/boards/sky-office-${action.payload.roomId}`);
        },
    },
});
export const { openWhiteboardDialog, closeWhiteboardDialog, setWhiteboardUrls } = whiteboardSlice.actions;
export default whiteboardSlice.reducer;
