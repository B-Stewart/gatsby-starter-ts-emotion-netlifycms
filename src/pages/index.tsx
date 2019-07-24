import * as React from "react";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { HeroVideo } from "../components/hero-video";
import { ContentFade } from "../components/content-fade";
import { IChildImageSharpFluid, IFileUpload } from "../interfaces";
import GatsbyImage from "gatsby-image";
import { FlexBlocks, FlexBlock } from "../components/flex-blocks";
import { IconBlock } from "../components/icon-block";
import { PageWrapper } from "../components/wrapper";
import { ButtonWrapper } from "../components/button";
import { Link } from "../components/link";
import { P, PSize } from "../components/typography/p";

const FlexBlockPadded = styled(FlexBlock)({
  paddingLeft: 8,
  paddingRight: 8,
  "&:first-of-type": {
    paddingLeft: 0,
  },
  "&:last-child": {
    paddingRight: 0,
  },
});

export interface IIndexPageProps {
  data: IIndexPageQuery;
  location: Location;
}

const IndexPage: React.SFC<IIndexPageProps> = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <HeroVideo
        videoSrc={data.content.frontmatter.heroVideo.publicURL}
        title={data.content.frontmatter.title}
      />
      <ContentFade
        imgSrc={data.content.frontmatter.teamImg.childImageSharp.fluid.src}
      >
        <h3>{data.content.frontmatter.teamTitle}</h3>
        <P>{data.content.frontmatter.teamContent}</P>
        <ButtonWrapper variant="primary">
          <Link to="#contact">{data.content.frontmatter.teamButton}</Link>
        </ButtonWrapper>
      </ContentFade>
      <PageWrapper id="about">
        <h3>{data.content.frontmatter.aboutTitle}</h3>
        <P size={PSize.large}>{data.content.frontmatter.aboutContent}</P>
        <FlexBlocks>
          {data.content.frontmatter.iconBlocks.map((ib, i) => (
            <FlexBlockPadded key={i}>
              <IconBlock title={ib.title} content={ib.content} />
            </FlexBlockPadded>
          ))}
        </FlexBlocks>
      </PageWrapper>
      <GatsbyImage
        sizes={data.content.frontmatter.bannerImg.childImageSharp.fluid}
        css={{
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
