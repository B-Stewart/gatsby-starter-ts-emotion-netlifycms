import * as React from "react";
import styled from "@emotion/styled";
import { Link } from "../link";
import { colors, mediaQuery } from "../../utilities";
import { IoMdMenu, IoLogoGithub } from "react-icons/io";
import { PageWrapper } from "../page-wrapper";
import { ReactComponent as Logo } from "../../media/images/icons/logo.svg";

export interface IHeaderLink {
  to: string;
  name: string;
}

export interface IHeaderProps {
  links: IHeaderLink[];
}

export interface IHeaderState {
  isMenuOpen: boolean;
}

const HeaderPadding = styled.div({
  paddingTop: 50,
});

const HeaderWrapper = styled.header({
  position: "fixed",
  background: colors.light,
  padding: 4,
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  borderBottom: `1px solid ${colors.neutral.base}`,
  boxShadow: `0px 0px 10px 0px ${colors.neutral.dark}`,
});

const HeaderFlexWrapper = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const SiteLogo = styled.div({
  marginRight: "auto",
  maxWidth: 225,
  marginTop: 2,
  svg: {
    height: 30,
  },
  [mediaQuery.greaterThan.lg]: {
    svg: {
      height: 35,
    },
  },
});

const MobileMenu = styled.div({
  display: "block",
  [mediaQuery.greaterThan.lg]: {
    display: "none",
  },
});

const DesktopMenu = styled.div({
  display: "none",
  [mediaQuery.greaterThan.lg]: {
    display: "block",
  },
});

const MobileMenuDropdown = styled.div({
  display: "block",
  background: colors.light,
});

export class Header extends React.Component<IHeaderProps, IHeaderState> {
  state: IHeaderState = {
    isMenuOpen: false,
  };

  toggleMenu = () => {
    this.setState((state) =>
      this.setState({
        isMenuOpen: !state.isMenuOpen,
      }),
    );
  };

  setMenu = (openState) => {
    this.setState({
      isMenuOpen: openState,
    });
  };

  render() {
    const { links } = this.props;
    const { isMenuOpen } = this.state;

    const linkComponents = links.map((l, i) => (
      <Link
        key={i}
        to={l.to}
        onClick={() => this.setMenu(false)}
        cssStyle={{
          display: "block",
          color: colors.secondary.base,
          marginBottom: 4,
          padding: 8,
          paddingBottom: 4,
          fontSize: 14,
          letterSpacing: 1,
          textTransform: "uppercase",
          borderBottom: `1px solid ${colors.neutral.base}`,
          cursor: "pointer",
          "&:hover": {
            color: colors.secondary.dark,
          },
          // Desktop Overrides
          [mediaQuery.greaterThan.lg]: {
            display: "inline-block",
            paddingLeft: 12,
            paddingRight: 12,
            borderBottom: "none",
            "&[data-active='true']": {
              borderBottom: `2px solid ${colors.neutral.base}`,
            },
          },
        }}
      >
        {l.name}
      </Link>
    ));

    return (
      <>
        <HeaderPadding />
        <HeaderWrapper>
          <div className="container">
            <HeaderFlexWrapper>
              <SiteLogo>
                <Link to="/" css={{ display: "inline-block" }}>
                  <Logo />
                </Link>
              </SiteLogo>
              <DesktopMenu>
                {linkComponents}
                <Link to="https://github.com/B-Stewart/gatsby-starter-ts-emotion-netlifycms">
                  <IoLogoGithub />
                </Link>
              </DesktopMenu>
              <MobileMenu>
                <IoMdMenu
                  css={{ height: 40, width: 40, cursor: "pointer" }}
                  onClick={this.toggleMenu}
                />
              </MobileMenu>
            </HeaderFlexWrapper>

            {isMenuOpen ? (
              <MobileMenu>
                <MobileMenuDropdown>
                  {linkComponents}
                  <Link to="https://github.com/B-Stewart/gatsby-starter-ts-emotion-netlifycms">
                    <IoLogoGithub />
                  </Link>
                </MobileMenuDropdown>
              </MobileMenu>
            ) : null}
          </div>
        </HeaderWrapper>
      </>
    );
  }
}

export default Header;
