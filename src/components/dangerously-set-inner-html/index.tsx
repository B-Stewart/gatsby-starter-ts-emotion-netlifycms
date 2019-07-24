import * as React from "react";

interface IDangerouslySetInnerHtmlProps {}

export const DangerouslySetInnerHtml: React.SFC<
  IDangerouslySetInnerHtmlProps
> = ({ children }) => (
  <div
    dangerouslySetInnerHTML={{
      __html: children ? children.toString() : undefined,
    }}
  />
);

DangerouslySetInnerHtml.displayName = "DangerouslySetInnerHtml";
