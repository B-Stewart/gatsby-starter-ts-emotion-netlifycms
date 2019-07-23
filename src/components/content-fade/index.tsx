import * as React from "react";
import styled from "@emotion/styled";
import { Wrapper } from "../wrapper";
import { colors, mediaQuery } from "../../utilities";

interface IBackgroundImage {
  backgroundUrl: string;
}

const ContentFadeWrapper = styled.div({
  position: "relative",
  backgroundColor: colors.neutral.base,
  paddingTop: 64,
  paddingBottom: 64,
});

const BackgroundImage = styled.div<IBackgroundImage>(({ backgroundUrl }) => ({
  position: "absolute",
  top: 0,
  bottom: 0,
  right: 0,
  left: "50%",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center right",
  backgroundSize: "cover",
  backgroundImage: "none",
  boxShadow: `100px 0px 100px 10px inset ${colors.neutral.base}`,
  [mediaQuery.greaterThan.lg]: {
    backgroundImage: `url(${backgroundUrl})`,
  },
}));

const ContentFadeFormWrapper = styled.div({
  maxWidth: 600,
  marginRight: "auto",
});

interface IContentFadeProps {
  imgSrc: string;
  id?: string;
}

export const ContentFade: React.SFC<IContentFadeProps> = ({
  imgSrc,
  children,
  id,
}) => {
  return (
    <ContentFadeWrapper id={id}>
      <BackgroundImage backgroundUrl={imgSrc} />
      <Wrapper css={{ zIndex: 2, position: "relative" }}>
        <ContentFadeFormWrapper>{children}</ContentFadeFormWrapper>
      </Wrapper>
    </ContentFadeWrapper>
  );
};
