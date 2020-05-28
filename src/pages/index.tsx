import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { Layout } from "../components/layout";
import { SEO } from "../components/seo";
import { Hero } from "../components/hero";
import { IChildImageSharpFluid, IFileUpload, Variants } from "../interfaces";
import GatsbyImage from "gatsby-image";
import { PageWrapper } from "../components/page-wrapper";
import { ButtonLink } from "../components/button";
import { DangerouslySetInnerHtml } from "../components/dangerously-set-inner-html";

export interface IIndexPageProps extends PageProps {
  data: IIndexPageQuery;
}

const IndexPage: React.FC<IIndexPageProps> = ({ data }) => {
  const { heroVideo, title, highlights, bannerImg } = data.content.frontmatter;

  return (
    <Layout>
      <SEO title={title} />
      <Hero videoSrc={heroVideo.publicURL} title={title} overlay />
      <PageWrapper id="about" className="container">
        <div className="pb-5 text-center">
          <DangerouslySetInnerHtml>{data.content.html}</DangerouslySetInnerHtml>
        </div>
        <div className="md:flex">
          {highlights.map((ib, i) => (
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
        sizes={bannerImg.childImageSharp.fluid}
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
    html: string;
    frontmatter: {
      title: string;
      bannerImg: IChildImageSharpFluid;
      highlights: { content: string; title: string }[];
      heroVideo: IFileUpload;
    };
  };
}

export const query = graphql`
  query IndexPageQuery {
    content: markdownRemark(frontmatter: { templateKey: { eq: "home-page" } }) {
      html
      frontmatter {
        title
        bannerImg {
          childImageSharp {
            fluid(maxWidth: 2000, quality: 85) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        highlights {
          content
          title
        }
        heroVideo {
          publicURL
        }
      }
    }
  }
`;
