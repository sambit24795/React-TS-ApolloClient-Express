import React from "react";
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  createStyles,
  Theme,
  Typography,
  InputBase,
  fade,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    popOver: {
      width: "max-content",
      padding: "16px",
    },
  })
);

const Navbar = ({ history }: RouteComponentProps): JSX.Element => {
  const classes = useStyles();
  const [auth, setAuth] = React.useState<boolean>(false);

  const routeHandler = () => {
    if (auth) {
      return history.push("/signout");
    }
    history.push("/signin");
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" className={classes.title}>
            <NavLink to="/">Home</NavLink>
          </Typography>

          {auth && (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          )}
          <IconButton
            aria-haspopup="true"
            color="inherit"
            onClick={routeHandler}
          >
            {auth ? <ExitToAppIcon /> : <AccountCircle />}
          </IconButton>
          <div></div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(Navbar);
