import React, { useEffect, useState } from "react";
import { withRouter, NavLink, RouteComponentProps } from "react-router-dom";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
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

  useEffect(() => {
    setAuth(!!userData?.user);
  }, [userData]);

  const logoutHandler = async () => {
    localStorage.clear();
    await refetch();
    client?.clearStore();
    history.push("/");
  };

  return (
    <div>
      <AppBar
        position="fixed"
        color="transparent"
      >
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
              <IconButton color="inherit" onClick={logoutHandler}>
                <ExitToAppIcon />
              </IconButton>
            ) : (
              <NavLink to="/signin" activeClassName="active" exact>
                <AccountCircle />
              </NavLink>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(Navbar);
