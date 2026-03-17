import { envs } from "src/config/envs"

export const generateMapboxImage = (
    lostLon: number, lostLat: number,
    foundLon: number, foundLat: number
): string => {
    const accessToken = envs.MAPBOX_TOKEN;
    const zoom = 14;
    const width = 800;
    const height = 400;

    // Pin rojo
    const lostPin = `pin-l-embassy+f74e4e(${lostLon},${lostLat})`;

    // Pin verde
    const foundPin = `pin-l-embassy+00c853(${foundLon},${foundLat})`;

    return `https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/${lostPin},${foundPin}/auto/${width}x${height}?access_token=${accessToken}&padding=50`;
}