import * as React from "react";
import { StaticQuery, graphql } from "gatsby";
import Header from "../header";
import "normalize.css";
import { Footer } from "../footer";
import { GlobalStyles } from "./global-styles";

export interface ILayoutProps {}

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

const Layout: React.SFC<ILayoutProps> = ({ children }) => (
  <StaticQuery
    query={graphql`
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
    `}
    render={(data: ILayoutQueryData) => (
      <>
        <GlobalStyles />
        <Header
          links={data.header.frontmatter.links.map(l => ({
            to: l.link,
            name: l.name,
          }))}
        />
        <section>{children}</section>
        <Footer />
      </>
    )}
  />
);

export default Layout;
