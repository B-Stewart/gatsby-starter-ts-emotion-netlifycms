import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { Layout } from "../components/layout";
import { SEO } from "../components/seo";
import { PageWrapper } from "../components/page-wrapper";

export interface IFormSubmissionPage extends PageProps {
  data: IFormSubmissionPageQuery;
}

const FormSubmissionPage: React.FC<IFormSubmissionPage> = ({ data }) => (
  <Layout>
    <SEO title={data.content.frontmatter.title} />
    <PageWrapper className="text-center">
      <h1>{data.content.frontmatter.title}</h1>
      <div>{data.content.frontmatter.subtitle}</div>
    </PageWrapper>
  </Layout>
);

interface IFormSubmissionPageQuery {
  content: {
    frontmatter: {
      title: string;
      subtitle: string;
    };
  };
}

export const query = graphql`
  query ThanksPageQuery {
    content: markdownRemark(
      frontmatter: { templateKey: { eq: "thanks-page" } }
    ) {
      frontmatter {
        title
        subtitle
      }
    }
  }
`;

export default FormSubmissionPage;
