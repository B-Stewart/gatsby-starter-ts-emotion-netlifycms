import * as React from "react";

interface IHeroProps {
  videoSrc?: string;
  imageSrc?: string;
  title?: string;
  overlay?: boolean;
}

export const Hero: React.FC<IHeroProps> = ({
  videoSrc,
  imageSrc,
  title,
  overlay,
}) => (
  <div className="overflow-hidden relative" style={{ minHeight: "70vh" }}>
    {videoSrc ? (
      <video
        className="absolute h-full w-full object-cover object-center z-10"
        poster={imageSrc}
        src={videoSrc}
        muted
        autoPlay
        loop
        preload="auto"
      />
    ) : (
      <div
        className="absolute h-full w-full bg-cover bg-center bg-no-repeat z-10"
        style={{ backgroundImage: `url(${imageSrc})` }}
      />
    )}
    {overlay && (
      <div className="z-20 absolute opacity-75 inset-0 bg-secondary-600" />
    )}
    <div className="inset-0 absolute flex justify-center items-center z-30">
      <h1 className="uppercase text-white text-xlx2 text-center font-light text-4xl">
        {title}
      </h1>
    </div>
  </div>
);

Hero.displayName = "Hero";
