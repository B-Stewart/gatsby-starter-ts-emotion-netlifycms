import * as React from "react";
import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import { ILinkProps, Link } from "../link";
import { Variants } from "../../interfaces";

interface IButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: Variants;
}

interface IButtonLinkProps extends ILinkProps {
  variant?: Variants;
}

const getTheme = (variant: Variants) => `btn`;

export const Button: React.FC<IButtonProps> = ({
  children,
  className,
  variant,
  ...props
}) => (
  <button className={`${getTheme(variant)} ${className}`} {...props}>
    {children}
  </button>
);

Button.defaultProps = {
  variant: Variants.primary,
};

export const ButtonLink: React.FC<IButtonLinkProps> = ({
  className,
  variant,
  ...props
}) => <Link {...props} className={`${getTheme(variant)} ${className}`} />;

ButtonLink.defaultProps = {
  variant: Variants.primary,
};
