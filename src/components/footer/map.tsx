import * as React from "react";
import styled from "@emotion/styled";
import { PageWrapper } from "../page-wrapper";
import PigeonMap from "pigeon-maps";
import Marker from "pigeon-marker";

const MapWrapper = styled.div({
  paddingTop: 64,
  paddingBottom: 64,
});

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
  <MapWrapper id="map">
    <PageWrapper>
      <h3>{title}</h3>
      <PigeonMap defaultCenter={position} defaultZoom={12} height={250}>
        <Marker anchor={position} onClick={handleMarkerClick} />
      </PigeonMap>
    </PageWrapper>
  </MapWrapper>
);
