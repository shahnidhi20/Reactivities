import { Fragment, useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./Navbar";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import { ToastContainer } from "react-toastify";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";

function App() {
  const locaton = useLocation();
  const { userStore, commonStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded)
    return <LoadingComponent content="Loading app..." />;

  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer
        position="bottom-right"
        hideProgressBar
        theme="colored"
      ></ToastContainer>

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
