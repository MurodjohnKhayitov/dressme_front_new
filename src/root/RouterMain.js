import React, { Suspense, Fragment, useState, useEffect } from "react";
import { Route, Routes, useLocation} from "react-router-dom";
import "../index.css";
import Header from "../components/header/header";
import MobileAllComments from "../components/Home/Products/SignleMainProducts/SingleProduct/ProductComment/MobileAllComments/MobileComments";
import { EditProfilePage } from "../components/Authentication/UserProfile/ProfileEditPage/EditPageProfile";
import CatalogItems from "../components/Home/Catalog/CatalogFilter/CatalogItems";
import LoadingNetwork from "../components/Loading/LoadingNetwork";
// import ShoppingStoreOfficialByLocation from "../components/Home/Shop/ShoppingStoreOfficialByLocation";

import ShoppingStore from "../components/Home/Shop/ShoppingStore";
import { CatalogMobile } from "../components/Home/Catalog/CatalogMobile/CatalogMobile";

// -------------------------------------
const HomeIndex = React.lazy(() => import("../components/Home/Main"));
const SingleMainProduct = React.lazy(() =>
  import("../components/Home/Products/SignleMainProducts")
);
// const CatalogMain = React.lazy(() =>
//   import("../components/Home/Catalog/CatalogFilter")
// ); section
const YandexMapDressMe = React.lazy(() => import("../components/YandexMap"));
const ForgetConfirmPassword = React.lazy(() =>
  import("../components/Authentication/SignInDetail/ForgetConfirmPassword")
);
const SetNewPassword = React.lazy(() =>
  import("../components/Authentication/SignInDetail/SetNewPassword")
);
const ForgetPassword = React.lazy(() =>
  import("../components/Authentication/SignInDetail/ForgetPassword")
);
const Footer = React.lazy(() => import("../components/footer/footer"));
const ProfilePage = React.lazy(() =>
  import("../components/Authentication/UserProfile/PorofilePage/ProfilePage")
);
// const CatalogPage = React.lazy(() => import("../components/Home/Catalog"));
const ShoppingStoreOfficial = React.lazy(() =>
  import("../components/Home/Shop/ShoppingStoreOfficial")
);
const ShoppingStoreOfficialByLocation = React.lazy(() =>
  import("../components/Home/Shop/ShoppingStoreOfficialByLocation")
);
const Favourites = React.lazy(() => import("../components/Home/Favorite"));

// const ShoppingStore = React.lazy(() =>
//   import("../components/Home/Shop/ShoppingStore")
// );

const CategoryMainType = React.lazy(() =>
  import("../components/Category/CategoryForType")
);
const SignUp = React.lazy(() => import("../components/Authentication/SignUp"));
const SignIn = React.lazy(() => import("../components/Authentication/SignIn"));
const UserEmailVerification = React.lazy(() =>
  import(
    "../components/Authentication/UserEmailVerification/UserEmailVerification"
  )
);

// ------------------ ROUTERS -------------------

const RouterMain = () => {
  const location = useLocation();

  const [locationWindow, setLocationWindow] = useState("");
  useEffect(() => {
    setLocationWindow(location.pathname);
  }, [location.pathname]);

  // let pathName = window?.location?.pathname;

  return (
    <Fragment>
      <Header />

      {/* <Breadcrumbs /> */}
      {/* <BreadcrumbRoad /> */}
      <Routes>
        {/* <Route path="/" element={<HomeIndex />} /> */}

        <Route
          path="/"
          element={
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <LoadingNetwork />
                </div>
              }
            >
              <HomeIndex />
            </Suspense>
          }
        />
        <Route
          path="/locations"
          element={
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <LoadingNetwork />
                </div>
              }
            >
              <YandexMapDressMe />
            </Suspense>
          }
        />
        <Route
          path="/section/:id"
          element={
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <LoadingNetwork />
                </div>
              }
            >
              <CategoryMainType />
            </Suspense>
          }
        />

        <Route
          path="/categories"
          element={
            <Suspense fallback={<div>{/* <SkeletonHomeIndex /> */}</div>}>
              {/* {window.navigator.userAgentData.mobile ? <CatalogMobile /> : null}  */}
              <CatalogMobile />
            </Suspense>
          }
        />

        <Route path="/categories/:id" element={<CatalogItems />} />


        <Route
          path="/product/:id"
          element={
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <LoadingNetwork />
                </div>
              }
            >
              <SingleMainProduct />
            </Suspense>
          }
        />
        <Route
          path="/sign_in"
          element={
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <LoadingNetwork />
                </div>
              }
            >
              <SignIn />
            </Suspense>
          }
        />
        <Route
          path="/sign_up"
          element={
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <LoadingNetwork />
                </div>
              }
            >
              <SignUp />
            </Suspense>
          }
        />

        <Route path="/profile/settings" element={<ProfilePage />} />

        <Route path="/profile/edit" element={<EditProfilePage />} />

        {/* <Route
          index
          path="/profile/edit"
          element={
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <LoadingNetwork />
                </div>
              }
            >
              <EditProfilePage />
            </Suspense>
          }
        /> */}

        <Route
          path="/favourites"
          element={
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <LoadingNetwork />
                </div>
              }
            >
              <Favourites />
            </Suspense>
          }
        />
        <Route path="/stores" element={<ShoppingStore />} />
        <Route
          path="/shopping_store/:id"
          element={
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <LoadingNetwork />
                </div>
              }
            >
              <ShoppingStoreOfficial />
            </Suspense>
          }
        />
        <Route
          path="/shopping-store-location/:id"
          element={
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <LoadingNetwork />
                </div>
              }
            >
              <ShoppingStoreOfficialByLocation />
            </Suspense>
          }
        />
        <Route
          path="/forget_password"
          element={
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <LoadingNetwork />
                </div>
              }
            >
              <ForgetPassword />
            </Suspense>
          }
        />

        <Route
          path="/reset-password-user/:id"
          element={
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <LoadingNetwork />
                </div>
              }
            >
              <SetNewPassword />
            </Suspense>
          }
        />
        <Route
          path="/enter_password_validate"
          element={
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <LoadingNetwork />
                </div>
              }
            >
              <ForgetConfirmPassword />
            </Suspense>
          }
        />

        <Route
          path="/product/:id/allcomments"
          element={
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <LoadingNetwork />
                </div>
              }
            >
              <MobileAllComments />
            </Suspense>
          }
        />

        <Route
          path="/mail-verify-user/:id"
          element={
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <LoadingNetwork />
                </div>
              }
            >
              <UserEmailVerification />
            </Suspense>
          }
        />
      </Routes>

      {locationWindow !== "/add_user_private_data" &&
      locationWindow !== "/add_user_body_data" &&
      locationWindow !== "/confirm_password" &&
      locationWindow !== "/set_new_password" &&
      locationWindow !== "/categories" &&
      locationWindow !== "/enter_password_validate" &&
      locationWindow !== "/forget_password" &&
      locationWindow !== "/sign_up" &&
      locationWindow !== "/sign_in" &&
      locationWindow !== "/src" &&
      locationWindow !== "/allcomments" &&
      locationWindow !== "/profile/settings" &&
      locationWindow !== "/profile/edit" &&
      locationWindow !== "/locations" ? (
        <Suspense fallback={<>Loading...</>}>
          <Footer />
        </Suspense>
      ) : null}

      {/* {pathName?.includes("locations") ? null : <Footer />} */}
    </Fragment>
  );
};
export default RouterMain;
