import { FeatureCollection } from "geojson";
import data from "./opendatalab";

export function getRegions(): FeatureCollection {
    const regions: FeatureCollection = JSON.parse(data);
    return regions;
}
