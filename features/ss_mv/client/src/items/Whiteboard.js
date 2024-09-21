import { ItemType } from '../../../types/Items';
import store from '../stores';
import Item from './Item';
import { openWhiteboardDialog } from '../stores/WhiteboardStore';
export default class Whiteboard extends Item {
    id;
    currentUsers = new Set();
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.itemType = ItemType.WHITEBOARD;
    }
    updateStatus() {
        if (!this.currentUsers)
            return;
        const numberOfUsers = this.currentUsers.size;
        this.clearStatusBox();
        if (numberOfUsers === 1) {
            this.setStatusBox(`${numberOfUsers} user`);
        }
        else if (numberOfUsers > 1) {
            this.setStatusBox(`${numberOfUsers} users`);
        }
    }
    onOverlapDialog() {
        if (this.currentUsers.size === 0) {
            this.setDialogBox('Press R to use whiteboard');
        }
        else {
            this.setDialogBox('Press R join');
        }
    }
    addCurrentUser(userId) {
        if (!this.currentUsers || this.currentUsers.has(userId))
            return;
        this.currentUsers.add(userId);
        this.updateStatus();
    }
    removeCurrentUser(userId) {
        if (!this.currentUsers || !this.currentUsers.has(userId))
            return;
        this.currentUsers.delete(userId);
        this.updateStatus();
    }
    openDialog(network) {
        if (!this.id)
            return;
        store.dispatch(openWhiteboardDialog(this.id));
        network.connectToWhiteboard(this.id);
    }
}
