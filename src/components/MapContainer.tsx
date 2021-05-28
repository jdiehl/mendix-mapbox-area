import { createElement, FC, useState } from "react";
import ReactMapGL, { Source, Layer } from "react-map-gl";
import { fillLayer, strokeLayer } from "../lib/layers";
import { getRegions } from "../lib/regions";

interface MapContainerProps {
    accessToken: string;
    width: string;
    height: string;
}

export const MapContainer: FC<MapContainerProps> = ({ accessToken, width, height }) => {
    const [viewport, setViewport] = useState({
        latitude: 51.1543787,
        longitude: 8.2123835,
        zoom: 5
    });

    const regions = getRegions();

    return (
        <ReactMapGL
            mapboxApiAccessToken={accessToken}
            {...viewport}
            width={width || "100%"}
            height={height || "400px"}
            style="mapbox://styles/mapbox/light-v11"
            onViewportChange={(viewport: any) => setViewport(viewport)}
        >
            <Source id="regions" type="geojson" data={regions}>
                <Layer {...fillLayer} />
                <Layer {...strokeLayer} />
            </Source>
        </ReactMapGL>
    );
};
