[![Netlify Status](https://api.netlify.com/api/v1/badges/d99d8c8d-62af-4761-9bf2-c2f317e7705e/deploy-status)](https://app.netlify.com/sites/gatsby-starter-ts-emotion-netlifycms/deploys)

# Gatsby Starter TypeScript Emotion and Netlify CMS

## Getting Started

```
$ npm i
$ npm start
```

### Setting up the CMS

Follow the [Netlify CMS Quick Start Guide](https://www.netlifycms.org/docs/quick-start/#authentication) to set up authentication, and hosting.

## Dependencies

- CLSX (classnames alternative, tiny);

# TODO:

- Move Article Row Queries to partial queries to share logic
- Better way to add icons to header links
- Use Background Video / Image Web components
- Move Logo to CMS
- Move Favicon to CMS
- Move More Content to CMS
- Extract the Md Gatsby child markdown helper to plugin
- Make sure the netlify relative CMS plugin doesn't conflict with links in markdown (/blog went to ../blog)
- Cleanup gatsby-node (by packages?)
- Fix production webpack analyzer to not just be cms

# TODO 2020:

- Clean up original TODO
- Clean Up Readme
- Migrate to tailwind instead of emotion
- Move all theme styles to CMS data
- Do all source code todo's
- Consider consolidating 404 and thanks page to a generic page "type" with title / subtitle
- Consider moving layout to templates?
- Add ESLint
- Add stricter TS?
- Bundle Optimization
- Add Preact?
- Do lighthouse checks
- storybook?
- unit tests?
- describe dependencies and usefulness
