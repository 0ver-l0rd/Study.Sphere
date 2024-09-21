import { createSlice } from '@reduxjs/toolkit';
import phaserGame from '../PhaserGame';
export var MessageType;
(function (MessageType) {
    MessageType[MessageType["PLAYER_JOINED"] = 0] = "PLAYER_JOINED";
    MessageType[MessageType["PLAYER_LEFT"] = 1] = "PLAYER_LEFT";
    MessageType[MessageType["REGULAR_MESSAGE"] = 2] = "REGULAR_MESSAGE";
})(MessageType || (MessageType = {}));
export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chatMessages: new Array(),
        focused: false,
        showChat: true,
    },
    reducers: {
        pushChatMessage: (state, action) => {
            state.chatMessages.push({
                messageType: MessageType.REGULAR_MESSAGE,
                chatMessage: action.payload,
            });
        },
        pushPlayerJoinedMessage: (state, action) => {
            state.chatMessages.push({
                messageType: MessageType.PLAYER_JOINED,
                chatMessage: {
                    createdAt: new Date().getTime(),
                    author: action.payload,
                    content: 'joined the lobby',
                },
            });
        },
        pushPlayerLeftMessage: (state, action) => {
            state.chatMessages.push({
                messageType: MessageType.PLAYER_LEFT,
                chatMessage: {
                    createdAt: new Date().getTime(),
                    author: action.payload,
                    content: 'left the lobby',
                },
            });
        },
        setFocused: (state, action) => {
            const game = phaserGame.scene.keys.game;
            action.payload ? game.disableKeys() : game.enableKeys();
            state.focused = action.payload;
        },
        setShowChat: (state, action) => {
            state.showChat = action.payload;
        },
    },
});
export const { pushChatMessage, pushPlayerJoinedMessage, pushPlayerLeftMessage, setFocused, setShowChat, } = chatSlice.actions;
export default chatSlice.reducer;
