import React, { ReactNode } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { Container, Divider } from "@material-ui/core";

import RecipeHeader from "./RecipeHeader";
import Footer from "../Footer/Footer";
import { useStyles } from "./RecipeStyles";
import { Maybe, Recipe } from "../../generated/graphql";

type IncomingRecipe =
  | Maybe<
      {
        __typename?: "Recipe" | undefined;
      } & Pick<Recipe, "name" | "category" | "description" | "_id">
    >[]
  | null
  | undefined;

interface RecipeData {
  data: IncomingRecipe;
  showSearchedResult?: boolean;
}

interface Props extends RecipeData {}

const Recipes: React.FC<Props> = ({
  data,
  showSearchedResult,
}): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();

  const renderRecipeData = (): ReactNode => {
    return data?.map((recipe, index) => {
      return (
        <Grid item xs={12} sm={3} key={index}>
          <ButtonBase
            focusRipple
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{
              width: "100%",
            }}
            onClick={clickHandler.bind(null, recipe?._id)}
          >
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage:
                  'url("https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/1200px-RedDot_Burger.jpg")',
              }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
              >
                {recipe?.name}
                <span className={classes.imageMarked} />
              </Typography>
            </span>
          </ButtonBase>
        </Grid>
      );
    });
  };

  const clickHandler = (id: string | undefined | null) => {
    history.push({
      pathname: `/recipe/${id}`,
    });
  };

  return (
    <React.Fragment>
      {!showSearchedResult ? <RecipeHeader /> : null}
      <Divider flexItem variant="fullWidth" style={{ marginBottom: "10px" }} />
      <Container>
        <Grid container spacing={2}>
          {renderRecipeData()}
        </Grid>
      </Container>
      <Divider variant="fullWidth" flexItem style={{ marginBottom: "10px" }} />
      {!showSearchedResult ? <Footer /> : null}
    </React.Fragment>
  );
};

export default Recipes;
