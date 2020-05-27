import * as React from "react";
import { IChildImageSharpFluid } from "../../interfaces";
import GatsbyImage from "gatsby-image";
import { Link } from "../link";

interface IImageCardProps {
  fluidImage: IChildImageSharpFluid;
  title: string;
  to: string;
  className?: string;
}

export const ImageCard: React.FC<IImageCardProps> = ({
  fluidImage,
  to,
  title,
  className,
}) => (
  <div
    className={`hover:shadow-xl transition duration-500 ease-in-out group hover:bg-secondary-300 ${className}`}
  >
    <Link to={to} className="no-underline">
      <GatsbyImage fluid={fluidImage.childImageSharp.fluid} />
      <div className="p-4 group-hover:text-white">{title}</div>
    </Link>
  </div>
);

ImageCard.displayName = "ImageCard";
