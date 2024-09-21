import { ItemType } from '../../../types/Items';
import store from '../stores';
import Item from './Item';
import { openComputerDialog } from '../stores/ComputerStore';
export default class Computer extends Item {
    id;
    currentUsers = new Set();
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.itemType = ItemType.COMPUTER;
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
            this.setDialogBox('Press R to use computer');
        }
        else {
            this.setDialogBox('Press R join');
        }
    }
    addCurrentUser(userId) {
        if (!this.currentUsers || this.currentUsers.has(userId))
            return;
        this.currentUsers.add(userId);
        const computerState = store.getState().computer;
        if (computerState.computerId === this.id) {
            computerState.shareScreenManager?.onUserJoined(userId);
        }
        this.updateStatus();
    }
    removeCurrentUser(userId) {
        if (!this.currentUsers || !this.currentUsers.has(userId))
            return;
        this.currentUsers.delete(userId);
        const computerState = store.getState().computer;
        if (computerState.computerId === this.id) {
            computerState.shareScreenManager?.onUserLeft(userId);
        }
        this.updateStatus();
    }
    openDialog(playerId, network) {
        if (!this.id)
            return;
        store.dispatch(openComputerDialog({ computerId: this.id, myUserId: playerId }));
        network.connectToComputer(this.id);
    }
}
