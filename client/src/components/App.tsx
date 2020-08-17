import React, { ReactNode } from "react";

import "./App.css";
import { useRecipiesQuery } from "../generated/graphql";
import Recipe from "./Recipe/Recipes";

const App = (): JSX.Element => {
  const { loading, error, data } = useRecipiesQuery();

  const renderData = (): ReactNode => {
    if (loading) {
      return <p>loading...</p>;
    } else if (error) {
      console.error(error);
      return <p>Server Error!</p>;
    } else {
      return data && <Recipe data={data.recipies} />;
    }
  };

  return <div className="App">{renderData()}</div>;
};

export default App;
