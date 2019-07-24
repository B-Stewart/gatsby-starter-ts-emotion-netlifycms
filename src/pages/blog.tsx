import * as React from "react";
import { graphql } from "gatsby";
import { HeroBanner } from "../components/hero-banner";
import { IChildImageSharpFluid } from "../interfaces";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Wrapper } from "../components/wrapper";
import { Link } from "../components/link";

export interface IBlogPageProps {
  data: IBlogPageQuery;
}

const BlogPage: React.SFC<IBlogPageProps> = ({ data }) => (
  <Layout>
    <SEO title="Blogs" />
    <HeroBanner
      backgroundImageSrc={
        data.content.frontmatter.heroImg.childImageSharp.fluid.src
      }
      title={data.content.frontmatter.title}
    />
    <Wrapper css={{ paddingTop: 64, paddingBottom: 64 }}>
      {data.articles.edges.map(edge => (
        <Link to={edge.node.fields.slug}>{edge.node.frontmatter.title}</Link>
      ))}
    </Wrapper>
  </Layout>
);

export default BlogPage;

interface IBlogPageQuery {
  content: {
    frontmatter: {
      title: string;
      heroImg: IChildImageSharpFluid;
    };
  };
  articles: {
    edges: {
      node: {
        excerpt: string;
        id: string;
        fields: {
          slug: string;
        };
        frontmatter: {
          title: string;
          date: string;
          featuredImage: IChildImageSharpFluid;
        };
      };
    }[];
  };
}

export const query = graphql`
  query BlogPageQuery {
    content: markdownRemark(frontmatter: { templateKey: { eq: "blog-page" } }) {
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
    articles: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-article" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 120, quality: 80) {
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
