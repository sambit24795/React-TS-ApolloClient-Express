import React from "react";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CardMedia, IconButton, CardHeader, Avatar } from "@material-ui/core";
import FastfoodIcon from "@material-ui/icons/Fastfood";

import "./RecipeHeader.css";

const RecipeHeader = (): JSX.Element => {
  const history = useHistory();

  const clickhandler = () => {
    history.push({
      pathname: "/recipe/add",
    });
  };

  return (
    <Card className="CardBackdrop">
      <CardActionArea>
        <CardMedia
          className="Header media"
          image="https://bar-b.nl/wp-content/uploads/2017/12/Burger-n-Beer.jpg"
          title="Burgers and Beers"
        />
        <CardContent className="Header content">
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
      <CardHeader
        className="Header icon"
        avatar={<Avatar className="Header avatar">U</Avatar>}
        title=" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi quae "
        action={
          <IconButton color="inherit" onClick={clickhandler}>
            <FastfoodIcon fontSize="large" />
          </IconButton>
        }
      />
    </Card>
  );
};

export default RecipeHeader;
