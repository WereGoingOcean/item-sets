import { ItemSet } from '../models/league/item-set';

export interface IItemSetCreator {
	// Creates an item set from a source JSON input
	createItemSet(
		sourceJson: ISourceJson,
		championId: string,
		leagueVersion: string
	): Promise<Array<ItemSet>>;
}

export interface ISourceJson {
	[key: string]: any;
}
