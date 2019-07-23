import * as React from "react";
import { Global } from "@emotion/core";
import { colors } from "../../utilities";

export const GlobalStyles: React.SFC = () => (
  <Global
    styles={`
        * {
          font-family: "Lato", -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI",
            "Roboto", "Helvetica Neue", Arial, sans-serif;
          box-sizing: border-box;
        }

        html,
        body,
        #___gatsby {
          min-height: 100%;
          width: 100%;
          /* Base font size */
          font-size: 14px;
          line-height: 1.5;
          color: ${colors.neutral.dark};
        }

        a {
          text-decoration: none;
          color: inherit;
        }

        a:hover {
          cursor: pointer;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: "Lora", Georgia, "Times New Roman", Times, serif;
          color: ${colors.secondary.base};
          margin: 0 0 1em 0;
          letter-spacing: 1px;
        }
      `}
  />
);
