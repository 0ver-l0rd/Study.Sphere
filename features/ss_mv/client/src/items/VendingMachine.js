import { ItemType } from '../../../types/Items';
import Item from './Item';
export default class VendingMachine extends Item {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.itemType = ItemType.VENDINGMACHINE;
    }
    onOverlapDialog() {
        this.setDialogBox('Press R to buy a coffee :)');
    }
}
