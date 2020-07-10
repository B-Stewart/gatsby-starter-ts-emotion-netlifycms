import * as React from "react";
import { useState } from "react";
import { Link } from "../link";
import { ReactComponent as Logo } from "../../media/images/icons/logo.svg";
import { useStaticQuery, graphql } from "gatsby";
import { IChildImageSharpFluid } from "../../interfaces";
import GatsbyImage from "gatsby-image";

export interface IHeaderLink {
  to: string;
  name?: string;
  iconName?: string;
}

export interface IHeaderProps {}

export interface IHeaderState {
  isMenuOpen: boolean;
}

interface ILayoutQueryData {
  header: {
    frontmatter: {
      logo: IChildImageSharpFluid;
      links: {
        link: string;
        name?: string;
        iconName?: string;
      }[];
    };
  };
}

export const Header: React.FC<IHeaderProps> = () => {
  const {
    header: {
      frontmatter: { links, logo },
    },
  }: ILayoutQueryData = useStaticQuery(graphql`
    query LayoutQuery {
      header: markdownRemark(frontmatter: { templateKey: { eq: "header" } }) {
        frontmatter {
          logo {
            childImageSharp {
              fluid(maxHeight: 32, quality: 80) {
                ...GatsbyImageSharpFluid
              }
            }
            publicURL
            extension
          }
          links {
            link
            name
            iconName
          }
        }
      }
    }
  `);

  const [isMenuOpen, setMenuOpen] = useState(false);

  const linkComponents = links.map(({ link, name, iconName }, i) => (
    <Link
      key={i}
      to={link}
      onClick={() => setMenuOpen(false)}
      className="no-underline text-black block py-2 md:py-0 md:flex mr-4 uppercase cursor-pointer border-b border-neutral-300 last:border-0 md:border-b-0 hover:text-neutral-600"
    >
      {name ? name : <ion-icon name={iconName} class="h-5 w-5" />}
    </Link>
  ));

  return (
    <header className="bg-white sticky z-30 top-0 shadow-lg border-b border-neutral-300 py-1">
      <div className="container">
        <div className="flex justify-between items-center">
          <Link to="/" className="block text-lg h-8">
            {/* TODO: Clean up */}
            {logo.extension === "svg" ? (
              <img src={logo.publicURL} alt="Logo" className="h-full" />
            ) : (
              <GatsbyImage
                sizes={logo.childImageSharp.fluid}
                className="h-full"
              />
            )}
          </Link>
          <div className="hidden md:flex items-center">{linkComponents}</div>
          <div
            className="flex items-center md:hidden"
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            <ion-icon name="menu-outline" class="cursor-pointer h-8 w-8" />
          </div>
        </div>

        {isMenuOpen ? (
          <div className="block md:hidden">
            <div className="bg-white p-4">{linkComponents}</div>
          </div>
        ) : null}
      </div>
    </header>
  );
};
