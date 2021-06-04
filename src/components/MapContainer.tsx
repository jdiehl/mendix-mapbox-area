import { createElement, FC, useRef, useState } from "react";
import ReactMapGL, { Source, Layer, Popup, MapEvent } from "react-map-gl";
import { ListValue, ListAttributeValue } from "mendix";
import { fillLayer, strokeLayer } from "../lib/layers";
import { useRegions } from "../lib/useRegions";
import Big from "big.js";

interface MapContainerProps {
    accessToken: string;
    width: string;
    height: string;
    incidences?: ListValue;
    rsAttr?: ListAttributeValue<string>;
    levelAttr?: ListAttributeValue<Big>;
}

interface PopupDef {
    latitude: number;
    longitude: number;
    title: string;
    text: string;
}

export const MapContainer: FC<MapContainerProps> = ({ accessToken, width, height, incidences, rsAttr, levelAttr }) => {
    // the map refernece (needed for queryRenderedFeatures)
    const mapRef = useRef<any>(null);

    // the viewport state
    const [viewport, setViewport] = useState({
        latitude: 51.1543787,
        longitude: 8.2123835,
        zoom: 5
    });

    // the popup state
    const [popup, setPopup] = useState<PopupDef | null>(null);

    // the regions state
    const regions = useRegions({ incidences, rsAttr, levelAttr });

    // on click: show a popup of the clicked feature
    const onClick = (e: MapEvent): void => {
        const bbox = [e.point, e.point];
        const features = mapRef.current!.queryRenderedFeatures(bbox, { layers: ["fill"] });
        if (features.length <= 0) {
            setPopup(null);
        }
        const feature = features[0];
        setPopup({
            longitude: e.lngLat[0],
            latitude: e.lngLat[1],
            title: feature.properties.GEN,
            text: `Inzidenz: ${feature.properties.level}`
        });
    };

    return (
        <ReactMapGL
            ref={mapRef}
            mapboxApiAccessToken={accessToken}
            {...viewport}
            width={width || "100%"}
            height={height || "80vh"}
            style="mapbox://styles/mapbox/light-v11"
            onViewportChange={(viewport: any) => setViewport(viewport)}
            onClick={onClick}
        >
            {regions && (
                <Source id="regions" type="geojson" data={regions}>
                    <Layer {...fillLayer} />
                    <Layer {...strokeLayer} />
                </Source>
            )}

            {popup && (
                <Popup
                    latitude={popup.latitude}
                    longitude={popup.longitude}
                    closeButton
                    closeOnClick={false}
                    onClose={() => setPopup(null)}
                    anchor="top"
                >
                    <div>
                        <strong>{popup.title}</strong>
                        <p>{popup.text}</p>
                    </div>
                </Popup>
            )}
        </ReactMapGL>
    );
};
