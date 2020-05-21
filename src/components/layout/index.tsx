import "../../styles/main.css";

import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Header from "../header";
import { Footer } from "../footer";

interface ILayoutQueryData {
  header: {
    frontmatter: {
      links: {
        link: string;
        name: string;
      }[];
    };
  };
}

export const Layout: React.FC = ({ children }) => {
  const data: ILayoutQueryData = useStaticQuery(graphql`
    query LayoutQuery {
      header: markdownRemark(frontmatter: { templateKey: { eq: "header" } }) {
        frontmatter {
          links {
            link
            name
          }
        }
      }
    }
  `);

  return (
    <>
      <Header
        links={data.header.frontmatter.links.map((l) => ({
          to: l.link,
          name: l.name,
        }))}
      />
      <section>{children}</section>
      <Footer />
    </>
  );
};
