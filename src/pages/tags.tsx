import * as React from "react";
import { graphql } from "gatsby";
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
  const { title, heroImg } = data.content.frontmatter;
  return (
    <Layout>
      <SEO title={title} />
      <Hero imageSrc={heroImg.childImageSharp.fluid.src} title={title} />
      <PageWrapper className="container">
        {createSubArrays(3, data.tags.nodes).map((tags, i) => (
          <div className="block md:flex" key={i}>
            {tags.map((tag, j) => (
              <div className="mb-4 md:mb-0 md:mr-4 p-4 flex-grow flex-basis-0 text-center">
                <Link to={tag.fields.slug} key={j}>
                  {tag.frontmatter.title}
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
    nodes: {
      fields: {
        slug: string;
      };
      frontmatter: {
        title: string;
      };
    }[];
  };
}

export const query = graphql`
  query TagsQuery {
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
      filter: { frontmatter: { templateKey: { eq: "tags" } } }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
        }
      }
    }
  }
`;
