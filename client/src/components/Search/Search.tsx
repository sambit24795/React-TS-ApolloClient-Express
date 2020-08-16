import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";

import { RefetchProp } from "../Hoc/withSession";
import "./Search.css";
import { useSearchedRecipeLazyQuery } from "../../generated/graphql";
import Recipes from "../Recipe/Recipes";
import { Container } from "@material-ui/core";

type Ommitedprops = Omit<RefetchProp, "userData">;

interface Props extends Ommitedprops {}

const Search: React.FC<Props> = (): JSX.Element => {
  const [getResult, { loading, data }] = useSearchedRecipeLazyQuery();

  let timerVariable: NodeJS.Timeout;

  useEffect(() => {
    return () => {
      clearInterval(timerVariable);
    };
  });

  const searchedResults = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    event.persist();
    if (event.target.value.length < 3) {
      return;
    }
    timerVariable = setTimeout(async () => {
      await getResult({
        variables: {
          searchTerm: event.target.value,
        },
      });
    }, 600);
  };

  return (
    <React.Fragment>
      <div className="Search">
        <TextField
          label="Search"
          variant="outlined"
          onChange={searchedResults}
          helperText="please eneter at least 3 characters"
        />
      </div>
      <Container>
        {loading ? <p>Loading...</p> : null}
        <Recipes data={data?.searchedRecipe} showSearchedResult />
      </Container>
    </React.Fragment>
  );
};
export default Search;
