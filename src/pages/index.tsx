import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { Layout } from "../components/layout";
import { SEO } from "../components/seo";
import { Hero } from "../components/hero";
import { IChildImageSharpFluid, IFileUpload, Variants } from "../interfaces";
import GatsbyImage from "gatsby-image";
import { PageWrapper } from "../components/page-wrapper";
import { ButtonLink } from "../components/button";

export interface IIndexPageProps extends PageProps {
  data: IIndexPageQuery;
}

const IndexPage: React.FC<IIndexPageProps> = ({ data }) => {
  return (
    <Layout>
      {/* TODO: Move title to netlify, maybe have global seo specific titles? */}
      <SEO title="Home" />
      <Hero
        videoSrc={data.content.frontmatter.heroVideo.publicURL}
        title={data.content.frontmatter.title}
        overlay
      />
      <PageWrapper id="about" className="container">
        <div className="text-center pb-5">
          <h1 className="text-4xl">{data.content.frontmatter.teamTitle}</h1>
          <p className="text-lg">{data.content.frontmatter.teamContent}</p>
          <ButtonLink variant={Variants.primary} to="#contact" className="my-5">
            {data.content.frontmatter.teamButton}
          </ButtonLink>
        </div>
        <div className="md:flex">
          {data.content.frontmatter.iconBlocks.map((ib, i) => (
            <div key={i} className="mb-4 md:mb-0 md:mr-4 md:last:mr-0">
              <div className="uppercase text-lg font-semibold mb-2">
                {ib.title}
              </div>
              <p>{ib.content}</p>
            </div>
          ))}
        </div>
      </PageWrapper>
      <GatsbyImage
        sizes={data.content.frontmatter.bannerImg.childImageSharp.fluid}
        style={{
          maxHeight: 400,
        }}
      />
    </Layout>
  );
};

export default IndexPage;

interface IIndexPageQuery {
  homeVideo: {
    publicURL: string;
  };
  content: {
    frontmatter: {
      title: string;
      teamTitle: string;
      teamContent: string;
      teamButton: string;
      teamImg: IChildImageSharpFluid;
      bannerImg: IChildImageSharpFluid;
      iconBlocks: { content: string; title: string }[];
      aboutTitle: string;
      aboutContent: string;
      heroVideo: IFileUpload;
    };
  };
}

export const query = graphql`
  query IndexPageQuery {
    content: markdownRemark(frontmatter: { templateKey: { eq: "home-page" } }) {
      frontmatter {
        title
        teamTitle
        teamContent
        teamButton
        teamImg {
          childImageSharp {
            fluid(maxWidth: 500, quality: 85) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        bannerImg {
          childImageSharp {
            fluid(maxWidth: 2000, quality: 85) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        iconBlocks {
          content
          title
        }
        aboutTitle
        aboutContent
        heroVideo {
          publicURL
        }
      }
    }
  }
`;
