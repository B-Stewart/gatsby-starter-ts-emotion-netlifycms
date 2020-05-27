import * as React from "react";
import kebabCase from "lodash.kebabcase";
import { graphql, Link } from "gatsby";
import { Layout } from "../components/layout";
import { DangerouslySetInnerHtml } from "../components/dangerously-set-inner-html";
import { SEO } from "../components/seo";
import { PageWrapper } from "../components/page-wrapper";
import { IChildImageSharpFluid } from "../interfaces";
import { Hero } from "../components/hero";

const ArticleTemplate: React.FC<IArticleTemplate> = ({ data }) => {
  return (
    <Layout>
      <SEO title="Blogs" />
      <Hero
        imageSrc={
          data.markdownRemark.frontmatter.featuredImage.childImageSharp.fluid
            .src
        }
        title={data.markdownRemark.frontmatter.title}
        overlay
      />
      <PageWrapper className="container">
        <h2 className="text-2xl text-center">
          {data.markdownRemark.frontmatter.description}
        </h2>
        <DangerouslySetInnerHtml>
          {data.markdownRemark.html}
        </DangerouslySetInnerHtml>
        {data.markdownRemark.frontmatter.tags &&
        data.markdownRemark.frontmatter.tags.length ? (
          <div className="mt-16">
            <h2 className="text-2xl">Tags: </h2>
            {data.markdownRemark.frontmatter.tags.map((tag) => (
              <div className="inline-block mr-1 last:mr-0" key={tag + `tag`}>
                <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
              </div>
            ))}
          </div>
        ) : null}
      </PageWrapper>
    </Layout>
  );
};

export default ArticleTemplate;

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
