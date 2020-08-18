import UGGSourceJsonProvider from './electron/sources/u-gg/u-gg-source-json-provider';
import { SourceJsonRequest } from './electron/sources/interfaces/source-json-provider';
import UggItemSetCreator from './electron/sources/u-gg/u-gg-item-set-creator';
import { ItemSet, ItemSets } from './electron/models/league/item-set';
import ItemSetExporter from './electron/league/item-set-exporter';
import { HardCodedPathProvider } from './electron/league/league-path-provider';
import LeaguePatchProvider from './electron/league/league-patch-provider';

var provider = new UGGSourceJsonProvider();

var creator = new UggItemSetCreator();

LeaguePatchProvider.getNaPatchVersion().then((leagueVersion) => {
	provider
		.getSourceJson(new SourceJsonRequest(leagueVersion, '1'))
		.then(async (annieData) => {
			const itemSets = await creator.createItemSet(
				annieData,
				'1',
				leagueVersion
			);

			const map = new Map<string, ItemSet[]>();

			map.set('Annie', itemSets);

			const setExporter = new ItemSetExporter(
				new HardCodedPathProvider()
			);

			setExporter.export_item_sets(new ItemSets(map), leagueVersion);
		});
});
