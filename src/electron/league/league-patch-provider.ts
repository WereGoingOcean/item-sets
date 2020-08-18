import axios from "axios";

export default class LeaguePatchProvider {
    static async getNaPatchVersion() : Promise<string> {
        const response = await axios.get('https://ddragon.leagueoflegends.com/realms/na.json');

        if (response.status != 200) {
            throw new Error('Invalid Realms response.');
        }

        const v : string = response.data.v;

        const leagueVersion = v.substring(0, v.lastIndexOf('.'));

        return leagueVersion;
    }
}