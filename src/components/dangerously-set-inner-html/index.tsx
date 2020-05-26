import * as React from "react";

interface IDangerouslySetInnerHtmlProps {}

export const DangerouslySetInnerHtml: React.FC<IDangerouslySetInnerHtmlProps> = ({
  children,
}) => (
  <div
    dangerouslySetInnerHTML={{
      __html: children ? children.toString() : undefined,
    }}
  />
);

DangerouslySetInnerHtml.displayName = "DangerouslySetInnerHtml";
