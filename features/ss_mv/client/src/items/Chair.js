import { ItemType } from '../../../types/Items';
import Item from './Item';
export default class Chair extends Item {
    itemDirection;
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.itemType = ItemType.CHAIR;
    }
    onOverlapDialog() {
        this.setDialogBox('Press E to sit');
    }
}
