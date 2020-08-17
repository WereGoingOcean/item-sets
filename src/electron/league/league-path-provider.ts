export interface ILeaguePathProvider {
	getLeaguePath(): string;
}

export class HardCodedPathProvider implements ILeaguePathProvider {
	// For now just hard code the default path
	getLeaguePath() {
		return 'C:\\Riot Games\\League of Legends';
	}
}
