import React, { useContext, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MenuCloseIcons } from "../../../../../assets/icons";
import { useMutation } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import { UserRefreshTokenContext } from "../../../../../ContextHook/UserRefreshToken";
import { useTranslation } from "react-i18next";

export default function EditPassword({ onClick }) {
  const [reFreshTokenFunc, setUserLogedIn] = useContext(
    UserRefreshTokenContext
  );

  const [state, setState] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    eyesShowOld: false,
    eyesShowNew: false,
    eyesShowConfirm: false,
    errorsGroup: null,
  });
  const { i18n, t } = useTranslation('authen')

  const url = "https://api.dressme.uz/api/user";

  // =========== POST USER EDIT DATA ==========
  const dataMutate = useMutation(() => {
    return fetch(`${url}/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${ localStorage?.getItem("userAccess")}`,
      },
      body: JSON.stringify({
        current_password: state?.oldPassword,
        new_password: state?.newPassword,
        new_confirm_password: state?.confirmNewPassword,
      }),
    }).then((res) => res.json());
  });

  const SendNewPassword = () => {
    dataMutate.mutate(
      {},
      {
        onSuccess: (res) => {
           if (res.status === 401 || res.status === 403) {
            // reFreshTokenFunc();
            SendNewPassword();
          }
          if (res?.message && !res.errors) {
            setState({ ...state, errorsGroup: res });
            toast.success(`${res?.message}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            // window.location.reload(1000);
            setState({
              ...state,
              new_password: "",
              current_password: "",
              errorsGroup: "",
            });
          } else if (res?.access_token) {
            Cookies.set("DressmeUserToken", res?.access_token);
            localStorage.setItem("userAccess", res?.access_token)
             toast.success(`Успешный вход в систему`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setState({
              ...state,
              new_password: "",
              current_password: "",
              errorsGroup: "",
            });
          } else if (res?.message && res.errors) {
            setState({ ...state, errorsGroup: res });
          }
        },
        onError: (err) => {
           throw new Error(err || "something wrong");

        },
      }
    );
  };

  return (
    <div className="w-full md:w-[455px] h-fit bg-white rounded-t-lg md:rounded-lg px-4 py-5 md:py-[35px] md:px-[50px]">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        limit={4}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="flex justify-end items-center md:mr-[-30px] md:mt-[-15px]">
        {" "}
        <button
          onClick={onClick}
          className=" border border-[#e2e2e2] rounded-lg p-[3px]"
        >
          <MenuCloseIcons width={24} height={24} colors={"#000"} />
        </button>
      </div>
      <div className="w-full flex items-center justify-center">
        <span className="text-gray-800 text-center text-2xl not-italic font-AeonikProMedium">
          {t("PPEeditPss")}
        </span>
      </div>
      <form className="mt-[30px] flex flex-col gap-y-5">
        <div className="w-full  h-fit ">
          <span className="not-italic font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
            {t("PPEeditOldPss")}          </span>
          <label className="mt-[6px] overflow-hidden pr-2 w-full flex items-center border border-searchBgColor rounded-lg ">
            <input
              className=" outline-none w-full h-[40px] pl-2 xs:h-12 placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
              type={state?.eyesShowOld ? "text" : "password"}
              placeholder={t("PPEeditOldPss")}
              name="password"
              value={state?.oldPassword || ""}
              onChange={(e) => {
                setState({
                  ...state,
                  oldPassword: e.target.value,
                });
              }}
              autoComplete="off"
              required
            />
            <span className="cursor-pointer pr-2">
              {state?.eyesShowOld ? (
                <span
                  onClick={() => setState({ ...state, eyesShowOld: false })}
                >
                  <AiOutlineEye size={20} color={"#e2e2e2"} />
                </span>
              ) : (
                <span onClick={() => setState({ ...state, eyesShowOld: true })}>
                  <AiOutlineEyeInvisible size={20} color={"#e2e2e2"} />
                </span>
              )}
            </span>
          </label>
          {state?.errorsGroup?.errors?.current_password && (
            <p className="text-[#D50000]  text-[12px] ll:text-[14px] md:text-base">
              {state?.errorsGroup?.errors?.current_password}
            </p>
          )}
        </div>
        <div className="w-full  h-fit ">
          <span className="not-italic font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
          {t("NPnewPss")} {" "}
          </span>
          <label className="mt-[6px] pr-2 overflow-hidden  w-full flex items-center border border-searchBgColor rounded-lg ">
            <input
              className=" outline-none w-full pl-2 h-[40px] xs:h-12 placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
              type={state?.eyesShowNew ? "text" : "password"}
              placeholder={t("NPnewPss")}
              name="new_password"
              value={state?.newPassword|| ""}
              onChange={(e) => {
                setState({
                  ...state,
                  newPassword: e.target.value,
                });
              }}
              autoComplete="off"
              required
            />

            <span className="cursor-pointer pr-2">
              {state?.eyesShowNew ? (
                <span
                  onClick={() => setState({ ...state, eyesShowNew: false })}
                >
                  <AiOutlineEye size={20} color={"#e2e2e2"} />
                </span>
              ) : (
                <span onClick={() => setState({ ...state, eyesShowNew: true })}>
                  <AiOutlineEyeInvisible size={20} color={"#e2e2e2"} />
                </span>
              )}
            </span>
          </label>
          {state?.errorsGroup?.errors?.new_password && (
            <p className="text-[#D50000]  text-[12px] ll:text-[14px] md:text-base">
              {state?.errorsGroup?.errors?.new_password}
            </p>
          )}
        </div>
        <div className="w-full  h-fit ">
          <span className="not-italic font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
          {t("ESenterPss")}{" "}
          </span>
          <label className="mt-[6px] pr-2  overflow-hidden w-full flex items-center border border-searchBgColor rounded-lg ">
            <input
              className=" outline-none pl-2 w-full h-[40px] xs:h-12 placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
              type={state?.eyesShowConfirm ? "text" : "password"}
              placeholder={t("ESenterPss")}
              name="confirm_new_password"
              value={state?.confirmNewPassword || ""}
              onChange={(e) => {
                setState({
                  ...state,
                  confirmNewPassword: e.target.value,
                });
              }}
              autoComplete="off"
              required
            />

            <span className="cursor-pointer pr-2">
              {state?.eyesShowConfirm ? (
                <span
                  onClick={() => setState({ ...state, eyesShowConfirm: false })}
                >
                  <AiOutlineEye size={20} color={"#e2e2e2"} />
                </span>
              ) : (
                <span
                  onClick={() => setState({ ...state, eyesShowConfirm: true })}
                >
                  <AiOutlineEyeInvisible size={20} color={"#e2e2e2"} />
                </span>
              )}
            </span>
          </label>
          {state?.errorsGroup?.errors?.new_confirm_password && (
            <p className="text-[#D50000]  text-[12px] ll:text-[14px] md:text-base">
              {state?.errorsGroup?.errors?.new_confirm_password}
            </p>
          )}
        </div>
      </form>
      <div className="w-full mt-[50px]">
        <button
          type="button"
          onClick={SendNewPassword}
          className="h-12 w-full active:scale-95  active:opacity-70 text-white rounded-lg  flex bg-borderWinter items-center justify-center text-center text-lg not-italic font-AeonikProMedium"
        >
          {t("ESrefreshPss")}
        </button>
      </div>
    </div>
  );
}
