import * as React from "react";
import { Helmet } from "react-helmet";

export interface ISEOProps {
  description?: string;
  lang?: string;
  meta?: { name: string; content: any; property?: undefined }[];
  keywords?: string[];
  title?: string;
}

export const SEO: React.FC<ISEOProps> = ({
  description,
  lang,
  meta,
  keywords,
  title,
}) => {
  const metaDescription = description;

  // TODO: Add data to netlifycms instead of site meta data and statically query it
  const siteTitle = "TypeScript TailwindCSS Netlify and GatsbyJS Starter";

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${siteTitle}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: "", //TODO: Author
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : [],
        )
        .concat(meta)}
    />
  );
};

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
};
