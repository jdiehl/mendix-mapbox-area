import { createElement, FunctionComponent } from "react";
import { MapContainer } from "./components/MapContainer";

import { MapboxContainerProps } from "../typings/MapboxProps";

import "./styles/mapbox-gl.css";

const Mapbox: FunctionComponent<MapboxContainerProps> = props => {
    return <MapContainer {...props} />;
};

export default Mapbox;
