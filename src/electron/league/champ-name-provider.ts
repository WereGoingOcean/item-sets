import { promises, fstat } from 'fs';

export default class ChampNameProvider {
	public static async getNameForChampId(id: string): Promise<string> {
		if (this.champNameMap == null) {
			await this.loadChampNameMap();
		}

		return this.champNameMap.get(id);
	}

	public static async getAllChampIds() : Promise<Array<string>> {
		if (this.champNameMap == null) {
			await this.loadChampNameMap();
		}

		return Array.from(this.champNameMap.keys());
	}

	private static async loadChampNameMap() {
		this.champNameMap = new Map<string, string>();

		const rawData = await promises.readFile(
			'./static-data/champion-ids.json'
		);

		const jsonObject = JSON.parse(rawData.toString());

		Object.keys(jsonObject).forEach((key) => {
			this.champNameMap.set(key, jsonObject[key]);
		});
	}

	static champNameMap: Map<string, string> | null;
}
