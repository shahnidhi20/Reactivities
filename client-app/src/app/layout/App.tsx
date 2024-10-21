import { Fragment, useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./Navbar";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";

function App() {
  const locaton = useLocation();

  return (
    <Fragment>
      {locaton.pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <NavBar></NavBar>
          <Container style={{ marginTop: "7em" }}>
            <Outlet />
          </Container>
        </>
      )}
    </Fragment>
  );
}

export default observer(App);
