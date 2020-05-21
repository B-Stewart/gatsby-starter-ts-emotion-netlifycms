import * as React from "react";
import { Helmet } from "react-helmet";
import { Link, graphql } from "gatsby";
import { Layout } from "../components/layout";
import { SEO } from "../components/seo";
import { PageWrapper } from "../components/page-wrapper";
import { createSubArrays } from "../utilities";
import { ArticleRow } from "../components/article-row";

interface ITag {
  data: {
    allMarkdownRemark: {
      edges: {
        node: {
          fields: {
            slug: string;
          };
          frontmatter: {
            title: string;
            featuredImage: IChildImageSharpFluid;
          };
        };
      }[];
      totalCount: number;
    };
  };
  pageContext: any;
}

const Tag: React.SFC<ITag> = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges;
  const postLinks = posts.map((post) => (
    <li key={post.node.fields.slug}>
      <Link to={post.node.fields.slug}>
        <h2 className="is-size-2">{post.node.frontmatter.title}</h2>
      </Link>
    </li>
  ));
  const tag = pageContext.tag;
  const totalCount = data.allMarkdownRemark.totalCount;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with “${tag}”`;

  return (
    <Layout>
      <SEO title={tag} />
      <PageWrapper>
        <div>
          <Link to="/tags/">Browse all tags</Link>
        </div>
        <h1>{tagHeader}</h1>
        <ArticleRow edges={data.allMarkdownRemark.edges} />
      </PageWrapper>
    </Layout>
  );
};

export default Tag;

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: {
          tags: { in: [$tag] }
          templateKey: { eq: "blog-article" }
        }
      }
    ) {
      totalCount
      edges {
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
    }
  }
`;
