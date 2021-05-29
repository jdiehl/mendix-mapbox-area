/**
 * This file was generated from Mapbox.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ListValue } from "mendix";

export interface MapboxContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    accessToken: string;
    incidences?: ListValue;
    width: string;
    height: string;
}

export interface MapboxPreviewProps {
    class: string;
    style: string;
    accessToken: string;
    incidences: {} | null;
    width: string;
    height: string;
}
