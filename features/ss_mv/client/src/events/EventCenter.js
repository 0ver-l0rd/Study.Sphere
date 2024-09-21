import Phaser from 'phaser';
export const phaserEvents = new Phaser.Events.EventEmitter();
export var Event;
(function (Event) {
    Event["PLAYER_JOINED"] = "player-joined";
    Event["PLAYER_UPDATED"] = "player-updated";
    Event["PLAYER_LEFT"] = "player-left";
    Event["PLAYER_DISCONNECTED"] = "player-disconnected";
    Event["MY_PLAYER_READY"] = "my-player-ready";
    Event["MY_PLAYER_NAME_CHANGE"] = "my-player-name-change";
    Event["MY_PLAYER_TEXTURE_CHANGE"] = "my-player-texture-change";
    Event["MY_PLAYER_VIDEO_CONNECTED"] = "my-player-video-connected";
    Event["ITEM_USER_ADDED"] = "item-user-added";
    Event["ITEM_USER_REMOVED"] = "item-user-removed";
    Event["UPDATE_DIALOG_BUBBLE"] = "update-dialog-bubble";
})(Event || (Event = {}));
