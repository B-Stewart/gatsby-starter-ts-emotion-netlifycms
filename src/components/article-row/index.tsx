import * as React from "react";
import styled from "@emotion/styled";
import { IChildImageSharpFluid } from "../../interfaces";
import { createSubArrays } from "../../utilities";
import { ImageCard } from "../image-card";

interface IArticleRowProps {
  edges: {
    node: {
      frontmatter: {
        featuredImage: IChildImageSharpFluid;
        title: string;
      };
      fields: {
        slug: string;
      };
    };
  }[];
}

const ArticleRowWrapper = styled.div({
  display: "flex",
});

export const ArticleRow: React.SFC<IArticleRowProps> = ({ edges }) => (
  <>
    {createSubArrays(2, edges).map((ar, i) => (
      <ArticleRowWrapper key={i}>
        {ar.map((edge, j) => (
          <ImageCard
            fluidImage={edge.node.frontmatter.featuredImage}
            title={edge.node.frontmatter.title}
            to={edge.node.fields.slug}
            key={j}
          />
        ))}
      </ArticleRowWrapper>
    ))}
  </>
);

ArticleRow.displayName = "ArticleRow";
