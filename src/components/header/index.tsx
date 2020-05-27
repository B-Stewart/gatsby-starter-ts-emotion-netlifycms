import * as React from "react";
import { useState } from "react";
import { Link } from "../link";
import { IoMdMenu } from "react-icons/io";
import { ReactComponent as Logo } from "../../media/images/icons/logo.svg";
import { IconType } from "react-icons/lib/cjs";

export interface IHeaderLink {
  to: string;
  name?: string;
  component?: IconType;
}

export interface IHeaderProps {
  links: IHeaderLink[];
}

export interface IHeaderState {
  isMenuOpen: boolean;
}

export const Header: React.FC<IHeaderProps> = ({ links }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const linkComponents = links.map(({ to, name, component: Component }, i) => (
    <Link
      key={i}
      to={to}
      onClick={() => setMenuOpen(false)}
      className="no-underline text-black block py-2 md:py-0 md:inline-block mr-4 uppercase cursor-pointer border-b border-neutral-300 last:border-0 md:border-b-0 hover:text-neutral-600"
    >
      {name ? name : <Component className="h-5 w-5 md:h-4 md:w-4" />}
    </Link>
  ));

  return (
    <header className="bg-white sticky z-30 top-0 shadow-lg border-b border-neutral-300 py-1">
      <div className="container">
        <div className="flex justify-between items-center">
          <Link to="/" className="block text-lg h-8">
            <Logo className="h-full w-full" />
          </Link>
          <div className="hidden md:block">{linkComponents}</div>
          <div className="block md:hidden">
            <IoMdMenu
              className="cursor-pointer h-8 w-8"
              onClick={() => setMenuOpen(!isMenuOpen)}
            />
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
