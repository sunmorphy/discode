import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import HomePage from "./pages/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { asyncPreloadProcess } from "./state/preload/action";
import { asyncUnsetAuthUser } from "./state/auth/action";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import DetailPage from "./pages/DetailPage";
import NotFound from "./components/sections/NotFound";
import AddPage from "./pages/AddPage";
import Loading from "./components/Loading";
import Footer from "./components/Footer";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showAddTreadModal, setShowAddTreadModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    authUser = null,
    isPreload = false,
    loading = false,
  } = useSelector((states) => states);

  useEffect(() => {
    console.log(loading);
    dispatch(asyncPreloadProcess());
    setShowLoading(loading);
  }, [loading, dispatch]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  return (
    <>
      <div className="bg-earie-black text-baby-powder">
        <div className="flex flex-col min-h-screen h-fit max-w-full lg:max-w-80% xl:max-w-65% 2xl:max-w-55% pt-16 mx-auto px-12 sm:px-6 lg:px-20">
          <Header
            authUser={authUser}
            onLogin={() => setShowLoginModal(true)}
            onRegister={() => setShowRegisterModal(true)}
            onLogout={onSignOut}
          />
          <main>
            <Toaster />
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    setLoginModal={setShowLoginModal}
                    setAddThreadModal={setShowAddTreadModal}
                  />
                }
              />
              <Route
                path="/threads/:id"
                element={<DetailPage setLoginModal={setShowLoginModal} />}
              />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer onBackToTop={scrollToTop} />
        </div>
      </div>
      {showLoginModal && (
        <LoginPage
          onCancel={() => setShowLoginModal(false)}
          onSubmit={() => setShowLoginModal(false)}
        />
      )}
      {showRegisterModal && (
        <RegisterPage
          onCancel={() => setShowRegisterModal(false)}
          onSubmit={() => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
      {showAddTreadModal && (
        <AddPage
          onCancel={() => setShowAddTreadModal(false)}
          onSubmit={() => setShowAddTreadModal(false)}
        />
      )}
      {showLoading && <Loading />}
    </>
  );
}

export default App;
