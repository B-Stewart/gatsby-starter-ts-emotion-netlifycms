import * as React from "react";
import { Link, graphql, PageProps } from "gatsby";
import { Layout } from "../components/layout";
import { SEO } from "../components/seo";
import { ArticleRow, IArticleRowQuery } from "../components/article-row";
import { PageWrapper } from "../components/page-wrapper";

interface ITag extends PageProps {
  data: ITagQuery;
}

const Tag: React.FC<ITag> = ({ data }) => {
  const tag = data.tag;
  const totalCount = data.articles.totalCount;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with “${tag.frontmatter.title}”`;

  return (
    <Layout>
      <SEO title={tag.frontmatter.title} />
      <PageWrapper className="container">
        <h1 className="text-4xl text-center">{tagHeader}</h1>
        <div className="text-center mb-8">
          <Link to="/tags/">Browse all tags</Link>
        </div>
        <ArticleRow edges={data.articles.edges} />
      </PageWrapper>
    </Layout>
  );
};

export default Tag;

interface ITagQuery {
  tag: {
    fields: {
      slug: string;
    };
    frontmatter: {
      title: string;
    };
  };
  articles: {
    edges: IArticleRowQuery[];
    totalCount: number;
  };
}

export const tagPageQuery = graphql`
  query TagById($id: String!, $frontmatterID: String!) {
    tag: markdownRemark(id: { eq: $id }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    articles: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: {
          tagIDs: { in: [$frontmatterID] }
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
