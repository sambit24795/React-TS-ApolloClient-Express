import React from "react";
import Button from "@material-ui/core/Button";

import "./App.css";
import { useRecipiesQuery } from "../generated/graphql";

const App: React.FC = (): JSX.Element => {
  const { loading, error, data } = useRecipiesQuery();

  const renderData = () => {
    if (loading) {
      return <p>loading...</p>;
    } else if (error) {
      console.error(error);
      return <p>Server Error!</p>;
    } else {
      return data?.recipies?.map((recipe, i) => (
        <div key={i}>
          <h1>{recipe?.description}</h1>
          <Button variant="contained" color="primary">{recipe?.userName}</Button>
        </div>
      ));
    }
  };

  return <div className="App">{renderData()}</div>;
};

export default App;
