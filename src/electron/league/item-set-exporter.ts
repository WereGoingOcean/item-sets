import { ILeaguePathProvider } from './league-path-provider';
import { ItemSets } from '../models/league/item-set';
import { promises } from 'fs';

export default class ItemSetExporter {
	readonly pathProvider: ILeaguePathProvider;

	constructor(pathProvider: ILeaguePathProvider) {
		this.pathProvider = pathProvider;
	}

	public export_item_sets(itemSets: ItemSets) {
		const basePath = this.pathProvider.getLeaguePath();

		itemSets.itemSets.forEach(async (sets, champ) => {
			const championPath = `${basePath}\\Config\\Champions\\${champ}\\Recommended`;

			console.log(`Writing ${sets.length} to ${championPath}`);

			await promises.mkdir(championPath, {
				recursive: true,
			});

			sets.forEach(async (set) => {
				const fileName = `${championPath}\\LIS-PATCH_NUM-${set.title}.json`;
				try {
					await promises.writeFile(
						fileName,
						JSON.stringify(set, null, 2)
					);
				} catch (err) {
					console.log(`Error writing file ${fileName}. ${err}`);
				}
			});
		});
	}
}
