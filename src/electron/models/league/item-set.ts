export class Item {
	// League Item ID code
	readonly id: string;

	count: number;

	constructor(id: string, count: number = 1) {
		this.id = id;
		this.count = count;
	}
}

export class ItemBlock {
	// Key is type for some reason but it's really the block name
	readonly type: string;

	items: Item[];

	constructor(type: string, items: Item[]) {
		this.type = type;
		this.items = items;
	}
}

export class ItemSet {
	readonly map: string;

	readonly title: string;

	// Not sure what this one does
	readonly priority = false;

	readonly mode: string;

	readonly type = 'custom';

	readonly sortrank = 1;

	readonly blocks: ItemBlock[];

	constructor(title: string, blocks: ItemBlock[]) {
		this.title = title;
		this.blocks = blocks;
		this.map = 'any';
		this.mode = 'any';
	}
}

export class ItemSets {
	// Maps champ name to list of item sets for that champ
	readonly itemSets: Map<string, ItemSet[]>;

	constructor(itemSets: Map<string, ItemSet[]>) {
		this.itemSets = itemSets;
	}
}
