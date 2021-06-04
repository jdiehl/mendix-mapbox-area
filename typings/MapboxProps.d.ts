/**
 * This file was generated from Mapbox.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ListValue, ListAttributeValue } from "mendix";
import { Big } from "big.js";

export interface MapboxContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    accessToken: string;
    incidences?: ListValue;
    rsAttr?: ListAttributeValue<string>;
    levelAttr?: ListAttributeValue<Big>;
    width: string;
    height: string;
}

export interface MapboxPreviewProps {
    class: string;
    style: string;
    accessToken: string;
    incidences: {} | null;
    rsAttr: string;
    levelAttr: string;
    width: string;
    height: string;
}
