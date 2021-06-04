import { Big } from "big.js";
import { ListValue, ListAttributeValue } from "mendix";
import { FeatureCollection } from "geojson";
import data from "./opendatalab";
import { useEffect, useState } from "react";

interface LoadRegionsOptions {
    incidences?: ListValue;
    rsAttr?: ListAttributeValue<string>;
    levelAttr?: ListAttributeValue<Big>;
}

export function useRegions({ incidences, rsAttr, levelAttr }: LoadRegionsOptions): FeatureCollection | undefined {
    const [regions, setRegions] = useState<FeatureCollection>();

    useEffect(() => {
        if (incidences && incidences.status !== "available") {
            // we are still loading data
            return undefined;
        }

        // create the geo features
        const regions = JSON.parse(data);

        if (incidences !== undefined && rsAttr !== undefined && levelAttr !== undefined) {
            const levels: Record<string, number> = {};

            // fill levels index
            for (const item of incidences.items ?? []) {
                const rs = rsAttr.get(item).value;
                const level = Number(levelAttr.get(item).value);
                if (rs !== undefined && level !== undefined) {
                    levels[rs] = level;
                }
            }

            // ammend regions with incidence data
            for (const feature of regions.features) {
                const { RS } = feature.properties!;
                const level = levels[RS];
                if (level !== undefined) {
                    feature.properties!.level = level;
                }
            }
        }

        setRegions(regions);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [incidences?.status]);

    return regions;
}
