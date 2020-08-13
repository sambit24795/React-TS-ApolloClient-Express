import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { RefetchProp } from "../Hoc/withSession";
import HomeWorkRoundedIcon from "@material-ui/icons/HomeWorkRounded";

import "./Navbar.css";

interface Props extends RefetchProp {}

const Navbar: React.FC<Props> = ({ userData }): JSX.Element => {
  const [auth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    setAuth(!!userData?.user);
  }, [userData]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense" className="Navbar spaceEven ">
          <div className="Navbar box">
            <NavLink exact to="/">
              <HomeWorkRoundedIcon style={{ color: "#fff" }} />
            </NavLink>
          </div>
          <div className="Navbar box">
            {auth && (
              <NavLink to="/search">
                <SearchIcon style={{ color: "#fff" }} />
              </NavLink>
            )}
          </div>
          <div className="Navbar box">
            {auth ? (
              <NavLink to="/signout" activeClassName="active" exact>
                <ExitToAppIcon style={{ color: "#fff" }} />
              </NavLink>
            ) : (
              <NavLink to="/signin" activeClassName="active" exact>
                <AccountCircle style={{ color: "#fff" }} />
              </NavLink>
            )}
          </div>

          <div></div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
