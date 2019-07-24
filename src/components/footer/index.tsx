import * as React from "react";
import { StaticQuery, graphql } from "gatsby";
import { Contact } from "./contact";
import { Map } from "./map";
import { Navigation } from "./navigation";
import { IChildImageSharpFluid } from "../../interfaces";

interface IFooterProps {}

interface IFooterQueryData {
  footer: {
    frontmatter: {
      contactImg: IChildImageSharpFluid;
      contactTitle: string;
      contactContent: string;
      visitTitle: string;
      info: {
        mdContent: string;
        title: string;
      }[];
    };
  };
}

export const Footer: React.SFC<IFooterProps> = () => {
  return (
    <StaticQuery
      query={graphql`
        query FooterQuery {
          footer: markdownRemark(
            frontmatter: { templateKey: { eq: "footer" } }
          ) {
            frontmatter {
              contactImg {
                childImageSharp {
                  fluid(maxWidth: 500, quality: 85) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              contactTitle
              contactContent
              visitTitle
              info {
                mdContent
                title
              }
            }
          }
        }
      `}
      render={(data: IFooterQueryData) => (
        <footer>
          <Contact
            title={data.footer.frontmatter.contactTitle}
            description={data.footer.frontmatter.contactContent}
            image={data.footer.frontmatter.contactImg}
          />
          <Map
            title={data.footer.frontmatter.visitTitle}
            position={[33.185662, -117.420846]}
            handleMarkerClick={() =>
              window.open("https://goo.gl/maps/Bmrz1AtYWuEzMXbo7", "_blank")
            }
          />
          <Navigation
            navigationBlocks={data.footer.frontmatter.info.map(i => ({
              title: i.title,
              content: i.mdContent,
            }))}
          />
        </footer>
      )}
    />
  );
};
