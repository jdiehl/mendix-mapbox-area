import { createElement, FunctionComponent } from "react";
import { MapContainer } from "./components/MapContainer";

import { MapboxContainerProps } from "../typings/MapboxProps";

declare function require(name: string): string;

export const preview: FunctionComponent<MapboxContainerProps> = props => {
    return <MapContainer {...props} />;
};

export function getPreviewCss(): string {
    return require("./styles/mapbox-gl.css");
}
