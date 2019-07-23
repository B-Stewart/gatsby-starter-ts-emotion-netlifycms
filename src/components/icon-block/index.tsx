import * as React from "react";
import styled from "@emotion/styled";
import { P } from "../typography/p";

const IconTitle = styled.div({
  textTransform: "uppercase",
  marginBottom: 16,
  fontWeight: "bold",
  letterSpacing: 1,
});

interface IIconBlockProps {
  icon?: any; // TODO: Type this
  title: string;
  content: string;
}

export const IconBlock: React.SFC<IIconBlockProps> = ({
  icon: Icon,
  title,
  content,
}) => (
  <>
    {Icon ? (
      <div>
        <Icon
          css={{
            height: 50,
            width: 50,
            marginBottom: 16,
          }}
        />
      </div>
    ) : null}

    <IconTitle>{title}</IconTitle>
    <P>{content}</P>
  </>
);

IconBlock.displayName = "IconBlock";
