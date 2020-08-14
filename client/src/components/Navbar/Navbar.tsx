import React, { useEffect, useState } from "react";
import { withRouter, NavLink, RouteComponentProps } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Tooltip } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { RefetchProp } from "../Hoc/withSession";
import HomeWorkRoundedIcon from "@material-ui/icons/HomeWorkRounded";

import "./Navbar.css";

interface Props extends RefetchProp, RouteComponentProps {}

const Navbar: React.FC<Props> = ({
  userData,
  client,
  history,
  refetch,
}): JSX.Element => {
  const [auth, setAuth] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setAuth(!!userData?.user);
  }, [userData]);

  const closeHandler = () => {
    setOpen(false);
  };

  const openHandler = () => {
    setOpen(true);
  };

  const logoutHandler = async () => {
    localStorage.clear();
    await refetch();
    client?.clearStore();
    history.push("/");
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className="Navbar spaceEven">
          <div className="Navbar box">
            <NavLink exact to="/" activeClassName="active">
              <HomeWorkRoundedIcon color="inherit" />
            </NavLink>
          </div>
          <div className="Navbar box">
            {auth && (
              <NavLink to="/search" activeClassName="active">
                <SearchIcon />
              </NavLink>
            )}
          </div>
          <div className="Navbar box">
            {auth ? (
              <Tooltip
                open={open}
                onClose={closeHandler}
                onOpen={openHandler}
                title="Signout"
              >
                <IconButton color="inherit" onClick={logoutHandler}>
                  <ExitToAppIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip
                open={open}
                onClose={closeHandler}
                onOpen={openHandler}
                title="Signin"
              >
                <NavLink to="/signin" activeClassName="active" exact>
                  <AccountCircle />
                </NavLink>
              </Tooltip>
            )}
          </div>

        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(Navbar);
