import { IItemSetCreator, ISourceJson } from '../../league/item-set-creator';
import {
	ItemSet,
	Item,
	ItemBlock,
	ItemSets,
} from '../../models/league/item-set';

export default class UggItemSetCreator implements IItemSetCreator {
	createItemSet(sourceJson: ISourceJson): Array<ItemSet> {
		// Data is set up with 5 keys 1 - 5.
		// The keys match up to positions 1 - JG, 2 - SUP, 3 - BOT, 4 - TOP, 5 - MID

		// Inside each position is an array with 2 items. Item 0 is the data. Item 1 is the date accessed (Zulu).

		// The data item is also an array
		// Item 6 is 2 ints, Games won and games played

		const totalGamesPlayed = Object.keys(sourceJson).reduce((sum, key) => {
			const gamesArray: Array<number> = sourceJson[key][0][6];
			const gamesPlayed = gamesArray[1];

			return (sum += gamesPlayed);
		}, 0);

		console.log(`Total games ${totalGamesPlayed}`);

		// Filter to the roles that get more than 10% of play
		const validRoles = Object.keys(sourceJson).filter((key) => {
			const gamesPlayedForThisRole: number = sourceJson[key][0][6][1];

			return (gamesPlayedForThisRole / totalGamesPlayed) * 100 > 10;
		});

		console.log(`Valid Roles ${validRoles.length}`);

		const validRoleSets = validRoles
			.map((role) => sourceJson[role][0])
			.map((data) => {
				console.log(JSON.stringify(data));
				// Starting items is index 2
				// Has an array of games played, games won, item code array
				const startingItemBlock = this.generateItemBlock(
					data[2][2],
					'Starting Items'
				);

				//Core items is index 3
				//Same format as above
				const coreItemBlock = this.generateItemBlock(
					data[3][2],
					'Core Items'
				);

				//Rest of items live under index 5
				//Index 5 has arrays with the items
				//data[5][0] = 4th item, [5][1] = 5th item, [5][2] = 6th item
				//Each numbered item has an array of options ordered by pick rate
				//Those options are a 3 item array with id, wins, picks
				const fourthItemData: Array<Array<number>> = data[5][0];
				const fourthItemBlock = this.generateItemBlock(
					this.getItemOptionCodes(fourthItemData),
					'Fourth Item'
				);

				const fifthItemData: Array<Array<number>> = data[5][1];
				const fifthItemBlock = this.generateItemBlock(
					this.getItemOptionCodes(fifthItemData),
					'Fifth Item'
				);

				const sixthItemData: Array<Array<number>> = data[5][2];
				const sixthItemBlock = this.generateItemBlock(
					this.getItemOptionCodes(sixthItemData),
					'Sixth Item'
				);

				const itemSetForRole = new ItemSet('ChampionName-RoleName', [
					startingItemBlock,
					coreItemBlock,
					fourthItemBlock,
					fifthItemBlock,
					sixthItemBlock,
				]);

				return itemSetForRole;
			});

		return validRoleSets;
	}

	private getItemOptionCodes(optionArray: Array<Array<number>>) {
		return optionArray.map((opt) => opt[0]);
	}

	private generateItemBlock(itemIds: Array<number>, name: string): ItemBlock {
		//TODO have something else post-process for stuff like adding consumable blocks and fixing duplicate items by updating qty
		//Since their data just repeates the ID
		const items = itemIds.map((itemId) => new Item(itemId.toString()));

		return new ItemBlock(name, items);
	}
}
