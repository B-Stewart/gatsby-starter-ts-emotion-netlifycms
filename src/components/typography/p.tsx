import styled from "@emotion/styled";

export enum PSize {
  regular,
  large,
}

export interface IPProps {
  size?: PSize;
}

const style = size => ({
  fontSize: size === PSize.large ? 18 : 15,
  margin: `0 0 1em`,
  lineHeight: 2,
});

export const P = styled.p<IPProps>(({ size }) => style(size));

export const PControl = styled.div<IPProps>(({ size }) => ({
  p: style(size),
}));
