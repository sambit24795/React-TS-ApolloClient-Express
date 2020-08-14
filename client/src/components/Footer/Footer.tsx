import React from "react";
import Typography from "@material-ui/core/Typography";

import "./Footer.css";

const Footer = (): JSX.Element => {
  return (
    <div className="footer">
      <Typography color="textPrimary" component="p">
        Copyright &copy; 2020, All rights reserved.
      </Typography>
    </div>
  );
};

export default Footer;
