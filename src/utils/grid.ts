import { Location } from "../types";

const latStep = 0.0135; // ≈ 1.5 км
const lngStep = 0.0175;

const gridSize = 3;

const generateGrid = (center: Location) => {
    const points = [];
    for (let dy = -gridSize; dy <= gridSize; dy++) {
        for (let dx = -gridSize; dx <= gridSize; dx++) {
            points.push({
                latitude: center.latitude + dy * latStep,
                longtitude: center.longtitude + dx * lngStep,
            });
        }
    }
    return points;
};

export {
    gridSize,
    generateGrid,

    latStep,
    lngStep
}