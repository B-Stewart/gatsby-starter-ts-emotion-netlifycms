import * as React from "react";
import styled from "@emotion/styled";
import { PageWrapper } from "../page-wrapper";
import { colors, mediaQuery } from "../../utilities";
import { DangerouslySetInnerHtml } from "../dangerously-set-inner-html";
import { Link } from "../link";

interface INavigationProps {
  navigationBlocks: {
    title: string;
    content: string;
  }[];
}

const NavigationWrapper = styled.div({
  backgroundColor: colors.secondary.base,
  paddingTop: 32,
  paddingBottom: 32,
  overflow: "hidden",
  position: "relative",
});

const FlexWrapper = styled.div({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  [mediaQuery.greaterThan.lg]: {
    flexDirection: "row",
  },
});

const FlexItem = styled.div({
  marginRight: 96,
});

const MenuHeader = styled.div({
  textTransform: "uppercase",
  color: colors.primary.base,
  fontWeight: "bold",
  marginTop: 16,
  letterSpacing: 1,
  [mediaQuery.greaterThan.lg]: {
    marginTop: 0,
  },
});

const MenuItem = styled.div({
  color: colors.light,
});

export const Navigation: React.SFC<INavigationProps> = ({
  navigationBlocks,
}) => {
  return (
    <div className="bg-primary-600 py-4">
      <div className="container">
        Created by{" "}
        <Link to="https://swiftsoulinteractive.com">
          Swift Soul Interactive
        </Link>
      </div>
    </div>
  );
};
