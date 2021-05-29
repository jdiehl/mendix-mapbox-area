import { useEffect, useState } from "react";
import { ListValue } from "mendix";
import { FeatureCollection } from "geojson";
import data from "./opendatalab";

export function useRegions(incidences: ListValue | undefined): FeatureCollection | undefined {
    const [regions, setRegions] = useState<FeatureCollection | undefined>(undefined);

    useEffect(() => {
        // extract guids from items
        const guids: string[] = incidences?.items?.map(obj => obj.id) || [];

        // define callback for data retrieval
        const callback = (items: any): void => {
            (window as any).items = items;
            // load regions
            const regions: FeatureCollection = JSON.parse(data);

            // ammend regions with incidence data
            for (const feature of regions.features) {
                const { RS } = feature.properties!;
                const rsItems = items.filter((item: any) => item.jsonData.attributes.RS.value === RS);
                if (rsItems.length > 0) {
                    feature.properties!.incidence = parseFloat(rsItems[0].jsonData.attributes.Incidence.value);
                }
            }

            // update state
            setRegions(regions);
        };

        // load items
        (window as any).mx.data.get({ guids, callback });
    }, [incidences]);

    return regions;
}
