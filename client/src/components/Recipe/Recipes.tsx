import React from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { Container, Divider } from "@material-ui/core";

import RecipeHeader from "./RecipeHeader";
import Footer from "../Footer/Footer";
import { useStyles } from "./RecipeStyles";
import { RecipiesQuery } from "../../generated/graphql";

interface RecipeData {
  data: RecipiesQuery | undefined;
}

interface Props extends RecipeData {}

const Recipes: React.FC<Props> = ({ data }): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();

  const clickHandler = (id: string | undefined | null) => {
    console.log(history);
    history.push({
      pathname: `/recipe/${id}`,
    });
  };

  return (
    <React.Fragment>
      <RecipeHeader />
      <Divider flexItem variant="fullWidth" style={{ marginBottom: "10px" }} />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            {data?.recipies?.map((recipe, index) => {
              return (
                <ButtonBase
                  focusRipple
                  key={index}
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
              );
            })}
          </Grid>
          <Grid item xs={12} sm={3}>
            <ButtonBase
              focusRipple
              //!key
              className={classes.image}
              focusVisibleClassName={classes.focusVisible}
              style={{
                width: "100%",
              }}
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
                  Burger
                  <span className={classes.imageMarked} />
                </Typography>
              </span>
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm={3}>
            <ButtonBase
              focusRipple
              //!key
              className={classes.image}
              focusVisibleClassName={classes.focusVisible}
              style={{
                width: "100%",
              }}
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
                  Burger
                  <span className={classes.imageMarked} />
                </Typography>
              </span>
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm={3}>
            <ButtonBase
              focusRipple
              //!key
              className={classes.image}
              focusVisibleClassName={classes.focusVisible}
              style={{
                width: "100%",
              }}
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
                  Burger
                  <span className={classes.imageMarked} />
                </Typography>
              </span>
            </ButtonBase>
          </Grid>
        </Grid>
      </Container>
      <Divider variant="fullWidth" flexItem style={{ marginBottom: "10px" }} />
      <Footer />
    </React.Fragment>
  );
};

export default Recipes;
