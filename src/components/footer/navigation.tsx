import * as React from "react";
import { Link } from "../link";

interface INavigationProps {}

export const Navigation: React.SFC<INavigationProps> = ({}) => {
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
