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
const createTemplatePages = async (
  actions,
  graphql,
  templateKey,
  componentPath,
) => {
  const { createPage } = actions;

  const { data, errors } = await graphql(`
  {
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "${templateKey}" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            id
          }
        }
      }
    }
  }
`);
  if (errors) {
    errors.forEach((e) => console.error(e.toString()));
    throw new Error(errors);
  }

  const items = data.allMarkdownRemark.edges;

  // Create Pages
  items.forEach((edge) => {
    const id = edge.node.id;
    const frontmatterID = edge.node.frontmatter
      ? edge.node.frontmatter.id
      : undefined;
    createPage({
      path: edge.node.fields.slug,
      component: path.resolve(componentPath),
      // additional data can be passed via context
      context: {
        id,
        frontmatterID,
      },
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

const connectTagsToArticle = async (node, createNodeField, allTagNodes) => {
  if (
    node.internal.type != "MarkdownRemark" ||
    node.frontmatter.templateKey != "blog-article"
  ) {
    return;
  }
  const tagIDs = node.frontmatter.tagIDs || [];
  const tags = tagIDs.map((id) =>
    allTagNodes.find((n) => n.frontmatter.id == id),
  );
  createNodeField({
    node,
    name: `tags`,
    value: tags,
  });
};

exports.createPages = async ({ actions, graphql }) => {
  await createTemplatePages(
    actions,
    graphql,
    "blog-article",
    "src/templates/article.tsx",
  );
  await createTemplatePages(actions, graphql, "tags", "src/templates/tag.tsx");
};

exports.onCreateNode = ({ node, actions, getNode, getNodesByType }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node); // Convert image paths for gatsby and netlify cms
  addFrontmatterMd(node); // Custom plugin to transform frontmatter prefixed with md to html
  setSlugPath(node, actions, getNode);
  const allMDNodes = getNodesByType(`MarkdownRemark`);
  const allTagNodes = allMDNodes.filter(
    (n) => n.frontmatter.templateKey === "tags",
  );
  connectTagsToArticle(node, createNodeField, allTagNodes);
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
