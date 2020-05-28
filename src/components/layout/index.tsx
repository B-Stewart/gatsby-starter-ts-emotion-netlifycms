import "../../styles/main.css";

import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Header } from "../header";
import { Footer } from "../footer";
import { IoLogoGithub } from "react-icons/io";

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
  const {
    header: {
      frontmatter: { links },
    },
  }: ILayoutQueryData = useStaticQuery(graphql`
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
        links={[
          ...links.map((l) => ({
            to: l.link,
            name: l.name,
          })),
          {
            to:
              "https://github.com/B-Stewart/gatsby-starter-typescript-tailwindcss-netlifycms",
            component: IoLogoGithub,
          },
        ]}
      />
      <section className="z-0 relative">{children}</section>
      <Footer />
    </>
  );
};
