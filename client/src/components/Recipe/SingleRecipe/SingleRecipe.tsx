import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {}

const SingleRecipe: React.FC<Props> = ({ match }): JSX.Element => {

    console.log(match)
  return <div>Single Recipe </div>;
};

export default withRouter(SingleRecipe);
