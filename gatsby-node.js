/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// Adding remark to md* fields in .md files
// Need to `yarn add remark remark-html`, then include the following code in
const remark = require("remark");
const remarkHTML = require("remark-html");

// Add frontmatter images to childImageSharp
const { fmImagesToRelative } = require("gatsby-remark-relative-images");

// For Blogs
const _ = require("lodash");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

// Support mutliple markdown fields in one .md file
const addFrontmatterMd = (node, actions) => {
  // Conditionals, etc. can be used here, but I omitted those just for example's sake.
  if (node.frontmatter) {
    var nodeKeys = Object.keys(node.frontmatter);
    // Get child keys
    nodeKeys.forEach(key => {
      // In array
      if (Array.isArray(node.frontmatter[key])) {
        node.frontmatter[key].forEach((v, i) => {
          addFrontmatterMdToNode(Object.keys(v), node.frontmatter[key][i]);
        });
      }

      // TODO: in object or even deeper nested objs
      // var nodeChildKeys = Object.keys(node.frontmatter[key]);
      // if (nodeChildKeys.length) {
      //   nodeChildKeys
      //     .filter(ckey => ckey.startsWith("md"))
      //     .forEach(ckey => {
      //       console.log("child key", ckey);
      //       node.frontmatter[key][ckey] = remark()
      //         .use(remarkHTML)
      //         .processSync(node.frontmatter[key][ckey])
      //         .toString();
      //     });
      // }
    });

    // Get Root keys
    addFrontmatterMdToNode(nodeKeys, node.frontmatter);
  }
};

const addFrontmatterMdToNode = (keys, parentObj) => {
  keys
    .filter(key => key.startsWith("md"))
    .forEach(key => {
      parentObj[key] = remark()
        .use(remarkHTML)
        .processSync(parentObj[key])
        .toString();
    });
};

// For Blogs
const createBlogPages = (actions, graphql) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "blog-article" } } }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach(edge => {
      const id = edge.node.id;
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(`src/templates/article.tsx`),
        // additional data can be passed via context
        context: {
          id,
        },
      });
    });

    // Tag pages:
    let tags = [];
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags);
      }
    });
    // Eliminate duplicate tags
    tags = _.uniq(tags);

    // Make tag pages
    tags.forEach(tag => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`;

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tag.tsx`),
        context: {
          tag,
        },
      });
    });
  });
};

const setSlugPath = (node, actions, getNode) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    console.log(value);
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

exports.createPages = async ({ actions, graphql }) => {
  await createBlogPages(actions, graphql);
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  fmImagesToRelative(node); // Convert image paths for gatsby and netlify cms
  addFrontmatterMd(node);
  setSlugPath(node, actions, getNode);
  return node;
};

// Fix modules that rely on window
// exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
//   if (stage === "build-html") {
//     actions.setWebpackConfig({
//       module: {
//         rules: [
//           {
//             test: /react-leaflet/,
//             use: loaders.null(),
//           },
//         ],
//       },
//     });
//   }
// };
