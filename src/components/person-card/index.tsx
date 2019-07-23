import * as React from "react";
import styled from "@emotion/styled";
import { IChildImageSharpFluid } from "../../interfaces";
import { mediaQuery } from "../../utilities";
import GatsbyImage from "gatsby-image";

interface IPersonCardProps {
  fluidImage: IChildImageSharpFluid;
  name: string;
  stacked?: boolean;
}

const FlexWrapper = styled.div({
  display: "block",
  alignContent: "center",
  [mediaQuery.greaterThan.lg]: {
    display: "flex",
    "div:first-of-type": {
      marginRight: 78,
    },
  },
});

const ImgWrapper = styled.div({
  paddingRight: 16,
  marginBottom: 16,
  marginTop: 8,
  [mediaQuery.greaterThan.lg]: {
    width: 300,
    minWidth: 300,
  },
});

export const PersonCard: React.SFC<IPersonCardProps> = ({
  fluidImage,
  name,
  stacked,
  children,
}) => {
  const content = (
    <>
      <ImgWrapper>
        <GatsbyImage
          fluid={fluidImage.childImageSharp.fluid}
          css={{ width: 300, minWidth: 300 }}
        />
      </ImgWrapper>
      <div>
        <h3>{name}</h3>
        <div>{children}</div>
      </div>
    </>
  );

  return stacked ? <FlexWrapper>{content}</FlexWrapper> : <div>{content}</div>;
};

PersonCard.displayName = "PersonalCard";
