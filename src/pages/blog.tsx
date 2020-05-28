import * as React from "react";
import { graphql } from "gatsby";
import { Hero } from "../components/hero";
import { IChildImageSharpFluid } from "../interfaces";
import { Layout } from "../components/layout";
import { SEO } from "../components/seo";
import { PageWrapper } from "../components/page-wrapper";
import { ArticleRow, IArticleRowQuery } from "../components/article-row";

export interface IBlogPageProps {
  data: IBlogPageQuery;
}

const BlogPage: React.SFC<IBlogPageProps> = ({ data }) => {
  const { title, heroImg } = data.content.frontmatter;

  return (
    <Layout>
      <SEO title={title} />
      <Hero
        imageSrc={heroImg.childImageSharp.fluid.src}
        title={title}
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
    edges: IArticleRowQuery[];
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
        ...ArticleRowQuery
      }
    }
  }
`;
