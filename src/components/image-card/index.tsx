import * as React from "react";
import styled from "@emotion/styled";
import { IChildImageSharpFluid } from "../../interfaces";
import { colors } from "../../utilities";
import GatsbyImage from "gatsby-image";
import { Link } from "../link";

interface IImageCardProps {
  fluidImage: IChildImageSharpFluid;
  title: string;
  to: string;
}

const CardTitle = styled.div({
  padding: 16,
  transition: "background-color .5s, color .25s",
});

const Card = styled.div({
  display: "block",
  margin: 16,
  flexBasis: 0,
  flexGrow: 1,
  transition: "box-shadow .5s",
  "&:first-child": {
    marginLeft: 0,
  },
  "&:last-child": {
    marginRight: 0,
  },
  "&:hover": {
    boxShadow: `3px 3px 3px ${colors.neutral.dark}`,
    // TODO: When https://github.com/emotion-js/emotion/issues/1275 is fixed
    [CardTitle as any]: {
      backgroundColor: colors.secondary.light,
      color: colors.light,
    },
  },
});

export const ImageCard: React.SFC<IImageCardProps> = ({
  fluidImage,
  to,
  title,
}) => (
  <Card>
    <Link to={to}>
      <GatsbyImage fluid={fluidImage.childImageSharp.fluid} />
      <CardTitle>{title}</CardTitle>
    </Link>
  </Card>
);

ImageCard.displayName = "ImageCard";
