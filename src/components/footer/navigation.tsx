import * as React from "react";

interface INavigationProps {}

export const Navigation: React.SFC<INavigationProps> = ({ children }) => {
  return (
    <div className="bg-primary-600 py-4">
      <div className="container">{children}</div>
    </div>
  );
};
