import { Location, PointType } from "./types";

import { fetchPlacesForPoint } from "./maps";
import { generateGrid } from "./utils/grid";
import { writeFile } from "fs/promises";

const center: Location = {
    latitude: 43.24535695019029,
    longtitude: 76.88431101683803
};

const language = "ru";
const pointType: PointType = PointType.point_of_interest;

const main = async () => {
    const key = "key";
    const grid = generateGrid(center);

    const allPlaces: any[] = [];

    // парсинг grid системы
    for (let i = 0; i < grid.length; i++) {
        const point = grid[i];

        console.log(`Запрос ${i + 1}/${grid.length} → ${point.latitude}, ${point.longtitude} (${allPlaces.length} мест)`);

        const places = await fetchPlacesForPoint(point.latitude, point.longtitude, key);
        allPlaces.push(...places);
    }

    // убрать дублирование
    const uniqueMap = new Map<string, any>();
    allPlaces.forEach(place => uniqueMap.set(place.place_id, place));
    const uniquePlaces = Array.from(uniqueMap.values());

    console.log(`Всего мест: ${uniquePlaces.length}`);

    // сохранение в файл
    await writeFile("./out/places.json", JSON.stringify(uniquePlaces, null, 2), 'utf-8');
};

main();

export {
    center,
    language,
    pointType
}