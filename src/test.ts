import UGGSourceJsonProvider from './electron/sources/u-gg/u-gg-source-json-provider';
import { SourceJsonRequest } from './electron/sources/interfaces/source-json-provider';
import UggItemSetCreator from './electron/sources/u-gg/u-gg-item-set-creator';
import { ItemSet, ItemSets } from './electron/models/league/item-set';
import ItemSetExporter from './electron/league/item-set-exporter';
import { HardCodedPathProvider } from './electron/league/league-path-provider';
import LeaguePatchProvider from './electron/league/league-patch-provider';
import ChampNameProvider from './electron/league/champ-name-provider';

var provider = new UGGSourceJsonProvider();

var creator = new UggItemSetCreator();

LeaguePatchProvider.getNaPatchVersion().then((leagueVersion) => {
	ChampNameProvider.getAllChampIds().then((ids) => {
		const map = new Map<string, ItemSet[]>();

		Promise.all(
			ids.map(async (id) => {
				var champData = await provider.getSourceJson(
					new SourceJsonRequest(leagueVersion, id)
				);
				const itemSets = await creator.createItemSet(
					champData,
					id,
					leagueVersion
				);

				map.set(
					await ChampNameProvider.getNameForChampId(id),
					itemSets
				);
			})
		).then(() => {
			console.log(map);

			const setExporter = new ItemSetExporter(
				new HardCodedPathProvider()
			);

			setExporter.export_item_sets(new ItemSets(map), leagueVersion);
		});
	});
});
