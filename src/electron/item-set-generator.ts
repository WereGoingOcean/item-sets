import GenerationOptions from './generation-options';
import { UGG_Id } from './sources/sources';
import {
	ISourceJsonProvider,
	SourceJsonRequest,
} from './sources/interfaces/source-json-provider';
import { IItemSetCreator } from './league/item-set-creator';
import UggSourceJsonProvider from './sources/u-gg/u-gg-source-json-provider';
import UggItemSetCreator from './sources/u-gg/u-gg-item-set-creator';
import LeaguePatchProvider from './league/league-patch-provider';
import ChampNameProvider from './league/champ-name-provider';
import { ItemSet, ItemSets } from './models/league/item-set';
import ItemSetExporter from './league/item-set-exporter';
import { HardCodedPathProvider } from './league/league-path-provider';

export default class ItemSetGenerator {
	static async generateItemSets(options: GenerationOptions): Promise<void> {
		// Currently only supports a single provider
		const selectedProvider = options.providers[0];

		let provider: ISourceJsonProvider;
		let creator: IItemSetCreator;

		switch (selectedProvider) {
			case UGG_Id:
				provider = new UggSourceJsonProvider();
				creator = new UggItemSetCreator();
				break;
			default:
				throw new Error('Unkown source');
		}

		const leagueVersion = await LeaguePatchProvider.getNaPatchVersion();

		const ids = await ChampNameProvider.getAllChampIds();
		const map = new Map<string, ItemSet[]>();

		await Promise.all(
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
		);
		const setExporter = new ItemSetExporter(new HardCodedPathProvider());

		setExporter.export_item_sets(new ItemSets(map), leagueVersion);
	}
}
