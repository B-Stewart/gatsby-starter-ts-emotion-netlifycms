import * as React from "react";
import { InterpolationWithTheme } from "@emotion/core";
import { Link as ScrollLink } from "react-scroll";
import { Link as GatsbyLink, navigateTo } from "gatsby";
import { OutboundLink } from "gatsby-plugin-google-analytics";

export const isInternalLink = link => {
  return /^\/(?!\/)/.test(link);
};

export interface ILinkProps {
  to: string;
  cssStyle?: InterpolationWithTheme<any>;
  onClick?: () => any;
}

export const Link: React.SFC<ILinkProps> = ({
  children,
  to,
  cssStyle,
  onClick,
}) => {
  const isScroll = to.includes("#");
  if (isScroll) {
    if (
      to.includes("/") &&
      typeof window !== "undefined" &&
      window.location.pathname !== "/"
    )
      return (
        <a
          css={cssStyle}
          onClick={() => {
            navigateTo(to);
            onClick && onClick();
          }}
        >
          {children}
        </a>
      );

    return (
      <ScrollLink
        css={cssStyle}
        to={to.replace("#", "").replace("/", "")}
        smooth={true}
        offset={-60}
        onClick={onClick}
      >
        {children}
      </ScrollLink>
    );
  } else {
    if (isInternalLink(to)) {
      return (
        <GatsbyLink
          css={cssStyle}
          to={to}
          onClick={onClick}
          // TODO: This doesn't work great on homepage
          getProps={({ isCurrent }) => {
            return isCurrent
              ? { ["data-active"]: `true` }
              : { ["data-active"]: `false` };
          }}
        >
          {children}
        </GatsbyLink>
      );
    } else {
      return (
        <OutboundLink
          css={cssStyle}
          href={to}
          target="_blank"
          onClick={onClick}
        >
          {children}
        </OutboundLink>
      );
    }
  }
};
