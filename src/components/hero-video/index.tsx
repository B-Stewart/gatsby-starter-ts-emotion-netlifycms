import * as React from "react"; // import "@swift-soul-ui/background-video/dist/ssui-background-video";

interface IHeroVideoProps {
  videoSrc: string;
  posterSrc?: string;
  title?: string;
}

export const HeroVideo: React.SFC<IHeroVideoProps> = ({
  videoSrc,
  posterSrc,
  title,
}) => (
  <div className="overflow-hidden relative" css={{ minHeight: "70vh" }}>
    <video
      className="absolute h-full w-full object-cover object-center z-10"
      poster={posterSrc}
      src={videoSrc}
      muted
      autoPlay
      loop
      preload="auto"
    />
    <div className="z-20 absolute opacity-75 inset-0 bg-secondary-600" />
    <div className="inset-0 absolute flex justify-center items-center z-30">
      <h1 className="uppercase text-white text-xlx2 text-center font-light text-4xl">
        {title}
      </h1>
    </div>
  </div>
);

HeroVideo.displayName = "HeroVideo";
