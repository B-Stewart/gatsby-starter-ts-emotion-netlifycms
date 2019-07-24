import * as React from "react";
import { graphql } from "gatsby";
import { HeroBanner } from "../components/hero-banner";
import kebabCase from "lodash/kebabcase";
import { IChildImageSharpFluid } from "../interfaces";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { PageWrapper } from "../components/wrapper";
import { Link } from "../components/link";
import styled from "@emotion/styled";
import { createSubArrays } from "../utilities";

export interface ITagPageProps {
  data: ITagPageQuery;
}

const TagRow = styled.div({
  display: "flex",
});

const Tag = styled.div({
  flexBasis: 0,
  flexGrow: 1,
  margin: 16,
  textAlign: "center",
});

const TagPage: React.SFC<ITagPageProps> = ({ data }) => {
  return (
    <Layout>
      <SEO title={data.content.frontmatter.title} />
      <HeroBanner
        backgroundImageSrc={
          data.content.frontmatter.heroImg.childImageSharp.fluid.src
        }
        title={data.content.frontmatter.title}
      />
      <PageWrapper>
        {createSubArrays(3, data.tags.group).map((tags, i) => (
          <TagRow key={i}>
            {tags.map((tag, j) => (
              <Tag>
                <Link to={`/tags/${kebabCase(tag.fieldValue)}`} key={j}>
                  {tag.fieldValue}
                </Link>
              </Tag>
            ))}
          </TagRow>
        ))}
      </PageWrapper>
    </Layout>
  );
};

export default TagPage;

interface ITagPageQuery {
  content: {
    frontmatter: {
      title: string;
      heroImg: IChildImageSharpFluid;
    };
  };
  tags: {
    group: {
      fieldValue: string;
      totalCount: number;
    }[];
  };
}

export const query = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    content: markdownRemark(frontmatter: { templateKey: { eq: "tags-page" } }) {
      frontmatter {
        title
        heroImg {
          childImageSharp {
            fluid(maxWidth: 2000, quality: 80) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    tags: allMarkdownRemark(
      limit: 1000
      filter: { frontmatter: { templateKey: { eq: "blog-article" } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
