import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { Layout } from "../components/layout";
import { SEO } from "../components/seo";
import { PageWrapper } from "../components/page-wrapper";

export interface INotFoundPage extends PageProps {
  data: INotFoundPageQuery;
}

const NotFoundPage: React.FC<INotFoundPage> = ({ data }) => (
  <Layout>
    <SEO title={data.content.frontmatter.title} />
    <PageWrapper className="text-center">
      <h1>{data.content.frontmatter.title}</h1>
      <p>{data.content.frontmatter.subtitle}</p>
    </PageWrapper>
  </Layout>
);

interface INotFoundPageQuery {
  content: {
    frontmatter: {
      title: string;
      subtitle: string;
    };
  };
}

export const query = graphql`
  query NotFoundPageQuery {
    content: markdownRemark(frontmatter: { templateKey: { eq: "404-page" } }) {
      frontmatter {
        title
        subtitle
      }
    }
  }
`;

export default NotFoundPage;
