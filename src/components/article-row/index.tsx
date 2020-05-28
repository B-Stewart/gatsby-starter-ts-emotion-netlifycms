import * as React from "react";
import { IChildImageSharpFluid } from "../../interfaces";
import { createSubArrays } from "../../utilities";
import { ImageCard } from "../image-card";
import { graphql } from "gatsby";

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

export const ArticleRow: React.FC<IArticleRowProps> = ({ edges }) => (
  <>
    {/* TODO: Document what the heck this is */}
    {createSubArrays(4, edges).map((ar, i) => (
      <div className="md:flex flex-none" key={i}>
        {ar.map((edge, j) => (
          <ImageCard
            fluidImage={edge.node.frontmatter.featuredImage}
            title={edge.node.frontmatter.title}
            to={edge.node.fields.slug}
            key={j}
            className="mr-4 last:mr-0 mb-4 md:mb-0 flex-grow flex-basis-0"
          />
        ))}
      </div>
    ))}
  </>
);

ArticleRow.displayName = "ArticleRow";

export interface IArticleRowQuery {
  node: {
    fields: {
      slug: string;
    };
    frontmatter: {
      title: string;
      featuredImage: IChildImageSharpFluid;
    };
  };
}

export const query = graphql`
  fragment ArticleRowQuery on MarkdownRemarkEdge {
    node {
      fields {
        slug
      }
      frontmatter {
        title
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 1000, quality: 80) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
