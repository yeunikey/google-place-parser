import { language, pointType } from "./runner";

import { ApiRequest } from "./types";
import { sleep } from "./utils/steam";
import xior from "xior";

const endpoint = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

const fetchPlacesForPoint = async (lat: number, lng: number, key: string) => {
    let allResults: any[] = [];
    let nextPageToken: string | undefined = undefined;
    let page = 1;

    do {
        const params: any = {
            key,
            language: language,
            radius: 2000,
            type: pointType,
            location: `${lat},${lng}`,
        };

        if (nextPageToken) {
            params.pagetoken = nextPageToken;
            await sleep(3000);
        }

        const response = await xior.get<ApiRequest<any[]>>(endpoint, { params });

        if (response.data.status !== 'OK' && response.data.status !== 'ZERO_RESULTS') {
            console.error("Ошибка:", response.data.status, response.data.error_message);
            break;
        }

        allResults.push(...response.data.results);
        nextPageToken = response.data.next_page_token;
        page++;

    } while (nextPageToken);

    return allResults;
};

export {
    fetchPlacesForPoint
}