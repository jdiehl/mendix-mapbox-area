import { LayerProps } from "react-map-gl";

export const fillLayer: LayerProps = {
    id: "fill",
    type: "fill",
    paint: {
        "fill-color": {
            property: "incidence",
            stops: [
                [0, "#77DD77"],
                [25, "#FACA4A"],
                [50, "#FF6161"],
                [100, "#CD45E9"]
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
