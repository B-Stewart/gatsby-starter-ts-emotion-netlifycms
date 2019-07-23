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

exports.onCreateNode = ({ node }) => {
  fmImagesToRelative(node);
  addFrontmatterMd(node);
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
