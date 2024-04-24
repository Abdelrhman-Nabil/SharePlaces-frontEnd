import { Fragment, useState } from "react";
import { Outlet, Link } from "react-router-dom";

import NavLinks from "../../component/navigation/nav-links/navLink";
import SideDrawer from "../../component/navigation/sideDrop/sideDrop";
import BackDrop from "../../component/navigation/backDrop/backDrop";
import "./navigation.scss";

const Navigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };
  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };
  return (
    <Fragment>
      {drawerIsOpen && <BackDrop  onClick={closeDrawerHandler} />}
      {drawerIsOpen && (<SideDrawer onClick={closeDrawerHandler} />)}
      <div className="navigation">
        <button className="main-navigation-menu-btn" onClick={openDrawerHandler}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation-title">
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav className="main-navigation-header-nav">
          <NavLinks />
        </nav>
      </div>
      <Outlet />
    </Fragment>
  );
};
export default Navigation;
