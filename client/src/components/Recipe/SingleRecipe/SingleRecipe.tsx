import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useRecipeQuery } from "../../../generated/graphql";
import {
  makeStyles,
  Theme,
  createStyles,
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  Container,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";

import Footer from "../../Footer/Footer";

interface Props extends RouteComponentProps<any> {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: "345",
      
      backgroundColor: "#333",
      color: "#fff",
    },
    media: {
      height:0,
      paddingTop: "38.25%", // 16:9
    },
    header: {
      backgroundColor: "#cdbdae",
      color: "#333",
      border: "none",
    },
    avatar: {
      backgroundColor: "#FA4B00",
      opacity: 0.8,
    },
  })
);

const SingleRecipe: React.FC<Props> = ({ match: { params } }): JSX.Element => {
  const classes = useStyles();

  const { data } = useRecipeQuery({
    variables: {
      _id: params?._id,
    },
  });

  console.log(data);

  return (
    <React.Fragment>
      <Container>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/1200px-RedDot_Burger.jpg"
            title="Some dish"
            
          />
          <CardHeader
            className={classes.header}
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings" color="inherit">
                <FavoriteIcon />
              </IconButton>
            }
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          />
          <CardContent>
            <Typography variant="body2" color="inherit" component="p">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
              nulla libero aliquid sed alias provident nemo distinctio deleniti,
              hic exercitationem.
            </Typography>
          </CardContent>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Provident, numquam!
            </Typography>
            <Typography paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit,
              inventore aspernatur quae id totam nemo dicta exercitationem omnis
              ullam saepe temporibus! Cupiditate quasi, unde a minus corporis
              provident quidem modi aliquid sed rerum, excepturi ab magnam!
              Atque dolorem tempora dolorum.
            </Typography>
            <Typography paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi vero
              fugit, illo aliquid voluptates modi earum, odit explicabo,
              voluptatum temporibus iusto blanditiis dicta deserunt quas iste
              commodi molestiae ipsam at error voluptate alias eius repellat
              officia. Odit praesentium sapiente perspiciatis, necessitatibus
              obcaecati, laudantium libero illo architecto saepe soluta hic
              inventore.
            </Typography>
            <Typography>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis est
              cumque rerum modi eligendi iure suscipit quidem vero voluptas
              quibusdam!x
            </Typography>
          </CardContent>
        </Card>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default withRouter(SingleRecipe);
