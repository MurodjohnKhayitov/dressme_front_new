import React, { useContext, useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import InputMask from "react-input-mask";
import { dressMainData } from "../../../ContextHook/ContextMenu";
import { DatePicker, Popover, Space } from "antd";
import { BiChevronUp } from "react-icons/bi";
import dayjs from "dayjs";

import {
  EmailIcons,
  MenuCloseIcons,
  PersonIcons,
  PhoneIcons,
  SircleNext,
  Star6Icon,
  SuccessIconsForMail,
  GenderManIcon,
  GenderFemaleIcon,
} from "../../../assets/icons";
import { UzbekFlag } from "../../../assets";
import { useMutation } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import LoadingNetwork from "../../Loading/LoadingNetwork";
import { useTranslation } from "react-i18next";
import { LanguageDetectorDress } from "../../../language/LanguageItems";
import { SaesonDetectorDress } from "../../../ContextHook/SeasonContext";

export default function SignUp() {
  // const [phone, setPhone] = useState("");
  const url = "https://api.dressme.uz/api/user/register";
  const { i18n, t } = useTranslation("authen");
  const [seasonDetector, setSeasonDetector] = useContext(SaesonDetectorDress);

  const [selectMonth, setselectMonth] = useState({
    text: t("Smonth"),
    id: false,
  });
  const [languageDetector, setLanguageDetector] = useContext(
    LanguageDetectorDress
  );

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    phoneCode: "+998",
    phoneNumber: "",
    email: "",
    day: "",
    year: "",
    password: "",
    password_confirmation: "",
    errorsGroup: "",
    eyesShow: true,
    eyesShowConfirmation: true,
    validateConfirm: true,
    requestPerson: true,
    openModalEmailMessage: false,
    gender_id: 1,
    birth_date: "",
  });

 
  let data = state?.phoneNumber.split("-");
  let arr = data.join("");
  let data1 = arr.split("(");
  let arr1 = data1.join("");
  let arr2 = arr1.split(")");
  let data2 = arr2.join("");
  let data3 = data2.split(" ");
  let data4 = data3.join("");
  const sendPhoneNumber = state.phoneNumber ? state.phoneCode + data4 : "";

  // =========== POST USER REGISTER DATA ==========
  const { mutate } = useMutation(() => {
    return fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Accept': "application/json",
        "Accept-Language": languageDetector?.typeLang,
      },
      body: JSON.stringify({
        name: state?.firstName,
        surname: state?.lastName,
        phone: sendPhoneNumber,
        email: state?.email,
        gender_id: state?.gender_id,
        birth_date: state?.birth_date,
        password: state?.password,
        password_confirmation: state?.password_confirmation,
      }),
    }).then((res) => res.json());
  });
  const onSubmit = () => {
    let date = `${state.day}${selectMonth?.id ? "-" + selectMonth?.id : ""}${state.year ? "-" + state.year : ""
      }`;

    setState({
      ...state,
      birth_date: date?.length > 7 ? date : "",
    });

    mutate(
      {},
      {
        onSuccess: (res) => {
          if (res?.message && res?.errors) {
            setLoading(false);
            setState({ ...state, errorsGroup: res });
          } else if (res?.message && !res?.errors) {
            setLoading(false);
            setselectMonth({ text: t("Smonth"), id: false });
            setState({
              ...state,
              firstName: "",
              lastName: "",
              phoneNumber: "",
              email: "",
              day: "",
              year: "",
              gender_id: 1,
              birth_date: "",
              password: "",
              password_confirmation: "",
              errorsGroup: "",
              openModalEmailMessage: true,
            });
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
          }
        },
        onError: (err) => {
          setLoading(false);
          toast.error(`${err}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        },
      }
    );
  };

  // const [timerDecrase, setTimerDecrase] = useState(60);

  let timerDecrase = 60;

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerDecrase >= 1) {
        // setTimerDecrase((timerDecrase) => timerDecrase - 1);
        timerDecrase -= 1;
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // ----------------Month state management----------------------------
  const [openMonth, setOpenMonth] = useState(false);

  const handleOpenChangeWear = (newOpen) => {
    setOpenMonth(newOpen);
  };

  const handleMonthValue = (value) => {
    setselectMonth(value);
    setOpenMonth(false);
  };

  const monthList = [
    { id: 1, type: "Январь" },
    { id: 2, type: "Февраль" },
    { id: 3, type: "Март" },
    { id: 4, type: "Апрель" },
    { id: 5, type: "Май" },
    { id: 6, type: "Июнь" },
    { id: 7, type: "Июль" },
    { id: 8, type: "Август" },
    { id: 9, type: "Сентябрь" },
    { id: 10, type: "Октябрь" },
    { id: 11, type: "Ноябрь" },
    { id: 12, type: "Декабрь" },
  ];
  const contentMonth = (
    <div className="w-[125px] h-44 overflow-auto scrollbar dark:scrollbarkdark categoryScroll">
      {monthList.map((data, i) => {
        return (
          <p
            key={data?.id}
            onClick={() => {
              handleMonthValue({ text: data?.type, id: data?.id });
            }}
            className={`w-full h-[30px] flex items-center justify-center not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`}
          >
            {data?.type}
          </p>
        );
      })}
    </div>
  );
 
  const [bDateValid, setBDateValid] = useState(true);

  const handleClick = () => {
    if (state.year) {
      setBDateValid(true);
    } else {
      setBDateValid(false);
    }
    onSubmit();
    setLoading(true);
  };
  return (
    <div className="mt-[80px] w-full">
      {loading ? (
        <div className="w-full flex justify-center">
          <LoadingNetwork />
        </div>
      ) : (
        <div className="w-full h-full">
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

          <div className="pb-10 md:py-8 w-full mb-10 flex justify-center">
            <div className="max-w-[440px] w-[100%] h-fit  md:px-[40px] md:py-[32px] ss:p-5 border border-searchBgColor rounded-lg">
              {languageDetector?.typeLang === "uz" && (
                <div className=" w-full  mb-7 not-italic font-AeonikProMedium text-[17px] ls:text-[19px] ll:text-[20px] leading-5 ss:text-start md:text-center  tracking-[0,16px] text-black">
                  Xush kelebsiz{" "}
                  <span className={`mr-1 ${seasonDetector?.TextColorSeason}`}>
                    Dressme
                  </span>
                  ga !
                </div>
              )}
              {languageDetector?.typeLang === "ru" && (
                <div className=" w-full  mb-7 not-italic font-AeonikProMedium text-[17px] ls:text-[19px] ll:text-[20px] leading-5 ss:text-start md:text-center  tracking-[0,16px] text-black">
                  Добро пожаловать в{" "}
                  <span className={`${seasonDetector?.TextColorSeason}`}>
                    Dressme
                  </span>
                  !
                </div>
              )}
              {/* Gender Registration Section */}
              <div className="flex gap-4 mb-4">
                <div
                  onClick={() => {
                    setState({ ...state, gender_id: 1 });
                  }}
                  className={`cursor-pointer flex items-center justify-center text-[14px] font-AeonikProMedium w-full h-[80px] rounded-lg border border-[#007DCA] bg-[#E5F2FA] ${state?.gender_id === 1
                    ? "border-[#007DCA] text-[#007DCA] bg-[#E5F2FA]"
                    : "border-[#F2F2F2] bg-[#FCFCFC]"
                    }`}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-[32px] h-[32px] flex items-center justify-center mb-2">
                      <GenderManIcon />
                    </div>
                    <div>{t("Sman")}</div>
                  </div>
                </div>

                <div
                  onClick={() => {
                    setState({ ...state, gender_id: 2 });
                  }}
                  className={`cursor-pointer flex items-center justify-center text-[14px] font-AeonikProMedium w-full h-[80px] rounded-lg border border-[#007DCA] bg-[#E5F2FA] ${state?.gender_id === 2
                    ? "border-[#007DCA]  text-[#007DCA] bg-[#E5F2FA]"
                    : "border-[#F2F2F2]  bg-[#FCFCFC]"
                    }`}
                >
                  <div>
                    <div className="flex flex-col items-center">
                      <div className="w-[32px] h-[32px] flex items-center justify-center mb-2">
                        <GenderFemaleIcon />
                      </div>
                      <div>{t("Swoman")}</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Name Registration Section */}
              <div className="mt-2 w-full h-fit">
                <div className="flex items-center font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
                  {t("Sfname")}
                  <span className="text-red-600 ml-[2px]">
                    <Star6Icon />
                  </span>{" "}
                </div>
                <div className="mt-[6px] px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
                  <input
                    className="  w-full h-12 placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
                    type="text"
                    name="fname"
                    autoComplete="name"
                    placeholder={t("Sfname")}
                    value={state?.firstName || ""}
                    onChange={(e) =>
                      setState({ ...state, firstName: e.target.value })
                    }
                    required
                  />
                  <span>
                    <PersonIcons colors={"#D2D2D2"} />
                  </span>
                </div>
                {state?.errorsGroup?.errors?.name && (
                  <p className="text-[#D50000]  text-[12px] ll:text-[14px] md:text-base">
                    {state?.errorsGroup?.errors?.name}
                  </p>
                )}
              </div>
              {/* Surname Registration Section */}
              <div className="mt-4 mb-4 w-full h-fit">
                <div className="flex items-center font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
                  {t("Slname")}
                  <span className="text-red-600 ml-[2px]">
                    <Star6Icon />
                  </span>{" "}
                </div>
                <div className="mt-[6px] px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
                  <input
                    className="  w-full h-12 placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
                    type="text"
                    placeholder={t("Slname")}
                    name="lname"
                    autoComplete="surname"
                    value={state?.lastName || ""}
                    onChange={(e) =>
                      setState({ ...state, lastName: e.target.value })
                    }
                    required
                  />
                  <span>
                    <PersonIcons colors={"#D2D2D2"} />
                  </span>{" "}
                </div>
                {state?.errorsGroup?.errors?.surname && (
                  <p className="text-[#D50000]  text-[12px] ll:text-[14px] md:text-base">
                    {state?.errorsGroup?.errors?.surname}
                  </p>
                )}
              </div>
              {/* Birth Registration Section */}
              <label
                // htmlFor="bdate"
                className="mb-[6px] font-AeonikProRegular text-sm flex items-center"
              >
                {t("Sbirthday")}
                <span className="text-red-600 ml-[2px]">
                  <Star6Icon />
                </span>{" "}
              </label>

              <div className="flex items-center justify-start border border-solid border-searchBgColor rounded-lg bg-btnBgColor w-full">
                <span className="h-full w-[15%] py-[14px] border-r border-searchBgColor flex">
                  <div className="mx-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M6.66699 1.6665V4.1665"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.333 1.6665V4.1665"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2.91699 7.5752H17.0837"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17.5 7.08317V14.1665C17.5 16.6665 16.25 18.3332 13.3333 18.3332H6.66667C3.75 18.3332 2.5 16.6665 2.5 14.1665V7.08317C2.5 4.58317 3.75 2.9165 6.66667 2.9165H13.3333C16.25 2.9165 17.5 4.58317 17.5 7.08317Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.0791 11.4167H13.0866"
                        stroke="black"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.0791 13.9167H13.0866"
                        stroke="black"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.99607 11.4167H10.0036"
                        stroke="black"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.99607 13.9167H10.0036"
                        stroke="black"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.91209 11.4167H6.91957"
                        stroke="black"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.91209 13.9167H6.91957"
                        stroke="black"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </span>
                <input
                  type="number"
                  name="day"
                  placeholder={t("Sday")}
                  id="day"
                  onInput={(e) => {
                    if (e.currentTarget.value < 32) {
                      setState({ ...state, day: e.currentTarget.value });
                    }
                  }}
                  value={state?.day || ""}
                  className={`text-black text-center w-[19%] h-12 flex items-center bg-btnBgColor  font-AeonikProMedium text-[14px] md:px-[14px] border-r border-searchBgColor [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                />

                <Popover
                  open={openMonth}
                  onOpenChange={handleOpenChangeWear}
                  className="w-[40%] px-[17px] h-12 bg-btnBgColor border-r flex items-center justify-between cursor-pointer select-none group"
                  trigger="click"
                  content={contentMonth}
                  placement={t("Smonth")}
                >
                  <span
                    className={`
                    ${selectMonth?.text === t("Smonth")
                        ? "text-closeColorBtn"
                        : "text-black"
                      }
                    not-italic font-AeonikProMedium text-[15px] text-center mt-1 text-sm leading-4 `}
                  >
                    {selectMonth?.text}
                  </span>
                  <span>
                    <BiChevronUp
                      size={20}
                      style={{ color: "#c2c2c2" }}
                      className={`${openMonth ? "rotate-[180deg]" : ""
                        } duration-200`}
                    />{" "}
                  </span>
                </Popover>

                <Space
                  className={`w-[26%] cursor-pointer ${bDateValid ? "" : "border"
                    }  border-red-500`}
                  direction="vertical"
                  size={12}
                  options={["Hide"]}
                >
                  <div className="flex items-center w-full pl-1 md:pl-5">
                    <span>
                      <DatePicker
                        className="font-AeonikProMedium text-[15px] flex items-center text-black"
                        placeholder={t("Syear")}
                        allowClear={false}
                        picker="year"
                        defaultValue={() => {
                          if (state.year) {
                            return dayjs(state.year, "YYYY");
                          }
                        }}
                        bordered={false}
                        suffixIcon
                        onChange={(n, s) => {
                          setState({ ...state, year: s });
                          localStorage.setItem(
                            "selectedYear",
                            JSON.stringify(s)
                          );
                        }}
                      />
                    </span>
                  </div>
                </Space>
              </div>

              {state?.errorsGroup?.errors?.surname && (
                <p className="text-[#D50000]  text-[12px] ll:text-[14px] md:text-base">
                  {state?.errorsGroup?.errors?.birth_date}
                </p>
              )}

              {/* Email Registration Section */}
              <div className="mt-4 w-full h-fit">
                <div className=" flex items-center justify-between w-full">
                  <div className="flex items-center font-AeonikProRegular text-sm leading-4 cursor-pointer text-black  tracking-[0,16px]">
                    {t("Lemail")}
                    <span className="text-red-600 ml-[2px]">
                      <Star6Icon />
                    </span>{" "}
                  </div>
                </div>
                <div className="mt-[6px] px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
                  <input
                    className="  w-full h-12 placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder={t("Lemail")}
                    value={state?.email || ""}
                    onChange={(e) =>
                      setState({ ...state, email: e.target.value })
                    }
                    required
                  />
                  <span>
                    <EmailIcons colors={"#D2D2D2"} />
                  </span>{" "}
                </div>
                {state?.errorsGroup?.errors?.email && (
                  <p className="text-[#D50000]  text-[12px] ll:text-[14px] md:text-base">
                    {state?.errorsGroup?.errors?.email}
                  </p>
                )}
              </div>

              {/* Number Registration Section */}
              <div className="mt-4 w-full h-fit">
                <div className="flex items-center font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
                  {t("SphoneNum")}
                  <span className="text-red-600 ml-[2px]">
                    <Star6Icon />
                  </span>{" "}
                </div>
                <div className="flex items-center justify-center overflow-hidden border border-searchBgColor rounded-lg">
                  <div className="ss:w-[35%] md:w-[30%] h-12 flex items-center justify-center  cursor-pointer border-r border-searchBgColor overflow-hidden">
                    <img src={UzbekFlag} alt="form-arrow-bottom" />
                    <div className="w-[40px] h-fit flex items-start justify-center select-none mx-2 not-italic font-AeonikProMedium text-base leading-4 text-black">
                      {state?.phoneCode}
                    </div>
                  </div>
                  <div className="ss:w-[65%] md:w-[70%] h-12 flex items-center justify-center overflow-hidden">
                    <InputMask
                      mask="(99) 999-99-99"
                      value={state?.phoneNumber}
                      onChange={(e) =>
                        setState({ ...state, phoneNumber: e.target.value })
                      }
                      className={`w-full px-4 h-full  flex items-center font-AeonikProMedium justify-center ${state?.phoneNumber ? "font-AeonikProMedium" : null
                        } text-base leading-4 text-black`}
                      placeholder={"(97) 123-45-67"}
                    ></InputMask>
                  </div>
                </div>
                {state?.errorsGroup?.errors?.phone && (
                  <p className="text-[#D50000]  text-[12px] ll:text-[14px] md:text-base">
                    {state?.errorsGroup?.errors?.phone}
                  </p>
                )}
              </div>

              {/* Password Registration Section */}
              <form id="password" className="mt-4 w-full h-fit">
                <div className="flex items-center font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
                  {t("Lpassword")}
                  <span className="text-red-600 ml-[2px]">
                    <Star6Icon />
                  </span>{" "}
                </div>
                <div className="mt-[6px] px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
                  <input
                    className="w-full h-12 placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
                    type={state?.eyesShow ? "password" : "text"}
                    placeholder={t("SenterPss")}
                    value={state?.password || ""}
                    name="password"
                    autoComplete="password"
                    onChange={(e) =>
                      setState({ ...state, password: e.target.value })
                    }
                    required
                  />
                  <span className="cursor-pointer">
                    {state?.eyesShow ? (
                      <AiOutlineEyeInvisible
                        onClick={() => setState({ ...state, eyesShow: false })}
                        size={20}
                      />
                    ) : (
                      <AiOutlineEye
                        onClick={() => setState({ ...state, eyesShow: true })}
                        size={20}
                      />
                    )}
                  </span>
                </div>
                <div className="not-italic mt-2 font-AeonikProRegular selec-none text-xs leading-3 text-[#9CA3AF] tracking-[0,16px]">
                  {t("Smincharacters")}
                </div>
                {state?.errorsGroup?.errors?.password && (
                  <p className="text-[#D50000]  text-[12px] ll:text-[14px] md:text-base">
                    {state?.errorsGroup?.errors?.password}
                  </p>
                )}
              </form>
              {/* Confirmation Password Registration Section */}
              <form id="confirmPassword" className="mt-4 w-full h-fit">
                <div className="flex items-center font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
                  {t("SrepeatPss")}
                  <span className="text-red-600 ml-[2px]">
                    <Star6Icon />
                  </span>{" "}
                </div>
                <div className="mt-[6px] px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
                  <input
                    className="w-full h-12 placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
                    type={state?.eyesShowConfirmation ? "password" : "text"}
                    placeholder={t("SrepeatPss")}
                    name="password"
                    autoComplete="password"
                    value={state?.password_confirmation || ""}
                    onChange={(e) =>
                      setState({
                        ...state,
                        password_confirmation: e.target.value,
                      })
                    }
                    required
                  />
                  <span className="cursor-pointer">
                    {state?.eyesShowConfirmation ? (
                      <AiOutlineEyeInvisible
                        onClick={() =>
                          setState({ ...state, eyesShowConfirmation: false })
                        }
                        size={20}
                      />
                    ) : (
                      <AiOutlineEye
                        onClick={() =>
                          setState({ ...state, eyesShowConfirmation: true })
                        }
                        size={20}
                      />
                    )}
                  </span>
                </div>
                {state?.errorsGroup?.errors?.password && (
                  <p className="text-[#D50000]  text-[12px] ll:text-[14px] md:text-base">
                    {state?.errorsGroup?.errors?.password}
                  </p>
                )}
              </form>

              {/* ----------- Email Verify Modal Start ----------- */}
              <div className="w-full md:w-1/2 h-fit ">
                <div
                  onClick={() => {
                    setState({ ...state, openModalEmailMessage: false });
                  }}
                  className={`fixed inset-0 z-[112] duration-200 w-full h-[100vh] bg-black opacity-50 ${state?.openModalEmailMessage ? "" : "hidden"
                    }`}
                ></div>
                {state?.openModalEmailMessage && (
                  <div className="fixed max-w-[490px] h-[275px]  p-3 bg-white rounded-lg  mx-auto w-full  z-[113] top-[50%] left-1/2 right-1/2 translate-x-[-50%] translate-y-[-50%] overflow-hidden">
                    <div className="flex items-center justify-end">
                      <span
                        className="cursor-pointer"
                        onClick={() => {
                          setState({
                            ...state,
                            openModalEmailMessage: false,
                          });
                        }}
                      >
                        <MenuCloseIcons colors="#303030" />
                      </span>
                    </div>
                    <div className="w-full flex items-center justify-center flex-col">
                      <button className="flex p-4 items-center justify-center rounded-full mt-4 bg-[#D8EDFF]">
                        <SuccessIconsForMail />
                      </button>
                      <p className="text-[#1F1F1F] text-3xl not-italic font-AeonikProMedium mt-5">
                        {t("SsendLink")}
                      </p>
                      <p className="text-[#8B8B8B] text-xl not-italic font-AeonikProRegular mt-[30px]">
                        {t("ScheckEmail")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              {/* ------------- Email Verify Modal End ----------- */}

              <button
                type="button"
                onClick={handleClick}
                className="mt-8 border cursor-pointer flex items-center justify-center border-searchBgColor w-full h-12 bg-SignInBgColor select-none rounded-lg active:scale-95 active:opacity-70"
              >
                <span className="not-italic font-AeonikProMedium mr-2 text-base leading-4 text-center text-white tracking-[0,16px]">
                  {t("Sregister")}
                </span>
                <span>
                  <SircleNext colors={"#fff"} />
                </span>{" "}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
