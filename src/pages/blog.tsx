import * as React from "react";
import { graphql } from "gatsby";
import { HeroBanner } from "../components/hero-banner";
import { IChildImageSharpFluid } from "../interfaces";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Wrapper } from "../components/wrapper";

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
    <Wrapper css={{ paddingTop: 64, paddingBottom: 64 }} />
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
  }
`;
