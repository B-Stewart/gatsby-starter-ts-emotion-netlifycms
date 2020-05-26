import * as React from "react";
import styled from "@emotion/styled";
import PigeonMap from "pigeon-maps";
import Marker from "pigeon-marker";

interface IMapProps {
  handleMarkerClick?: () => any;
  position: number[];
  title: string;
}
// http://{s}.tile.osm.org/{z}/{x}/{y}.png
export const Map: React.SFC<IMapProps> = ({
  handleMarkerClick,
  position,
  title,
}) => (
  <div id="map">
    <h2 className="text-center text-2xl mb-4">{title}</h2>
    <div className="children-block">
      <PigeonMap defaultCenter={position} defaultZoom={12} height={250}>
        <Marker anchor={position} onClick={handleMarkerClick} />
      </PigeonMap>
    </div>
  </div>
);
