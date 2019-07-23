import styled from "@emotion/styled";
import { CSSObject } from "@emotion/core";
import { colors } from "../../utilities";

interface IButtonProps {
  variant?: "primary" | "secondary";
  outline?: boolean;
}

const styles = ({ outline, variant }: IButtonProps): CSSObject => ({
  display: "inline-block",
  backgroundColor: outline ? "transparent" : colors[variant].base,
  color: colors.light,
  padding: "8px 32px",
  transition: "background-color 250ms, color 250ms",
  textTransform: "uppercase",
  letterSpacing: 1,
  border: outline ? `2px solid ${colors.light}` : "none",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: colors[variant].dark,
    color: outline ? colors[variant].base : undefined,
    transition: "background-color 250ms, color 250ms",
  },
});

const defaultProps: IButtonProps = {
  variant: "primary",
  outline: false,
};

export const ButtonWrapper = styled.div<IButtonProps>(styles);
export const Button = styled.button<IButtonProps>(styles);

ButtonWrapper.defaultProps = defaultProps;
Button.defaultProps = defaultProps;
