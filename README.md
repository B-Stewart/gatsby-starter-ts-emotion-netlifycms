[![Netlify Status](https://api.netlify.com/api/v1/badges/d99d8c8d-62af-4761-9bf2-c2f317e7705e/deploy-status)](https://app.netlify.com/sites/gatsby-starter-ts-emotion-netlifycms/deploys)

# Gatsby Starter TypeScript Emotion and Netlify CMS

## Getting Started

```
$ gatsby new [SITE_DIRECTORY_NAME] https://github.com/B-Stewart/gatsby-starter-ts-emotion-netlifycms
$ cd [SITE_DIRECTORY_NAME]
$ npm start
```

### Setting up the CMS

Follow the [Netlify CMS Quick Start Guide](https://www.netlifycms.org/docs/quick-start/#authentication) to set up authentication, and hosting.

# TODO:

- Move Article Row Queries to partial queries to share logic
- Add GitHub link to site header
- Use Background Video / Image Web components
- Move Logo to CMS
- Move Favicon to CMS
- Extract the Md Gatsby child markdown helper to plugin
- Make sure the netlify relative CMS plugin doesn't conflict with links in markdown (/blog went to ../blog)
- Cleanup gatsby-node (by packages?)
- Fix production webpack analyzer to not just be cms
