import * as React from "react";
import styled from "@emotion/styled";
import { mediaQuery } from "../../utilities";

export const FlexBlock = styled.div({
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: 0,
});

const FlexBlocksWrapper = styled.div({
  display: "block",
  paddingTop: 16,
  paddingBottom: 16,
  [mediaQuery.greaterThan.lg]: {
    display: "flex",
  },
});

interface IFlexBlocksProps {}

export const FlexBlocks: React.SFC<IFlexBlocksProps> = ({ children }) => (
  <FlexBlocksWrapper>{children}</FlexBlocksWrapper>
);

FlexBlocks.displayName = "FlexBlocks";
