import * as React from "react";
import kebabCase from "lodash.kebabcase";
import { graphql, Link } from "gatsby";
import { Layout } from "../components/layout";
import { DangerouslySetInnerHtml } from "../components/dangerously-set-inner-html";
import { SEO } from "../components/seo";
import { HeroBanner } from "../components/hero-banner";
import { PageWrapper } from "../components/page-wrapper";
import { IChildImageSharpFluid } from "../interfaces";
import styled from "@emotion/styled";

const TagWrapper = styled.div({
  display: "block",
  marginTop: "4rem",
});

const Tag = styled.div({
  display: "inline-block",
  marginLeft: 4,
  marginRight: 4,
});

interface IArticleTemplate {
  data: {
    markdownRemark: {
      html: string;
      id: string;
      frontmatter: {
        content: string;
        description: string;
        tags: string[];
        title: string;
        featuredImage: IChildImageSharpFluid;
      };
    };
  };
}

const ArticleTemplate: React.SFC<IArticleTemplate> = ({ data }) => {
  return (
    <Layout>
      <SEO title="Blogs" />
      <HeroBanner
        backgroundImageSrc={
          data.markdownRemark.frontmatter.featuredImage.childImageSharp.fluid
            .src
        }
        title={data.markdownRemark.frontmatter.title}
      />
      <PageWrapper>
        <h3>{data.markdownRemark.frontmatter.description}</h3>
        <DangerouslySetInnerHtml>
          {data.markdownRemark.html}
        </DangerouslySetInnerHtml>
        {data.markdownRemark.frontmatter.tags &&
        data.markdownRemark.frontmatter.tags.length ? (
          <TagWrapper>
            <h4>Tags: </h4>
            {data.markdownRemark.frontmatter.tags.map((tag) => (
              <Tag key={tag + `tag`}>
                <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
              </Tag>
            ))}
          </TagWrapper>
        ) : null}
      </PageWrapper>
    </Layout>
  );
};

export default ArticleTemplate;

export const pageQuery = graphql`
  query BlogArticleByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 2000, quality: 80) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
