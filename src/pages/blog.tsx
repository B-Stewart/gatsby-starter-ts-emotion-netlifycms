import * as React from "react";
import { graphql } from "gatsby";
import { Hero } from "../components/hero";
import { IChildImageSharpFluid } from "../interfaces";
import { Layout } from "../components/layout";
import { SEO } from "../components/seo";
import { PageWrapper } from "../components/page-wrapper";
import { ArticleRow } from "../components/article-row";

export interface IBlogPageProps {
  data: IBlogPageQuery;
}

const BlogPage: React.SFC<IBlogPageProps> = ({ data }) => {
  return (
    <Layout>
      <SEO title="Blogs" />
      <Hero
        imageSrc={data.content.frontmatter.heroImg.childImageSharp.fluid.src}
        title={data.content.frontmatter.title}
        overlay
      />
      <PageWrapper className="container">
        <ArticleRow edges={data.articles.edges} />
      </PageWrapper>
    </Layout>
  );
};

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
