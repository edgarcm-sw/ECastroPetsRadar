import { envs } from "src/config/envs"

export const generateMapboxImage = (lon: number, lat: number): string => {
    const accessToken = envs.MAPBOX_TOKEN;
    const zoom = 11;
    const width = 800;
    const height = 400;
    return `https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/pin-l-embassy+f74e4e(${lon},${lat})/${lon},${lat},${zoom}/${width}x${height}?access_token=${accessToken}`;
}