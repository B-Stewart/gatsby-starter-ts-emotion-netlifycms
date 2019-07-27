import * as React from "react";
import styled from "@emotion/styled";
import { colors, mediaQuery } from "../../utilities";
import "@swift-soul-ui/background-video/dist/ssui-background-video";

interface IHeroVideoProps {
  videoSrc: string;
  posterSrc?: string;
  title?: string;
}

const VideoWrapper = styled.div({
  minHeight: "70vh",
  position: "relative",
  overflow: "hidden",
});

const Video = styled.video({
  position: "absolute",
  zIndex: 5,
  height: "100%",
  width: "100%",
  objectFit: "cover",
  objectPosition: "center center",
});

const Overlay = styled.div({
  opacity: 0.75,
  position: "absolute",
  zIndex: 10,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: colors.secondary.base,
});

const Content = styled.div({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize: "cover",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 15,
});

const Title = styled.div({
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

export const HeroVideo: React.SFC<IHeroVideoProps> = ({
  videoSrc,
  posterSrc,
  title,
}) => (
  <VideoWrapper>
    <Video
      poster={posterSrc}
      src={videoSrc}
      muted
      autoPlay
      loop
      preload="auto"
    />
    <Overlay />
    <Content>
      <Title>{title}</Title>
    </Content>
  </VideoWrapper>
);

HeroVideo.displayName = "HeroVideo";
