[![Netlify Status](https://api.netlify.com/api/v1/badges/d99d8c8d-62af-4761-9bf2-c2f317e7705e/deploy-status)](https://app.netlify.com/sites/gatsby-starter-typescript-tailwind-netlifycms/deploys)
![Lighthouse Accessibility](./lighthouse-badges/lighthouse_accessibility.svg)
![Lighthouse Best Practices](./lighthouse-badges/lighthouse_best-practices.svg)
![Lighthouse Performance](./lighthouse-badges/lighthouse_performance.svg)
![Lighthouse PWA](./lighthouse-badges/lighthouse_pwa.svg)
![Lighthouse SEO](./lighthouse-badges/lighthouse_seo.svg)

# Gatsby Starter for TypeScript, TailwindCSS, and Netlify CMS

## Getting Started

```
$ npm i
$ npm start
```

### Setting up the CMS

Follow the [Netlify CMS Quick Start Guide](https://www.netlifycms.org/docs/quick-start/#authentication) to set up authentication, and hosting.

## Dependency Notes

- [CLSX](https://github.com/lukeed/clsx) - Helps with logic heavy construction of class attributes for css.
- [Ionicons](https://ionicons.com/) - Web Component string based icons so we can use from CMS

# TODO:

- Move Logo to CMS
- Move Favicon to CMS
- Move All Content to CMS
- Evalute article description field / excerpt?
- Verify blog styles / write example blogs
- Future blog publishes
- Make sure the netlify relative CMS plugin doesn't conflict with links in markdown (/blog went to ../blog)
- Work on TODOs
- Clean Up Readme
- Consider consolidating 404 and thanks page to a generic page "type" with title / subtitle
- Consider moving layout to templates?
- Add ESLint
- Add stricter TS?
- Bundle Optimization
- Add Preact?
- Do lighthouse checks
- Figure out why lighthouse badges doesn't work with locally installed npx
- Optimize css dev changes, seem to make dev process hang on any css change
- describe dependencies and usefulness
- Templatize it for plug and play

# Future Projects:

1. Font Optimization

   - Look into loading fonts through CMS
   - Possibly use typeface instead of Google Fonts

2. Icon Optimization

   - Better way to load in icons via string
   - Better way to identify icon names in CMS

3. Theme Optimization
   - Move all color options to CMS
     - Most likely through tailwind css variables on build
