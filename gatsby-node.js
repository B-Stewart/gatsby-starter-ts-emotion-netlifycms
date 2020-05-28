/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const { fmImagesToRelative } = require("gatsby-remark-relative-images");
const _ = require("lodash");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const addFrontmatterMd = require("./plugins/gatsby-plugin-frontmatter-md");

// Creates individual article / tag pages based on existing md files and templates
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
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;

    // Create Article Pages
    posts.forEach((edge) => {
      const id = edge.node.id;
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags, // TODO: Why do I do this?
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
    posts.forEach((edge) => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags);
      }
    });
    // Eliminate duplicate tags
    tags = _.uniq(tags);

    // Create tag pages
    tags.forEach((tag) => {
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

// TODO: Document exactly what this does.
const setSlugPath = (node, actions, getNode) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
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
  addFrontmatterMd(node); // Custom plugin to transform frontmatter prefixed with md to html
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
