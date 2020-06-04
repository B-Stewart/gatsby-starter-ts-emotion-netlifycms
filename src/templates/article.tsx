import * as React from "react";
import { graphql, Link } from "gatsby";
import { Layout } from "../components/layout";
import { DangerouslySetInnerHtml } from "../components/dangerously-set-inner-html";
import { SEO } from "../components/seo";
import { PageWrapper } from "../components/page-wrapper";
import { IChildImageSharpFluid } from "../interfaces";
import { Hero } from "../components/hero";

const ArticleTemplate: React.FC<IArticleTemplate> = ({ data }) => {
  const tags = data.markdownRemark.fields.tags;
  const article = data.markdownRemark.frontmatter;
  return (
    <Layout>
      <SEO title={article.title} />
      <Hero
        imageSrc={article.featuredImage.childImageSharp.fluid.src}
        title={article.title}
        overlay
      />
      <PageWrapper className="container">
        <DangerouslySetInnerHtml>
          {data.markdownRemark.html}
        </DangerouslySetInnerHtml>
        {tags?.length ? (
          <div className="mt-16">
            <h2 className="text-2xl">Tags: </h2>
            {tags.map((tag, i) => (
              <div className="inline-block mr-1 last:mr-0" key={i}>
                <Link to={tag.fields.slug}>{tag.frontmatter.title}</Link>
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
      fields: {
        tags: {
          fields: {
            slug: string;
          };
          frontmatter: {
            title: string;
          };
        }[];
      };
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
      html
      fields {
        tags {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
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
