import { createSlice } from '@reduxjs/toolkit';
import { sanitizeId } from '../util';
import { BackgroundMode } from '../../../types/BackgroundMode';
import phaserGame from '../PhaserGame';
export function getInitialBackgroundMode() {
    const currentHour = new Date().getHours();
    return currentHour > 6 && currentHour <= 18 ? BackgroundMode.DAY : BackgroundMode.NIGHT;
}
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        backgroundMode: getInitialBackgroundMode(),
        sessionId: '',
        videoConnected: false,
        loggedIn: false,
        playerNameMap: new Map(),
        showJoystick: window.innerWidth < 650,
    },
    reducers: {
        toggleBackgroundMode: (state) => {
            const newMode = state.backgroundMode === BackgroundMode.DAY ? BackgroundMode.NIGHT : BackgroundMode.DAY;
            state.backgroundMode = newMode;
            const bootstrap = phaserGame.scene.keys.bootstrap;
            bootstrap.changeBackgroundMode(newMode);
        },
        setSessionId: (state, action) => {
            state.sessionId = action.payload;
        },
        setVideoConnected: (state, action) => {
            state.videoConnected = action.payload;
        },
        setLoggedIn: (state, action) => {
            state.loggedIn = action.payload;
        },
        setPlayerNameMap: (state, action) => {
            state.playerNameMap.set(sanitizeId(action.payload.id), action.payload.name);
        },
        removePlayerNameMap: (state, action) => {
            state.playerNameMap.delete(sanitizeId(action.payload));
        },
        setShowJoystick: (state, action) => {
            state.showJoystick = action.payload;
        },
    },
});
export const { toggleBackgroundMode, setSessionId, setVideoConnected, setLoggedIn, setPlayerNameMap, removePlayerNameMap, setShowJoystick, } = userSlice.actions;
export default userSlice.reducer;
