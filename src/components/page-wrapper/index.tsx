import * as React from "react";

// TODO: is there a better way to type this???
export const PageWrapper: React.FC<React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>> = ({ children, className, ...props }) => (
  <section className={`py-8 ${className}`} {...props}>
    {children}
  </section>
);
