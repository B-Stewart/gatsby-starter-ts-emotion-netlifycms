import * as React from "react";
import { Link, graphql, PageProps } from "gatsby";
import { Layout } from "../components/layout";
import { SEO } from "../components/seo";
import { ArticleRow, IArticleRowQuery } from "../components/article-row";
import { IChildImageSharpFluid } from "../interfaces";
import { PageWrapper } from "../components/page-wrapper";

interface ITag extends PageProps {
  data: ITagQuery;
  // TODO: Find out why this isn't strongly typed?
  pageContext: {
    tag: string;
  };
}

const Tag: React.FC<ITag> = ({ data, pageContext }) => {
  const tag = pageContext.tag;
  const totalCount = data.allMarkdownRemark.totalCount;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with “${tag}”`;

  return (
    <Layout>
      <SEO title={tag} />
      <PageWrapper className="container">
        <h1 className="text-4xl text-center">{tagHeader}</h1>
        <p className="text-center mb-8">
          <Link to="/tags/">Browse all tags</Link>
        </p>
        <ArticleRow edges={data.allMarkdownRemark.edges} />
      </PageWrapper>
    </Layout>
  );
};

export default Tag;

interface ITagQuery {
  allMarkdownRemark: {
    edges: IArticleRowQuery[];
    totalCount: number;
  };
}

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
        ...ArticleRowQuery
      }
    }
  }
`;
