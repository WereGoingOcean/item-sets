import { ILeaguePathProvider } from './league-path-provider';
import { ItemSets } from '../models/league/item-set';
import { promises } from 'fs';
import LeaguePatchProvider from './league-patch-provider';

export default class ItemSetExporter {
	readonly pathProvider: ILeaguePathProvider;

	constructor(pathProvider: ILeaguePathProvider) {
		this.pathProvider = pathProvider;
	}

	public export_item_sets(itemSets: ItemSets, leaguePatch: string) {
		const basePath = this.pathProvider.getLeaguePath();

		itemSets.itemSets.forEach(async (sets, champ) => {
			const championPath = `${basePath}\\Config\\Champions\\${champ}\\Recommended`;

			console.log(`Writing ${sets.length} to ${championPath}`);

			await promises.mkdir(championPath, {
				recursive: true,
			});

			// Clear any old files from our app
			const regex = /LIS.*\.json$/;

			const existingFiles = await promises.readdir(championPath);

			await Promise.all(
				existingFiles
					.filter((f) => regex.test(f))
					.map(
						async (file) =>
							await promises.unlink(`${championPath}\\${file}`)
					)
			);

			sets.forEach(async (set) => {
				const fileName = `${championPath}\\LIS-${set.title}.json`;
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
