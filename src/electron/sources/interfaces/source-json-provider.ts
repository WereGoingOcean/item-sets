import { ISourceJson } from '../../league/item-set-creator';

export class SourceJsonRequest {
	public readonly LeaguePatchVersion: string;

	public readonly ChampionId: string;

	constructor(patch: string, champion: string) {
		this.LeaguePatchVersion = patch;
		this.ChampionId = champion;
	}
}

export interface ISourceJsonProvider {
	//Gets JSON for conversion from a source
	getSourceJson(request: SourceJsonRequest): Promise<ISourceJson>;
}
