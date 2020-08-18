import {
	ISourceJsonProvider,
	SourceJsonRequest,
} from '../interfaces/source-json-provider';
import { ISourceJson } from '../../league/item-set-creator';

import axios from 'axios';

export default class UggSourceJsonProvider implements ISourceJsonProvider {
	private readonly UGGApiVersion = '1.1';
	private readonly UGGOverviewVersion = '1.4.0';

	private readonly worldKey = '12';
	private readonly platPlusKey = '10';

	private getUggChampionUrl(leagueVersion: string, championId: string) {
		return `https://stats2.u.gg/lol/${this.UGGApiVersion}/overview/${leagueVersion}/ranked_solo_5x5/${championId}/${this.UGGOverviewVersion}.json`;
	}

	async getSourceJson(request: SourceJsonRequest): Promise<ISourceJson> {
		const response = await axios.get(
			this.getUggChampionUrl(
				request.LeaguePatchVersion,
				request.ChampionId
			)
		);

		if (response.status != 200) {
			throw new Error(
				`Status ${response.status} (${
					response.statusText
				}) returned trying to load u.gg data for request: ${JSON.stringify(
					request
				)}`
			);
		}

		// Filter down to the worldwide data for plat and above
		return response.data[this.worldKey][this.platPlusKey];
	}
}
