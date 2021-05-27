import { LayerProps } from "react-map-gl";

export const fillLayer: LayerProps = {
    id: "fill",
    type: "fill",
    paint: {
        "fill-color": {
            property: "level",
            stops: [
                [1, "#0080ff"],
                [2, "#ff8000"]
            ]
        },
        "fill-opacity": 0.5
    }
};

export const strokeLayer: LayerProps = {
    id: "outline",
    type: "line",
    source: "regions",
    layout: {},
    paint: {
        "line-color": "#000",
        "line-width": 1
    }
};
