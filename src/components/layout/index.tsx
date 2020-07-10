import "../../styles/main.css";

import * as React from "react";
import { Header } from "../header";
import { Footer } from "../footer";
import { Helmet } from "react-helmet";

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Helmet>
        <script
          type="module"
          src="//unpkg.com/ionicons@5.1.2/dist/ionicons/ionicons.esm.js"
        ></script>
        <script
          nomodule=""
          src="//unpkg.com/ionicons@5.1.2/dist/ionicons/ionicons.js"
        ></script>
      </Helmet>
      <Header />
      <section className="z-0 relative">{children}</section>
      <Footer />
    </>
  );
};
