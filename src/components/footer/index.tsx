import * as React from "react";
import { StaticQuery, graphql, useStaticQuery } from "gatsby";
import { Contact } from "./contact";
import { Map } from "./map";
import { Navigation } from "./navigation";
import { DangerouslySetInnerHtml } from "../dangerously-set-inner-html";

interface IFooterProps {}

interface IFooterQueryData {
  footer: {
    frontmatter: {
      contactTitle: string;
      contactContent: string;
      visitTitle: string;
      mdAttribution: string;
    };
  };
}

export const Footer: React.FC<IFooterProps> = () => {
  const {
    footer: {
      frontmatter: { mdAttribution, contactContent, contactTitle, visitTitle },
    },
  }: IFooterQueryData = useStaticQuery(graphql`
    query FooterQuery {
      footer: markdownRemark(frontmatter: { templateKey: { eq: "footer" } }) {
        frontmatter {
          contactTitle
          contactContent
          visitTitle
          mdAttribution
        }
      }
    }
  `);

  return (
    <footer>
      <Contact title={contactTitle} description={contactContent} />
      <Map
        title={visitTitle}
        position={[33.185662, -117.420846]}
        handleMarkerClick={() =>
          window.open("https://goo.gl/maps/Bmrz1AtYWuEzMXbo7", "_blank")
        }
      />
      <Navigation>
        <DangerouslySetInnerHtml>{mdAttribution}</DangerouslySetInnerHtml>
      </Navigation>
    </footer>
  );
};
