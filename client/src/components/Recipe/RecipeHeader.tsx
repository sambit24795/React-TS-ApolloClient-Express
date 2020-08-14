import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles, CardMedia } from "@material-ui/core";

const useStyles = makeStyles({
  media: {
    height: "500px",
    width: "100%",
  },
  content: {
    backgroundColor: "#CDBDAE",
    color: "#1F1F1F",
  },
});

const RecipeHeader = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Card className="CardBackdrop">
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://bar-b.nl/wp-content/uploads/2017/12/Burger-n-Beer.jpg"
          title="Burgers and Beers"
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
            Burgers and Beers
          </Typography>
          <Typography variant="body2" color="inherit" component="p">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi quae
            sequi optio quia error perferendis ratione cumque. Eum, doloribus,
            velit iste vel ex corporis dolorum, optio amet inventore provident
            quia.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RecipeHeader;
