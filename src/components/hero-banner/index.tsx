import * as React from "react";
import styled from "@emotion/styled";
import { colors, mediaQuery } from "../../utilities";

interface IHeroBannerProps {
  backgroundImageSrc: string;
  title?: string;
}

const BannerWrapper = styled.div({
  position: "relative",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize: "cover",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "70vh",
});

const Text = styled.div({
  textTransform: "uppercase",
  color: colors.light,
  fontSize: 28,
  letterSpacing: 1,
  textAlign: "center",
  fontWeight: 300,
  [mediaQuery.greaterThan.lg]: {
    fontSize: 32,
  },
});

export const HeroBanner: React.SFC<IHeroBannerProps> = ({
  backgroundImageSrc,
  title,
}) => (
  <BannerWrapper
    css={{
      backgroundImage: `url(${backgroundImageSrc})`,
    }}
  >
    <Text>{title}</Text>
  </BannerWrapper>
);

HeroBanner.displayName = "HeroBanner";
