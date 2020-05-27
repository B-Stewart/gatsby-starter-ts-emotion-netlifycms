import * as React from "react";
import { graphql } from "gatsby";
import kebabCase from "lodash.kebabcase";
import { IChildImageSharpFluid } from "../interfaces";
import { Layout } from "../components/layout";
import { SEO } from "../components/seo";
import { PageWrapper } from "../components/page-wrapper";
import { Link } from "../components/link";
import { createSubArrays } from "../utilities";
import { Hero } from "../components/hero";

export interface ITagPageProps {
  data: ITagPageQuery;
}

const TagPage: React.SFC<ITagPageProps> = ({ data }) => {
  return (
    <Layout>
      <SEO title={data.content.frontmatter.title} />
      <Hero
        imageSrc={data.content.frontmatter.heroImg.childImageSharp.fluid.src}
        title={data.content.frontmatter.title}
      />
      <PageWrapper className="container">
        {createSubArrays(3, data.tags.group).map((tags, i) => (
          <div className="block md:flex" key={i}>
            {tags.map((tag, j) => (
              <div className="mb-4 md:mb-0 md:mr-4 p-4 flex-grow flex-basis-0 text-center">
                {/* TODO: Could this just be a direct slug? */}
                <Link to={`/tags/${kebabCase(tag.fieldValue)}`} key={j}>
                  {tag.fieldValue}
                </Link>
              </div>
            ))}
          </div>
        ))}
      </PageWrapper>
    </Layout>
  );
};

export default TagPage;

interface ITagPageQuery {
  content: {
    frontmatter: {
      title: string;
      heroImg: IChildImageSharpFluid;
    };
  };
  tags: {
    group: {
      fieldValue: string;
      totalCount: number;
    }[];
  };
}

export const query = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    content: markdownRemark(frontmatter: { templateKey: { eq: "tags-page" } }) {
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
    tags: allMarkdownRemark(
      limit: 1000
      filter: { frontmatter: { templateKey: { eq: "blog-article" } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
