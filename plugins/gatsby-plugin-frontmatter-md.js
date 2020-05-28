const remark = require("remark");
const remarkHTML = require("remark-html");

// Add support for mutliple markdown fields in frontmatter on top of default body html
// Current solution is to prefix frontmatter fields that are markdown with 'md' and they will be parsed.
// Based on: https://github.com/gatsbyjs/gatsby/issues/5021
const addFrontmatterMd = (node, actions) => {
  // Conditionals, etc. can be used here, but I omitted those just for example's sake.
  if (node.frontmatter) {
    var nodeKeys = Object.keys(node.frontmatter);
    // Get child keys
    nodeKeys.forEach((key) => {
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
    .filter((key) => key.startsWith("md"))
    .forEach((key) => {
      parentObj[key] = remark()
        .use(remarkHTML)
        .processSync(parentObj[key])
        .toString();
    });
};

module.exports = addFrontmatterMd;
