import React, { useState, useContext, useEffect, useCallback } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./header.css";
import { dressMainData } from "../../ContextHook/ContextMenu";
import { Popover } from "antd";
import {
  ActivePersonIcons,
  ArrowPrevousNext,
  ArrowTopIcons,
  CotegoryIcons,
  HouseStatisticIcons,
  LocationIcons,
  MapIcons,
  MarketIcons,
  MenuCloseIcons,
  MenuOpenIcons,
  PersonIcons,
  SearchIcons,
  UploadIcons,
  VolumeIcons,
} from "../../assets/icons";
import {
  BrandAutumm,
  BrandSpring,
  BrandSummer,
  BrandWinter,
  springSeason,
  summerSeason,
  winterSeason,
  autummSeason,
  HeartImg,
  AllSeason,
  AllSeasonDesktop,
  allBrandDesktop,
  RussianFlag,
  UzbekFlag,
} from "../../assets";
import RegionsList from "../../ContextHook/RegionsList";
import Cookies from "js-cookie";
import { MdClose } from "react-icons/md";
import { HomeMainDataContext } from "../../ContextHook/HomeMainData";

import { MainPageAudioContext } from "../../ContextHook/MainPageAudio";
import { useTranslation } from "react-i18next";
import { LanguageDetectorDress } from "../../language/LanguageItems";
import i18next from "i18next";
import { SaesonDetectorDress } from "../../ContextHook/SeasonContext";

const MediumHeader = ({ stateData, setStateData }) => {
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const [data, setPage] = useContext(HomeMainDataContext);
  const [audioPlay, setAudioPlay] = useContext(MainPageAudioContext);
  const [searchMarketName, setSearchMarketName] = useState();
  const { i18n, t } = useTranslation("header");
  const [seasonDetector, setSeasonDetector] = useContext(SaesonDetectorDress);
  const [regionsList, setRegionsList] = useState(false);
  const [scrollPost, setscrollPost] = useState(0);
  const toggleRegionsShow = useCallback(() => setRegionsList(false), []);
  const toggleHamburger = () => {
    setStateData({ ...stateData, hamburgerMenu: !stateData.hamburgerMenu });
  };

  const handleScroll = () => {
    setscrollPost(document.body.getBoundingClientRect().top);
  };
  const [languageDetector, setLanguageDetector] = useContext(
    LanguageDetectorDress
  );
  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem("i18nextLng")
  );
  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage(currentLang);
    }
    setLanguageDetector({ typeLang: currentLang });
  }, [currentLang]);
  // useEffect

  useEffect(() => {
    if (stateData?.hamburgerMenu || regionsList) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [stateData?.hamburgerMenu, regionsList]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPost]);

  useEffect(() => {
    if (dressInfo?.openCatologId) {
      setDressInfo({ ...dressInfo, openCatologId: false });
    }
  }, [scrollPost]);
  const SeasonTypeArray = [
    { id: 5555, type_ru: "", type_uz: "", icons: AllSeasonDesktop },
    { id: 1111, type_ru: "Лето", type_uz: "Yoz", icons: summerSeason },
    { id: 2222, type_ru: "Осень", type_uz: "Kuz", icons: autummSeason },
    { id: 3333, type_ru: "Зима", type_uz: "Qish", icons: winterSeason },
    { id: 4444, type_ru: "Весна", type_uz: "Bahor", icons: springSeason },
  ];
  const SeasonTypeArrayMobile = [
    { id: 5555, type_ru: "Все", type_uz: "Barchasi", icons: AllSeason },
    { id: 1111, type_ru: "Лето", type_uz: "Yoz", icons: summerSeason },
    { id: 2222, type_ru: "Осень", type_uz: "Kuz", icons: autummSeason },
    { id: 3333, type_ru: "Зима", type_uz: "Qish", icons: winterSeason },
    { id: 4444, type_ru: "Весна", type_uz: "Bahor", icons: springSeason },
  ];
  const BrandTypeArray = [
    { id: 4444, type_ru: "Весна", type_uz: "Bahor", icons: BrandSpring },
    { id: 1111, type_ru: "Лето", type_uz: "Yoz", icons: BrandSummer },
    { id: 2222, type_ru: "Осень", type_uz: "Kuz", icons: BrandAutumm },
    { id: 3333, type_ru: "Зима", type_uz: "Qish", icons: BrandWinter },
    { id: 5555, type_ru: "Все", type_uz: "Barchasi", icons: allBrandDesktop },
  ];

  //------------------------------------------------------------------------------------------------

  // ----------------Wear state management----------------------------
  const [openWeather, setOpenWeather] = useState(false);
  const handleOpenChangeWeather = (newOpen) => {
    setOpenWeather(newOpen);
  };

  const handleSeason = (id) => {
    setDressInfo({ ...dressInfo, type: id });
    setSeasonDetector({ ...seasonDetector, type: id });
    setOpenWeather(false);
  };

  const contentWeather = (
    <section className="ss:w-fit md:w-[120px] h-fit m-0 p-0  data1">
      {SeasonTypeArray.map((value) => {
        return (
          <article
            key={value?.id}
            className="w-full h-[42px] md:flex items-center hidden md:pl-3 justify-start not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor"
            onClick={() => handleSeason(value.id)}
          >
            <figure className={`${value?.id !== 5555 ? "w-5" : ""} `}>
              <img src={value?.icons} alt="" className="object-cover w-full" />
            </figure>
            {(value?.type_ru || value?.type_uz) && (
              <article
                className={`ml-2 md:ml-3 flex font-AeonikProMedium text-base text-black not-italic ${seasonDetector?.TextHoverSeason}`}
              >
                {languageDetector?.typeLang === "ru" && value?.type_ru}
                {languageDetector?.typeLang === "uz" && value?.type_uz}
              </article>
            )}
          </article>
        );
      })}
      {SeasonTypeArrayMobile.map((value) => {
        return (
          <article
            key={value?.id}
            className="w-full h-[42px] flex items-center md:hidden md:justify-center md:pl-3 justify-start not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor"
            onClick={() => handleSeason(value.id)}
          >
            <figure className="mr-1 md:mr-3 w-6 ">
              <img src={value?.icons} alt="" className="object-cover w-full" />
            </figure>
            <article
              className={`flex font-AeonikProMedium text-base text-black not-italic ${seasonDetector?.TextHoverSeason}`}
            >
              {languageDetector?.typeLang === "ru" && value?.type_ru}
              {languageDetector?.typeLang === "uz" && value?.type_uz}
            </article>
          </article>
        );
      })}
    </section>
  );

  const [openLang, setOpenLang] = useState(false);

  const LanguageList = [
    { id: 1, value: "uz", type: "O'zbekcha", icons: UzbekFlag },
    { id: 2, value: "ru", type: "Русский", icons: RussianFlag },
  ];

  const handleOpenLangList = (newOpen) => {
    setOpenLang(newOpen);
  };

  const handleLangValue = (value) => {
    i18n.changeLanguage(value);
    setCurrentLang(value);
    setOpenLang(false);
  };

  const contentLang = (
    <section className="w-[115px] md:w-[155px] h-fit m-0 p-0">
      {LanguageList.map((data) => {
        return (
          <article
            key={data?.id}
            className={`p-2 text-sm cursor-pointer hover:bg-bgColor flex items-center justify-start  ${seasonDetector?.ColorSeason}`}
            onClick={() => {
              handleLangValue(data?.value);
            }}
          >
            <figure className="w-5 h-5 min-w-[20px] min-h-[20px] mr-3">
              <img className="w-full h-full" src={data?.icons} alt="" />
            </figure>
            <article
              className={`not-italic flex items-center font-AeonikProMedium text-sm leading-4 text-black  ${seasonDetector?.ColorSeason}`}
            >
              {data?.type}
            </article>
          </article>
        );
      })}
    </section>
  );

  // Location pathname
  const location = useLocation();
  const navigate = useNavigate();

  const [locationWindow, setLocationWindow] = useState("");
  const [searchForLocation, setSearchForLocation] = useState([]);
  useEffect(() => {
    setLocationWindow(location.pathname);
    setSearchForLocation(location?.pathname?.split("/"));
  }, [location.pathname]);

  const handleChange = (event) => {
    setSearchMarketName(event.target.value);
  };

  const handleClear = () => {
    setSearchMarketName("");
    setDressInfo({
      ...dressInfo,
      mainSearchName: null,
      mainSearchNameCategory: null,
      mainSearchNameCatalog: null,
      mainSearchNameshop: null,
      mainSearchNameshopMarket: null,
      mainSearchNameshopLocation: null,
    });
  };

  function getSearchClick() {
    setPage(1);
    if (
      searchForLocation?.includes("shops") &&
      searchForLocation?.length == 2
    ) {
      setDressInfo({
        ...dressInfo,
        mainSearchNameshopMarket: searchMarketName,
      });
    }
    if (
      searchForLocation?.includes("shops") &&
      searchForLocation?.length >= 3
    ) {
      setDressInfo({ ...dressInfo, mainSearchNameshop: searchMarketName });
    }
    if (
      searchForLocation?.includes("shops_location") &&
      searchForLocation?.length >= 3
    ) {
      setDressInfo({
        ...dressInfo,
        mainSearchNameshopLocation: searchMarketName,
      });
    }
    if (searchForLocation?.includes("section")) {
      setDressInfo({ ...dressInfo, mainSearchNameCategory: searchMarketName });
    }
    if (searchForLocation?.includes("categories")) {
      setDressInfo({ ...dressInfo, mainSearchNameCatalog: searchMarketName });
    }
    if (!searchForLocation?.some((item) => item?.length > 0)) {
      if (searchForLocation?.length <= 2) {
        setDressInfo({ ...dressInfo, mainSearchName: searchMarketName });
      }
    }
  }

  const _handleKeyDownSearch = (event) => {
    if (event.key === "Enter") {
      if (
        searchForLocation?.includes("shops") &&
        searchForLocation?.length == 2
      ) {
        setDressInfo({
          ...dressInfo,
          mainSearchNameshopMarket: searchMarketName,
        });
      }
      if (
        searchForLocation?.includes("shops") &&
        searchForLocation?.length >= 3
      ) {
        setDressInfo({ ...dressInfo, mainSearchNameshop: searchMarketName });
      }
      if (
        searchForLocation?.includes("shops_location") &&
        searchForLocation?.length >= 3
      ) {
        setDressInfo({
          ...dressInfo,
          mainSearchNameshopLocation: searchMarketName,
        });
      }
      if (searchForLocation?.includes("section")) {
        setDressInfo({
          ...dressInfo,
          mainSearchNameCategory: searchMarketName,
        });
      }
      if (searchForLocation?.includes("categories")) {
        setDressInfo({ ...dressInfo, mainSearchNameCatalog: searchMarketName });
      }
      if (!searchForLocation?.some((item) => item?.length > 0)) {
        if (searchForLocation?.length <= 2) {
          setDressInfo({ ...dressInfo, mainSearchName: searchMarketName });
        }
      }
    }
  };
  const goCatalogId = (id, nameru, nameuz) => {
    if (languageDetector?.typeLang === "ru") {
      if (id !== 5) {
        navigate(`/categories/${nameru?.split(" ")?.join("-")?.toLowerCase()}`);
      }
      if (id === 5) {
        navigate(
          `/categories/${nameru
            ?.split("/")
            ?.map((item) => item.trim())
            ?.join("-")
            ?.toLowerCase()}`
        );
      }
    }
    if (languageDetector?.typeLang === "uz") {
      if (id !== 5) {
        navigate(`/categories/${nameuz?.split(" ")?.join("-")?.toLowerCase()}`);
      }
      if (id === 5) {
        navigate(
          `/categories/${nameuz
            ?.split("/")
            ?.map((item) => item.trim())
            ?.join("-")
            ?.toLowerCase()}`
        );
      }
    }
  };
  useEffect(() => {
    if (
      dressInfo?.mainSearchName ||
      dressInfo?.mainSearchNameCategory ||
      dressInfo?.mainSearchNameCatalog ||
      dressInfo?.mainSearchNameshop ||
      dressInfo?.mainSearchNameshopMarket ||
      dressInfo?.mainSearchNameshopLocation
    )
      setDressInfo({
        ...dressInfo,
        mainSearchNameCategory: null,
        mainSearchNameCatalog: null,
        mainSearchNameshop: null,
        mainSearchNameshopMarket: null,
        mainSearchNameshopLocation: null,
      });
  }, [location.pathname]);
  return (
    <nav className="flex flex-col justify-center items-center m-0 p-0 box-border">
      <div
        onClick={() => setRegionsList(false)}
        className={`fixed inset-0 z-[112] duration-200 w-full h-[100vh] bg-black opacity-50
          ${regionsList ? "" : "hidden"}
        `}
      ></div>

      <div
        className={`max-w-[440px] rounded-t-[12px] mx-auto w-full fixed duration-300 z-[114] h-fit flex items-center justify-center
          ${regionsList
            ? "bottom-[64px] md:flex flex-col z-[232]"
            : "bottom-[-1500px] z-[-10]"
          }`}
      >
        {regionsList && <RegionsList onClick={toggleRegionsShow} />}
      </div>

      {dressInfo?.openCatologId && (
        <div
          onClick={() => setDressInfo({ ...dressInfo, openCatologId: false })}
          className="fixed inset-0 z-[112] w-[100%] h-[100vh] scroll-m-0"
        ></div>
      )}
      <article
        className={`fixed top-[235px] z-[113] left-[52.9%] right-1/2 overflow-hidden translate-x-[-50%] translate-y-[-50%] inset-0 w-fit h-fit shadow-modalCategoryShadow transform tras ${dressInfo?.openCatologId ? "" : "hidden"
          }`}
      >
        <div className="flex justify-center items-center z-[120]">
          <div className="w-[675px] flex flex-col shadow-modalCategoryShadow bg-white rounded-lg p-2">
            <button
              className="text-xl place-self-end pr-1 pt-1 mb-2"
              onClick={() =>
                setDressInfo({ ...dressInfo, openCatologId: false })
              }
            >
              <MenuCloseIcons colors={"#000"} />
            </button>
            <div className="ss:w-fit md:w-[650px] h-[210px] m-0 p-2 pb-4 pt-4">
              <div className="w-full flex items-start flex-wrap gap-y-6">
                {data?.getMainProductCard?.categories?.map((data, i) => {
                  return (
                    <article
                      key={data?.id}
                      onClick={() =>
                        setDressInfo({ ...dressInfo, openCatologId: false })
                      }
                      className="w-1/5 flex items-center justify-center "
                    >
                      <figure
                        onClick={() =>
                          goCatalogId(
                            data?.id,
                            languageDetector?.typeLang === "ru" &&
                            data?.name_ru,
                            languageDetector?.typeLang === "uz" && data?.name_uz
                          )
                        }
                        className="group cursor-pointer"
                      >
                        <div className="group-hover:border-black transition duration-300 w-[120px] h-[120px] border border-categoryModalBorderColor bg-categoryModalBgColor flex items-center justify-center rounded-xl">
                          <img src={data?.url_photo} alt="url_photo" />
                        </div>
                        <figcaption className="group-hover:text-black transition duration-300 text-center mt-2 text-setTexOpacity text-sm">
                          {languageDetector?.typeLang === "ru" && data?.name_ru}
                          {languageDetector?.typeLang === "uz" && data?.name_uz}
                        </figcaption>
                      </figure>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </article>
      <div className="max-w-[1280px] w-[100%] block md:flex px-3 md:px-0 md:py-0 justify-center  bg-yandexNavbar backdrop-blur-sm items-center m-auto ">
        {locationWindow !== "/allcomments" ? (
          <div className="relative">
            {/* Starting of Full Screen page section */}
            <section className="w-full justify-center items-center py-3 overscroll-none overflow-y-hidden ">
              <div className=" w-full flex items-center ss:w-full md:w-fit justify-between ">
                {/* Menu section */}
                {locationWindow !== "/locations" ? (
                  <article
                    onClick={toggleHamburger}
                    className={`flex items-center justify-center bg-btnBgColor border border-searchBgColor w-12 h-12 cursor-pointer md:hidden rounded-xl`}
                  >
                    {stateData?.hamburgerMenu ? (
                      <figure>
                        <MenuCloseIcons colors={"#000"} />
                      </figure>
                    ) : (
                      <figure>
                        <MenuOpenIcons />
                      </figure>
                    )}
                  </article>
                ) : (
                  <article
                    onClick={() => {
                      navigate(-1);
                    }}
                    className={`flex items-center justify-center bg-btnBgColor border border-searchBgColor w-12 h-12 cursor-pointer md:hidden rounded-xl`}
                  >
                    <span>
                      <ArrowPrevousNext />
                    </span>
                  </article>
                )}

                {/* Logo section */}
                <NavLink
                  to="/"
                  className="flex justify-center items-center select-none rounded-xl h-[48px] ss:w-[calc(100%-96px)] ss:p-2 ll:p-1 md:p-0 md:w-[155px] ss:ml-2 md:ml-[0px]  ss:bg-btnBgColor md:bg-transparent"
                >
                  {BrandTypeArray.filter(
                    (data) => data.id === seasonDetector.type
                  ).map((data) => {
                    return (
                      <img
                        key={data?.id}
                        className="h-full"
                        src={data?.icons}
                        alt="logo"
                      />
                    );
                  })}
                </NavLink>

                {/* Voice section */}
                <div
                  onClick={() => {
                    setAudioPlay(!audioPlay);
                  }}
                  className={` bg-btnBgColor w-11 h-11 ml-[25px] rounded-xl cursor-pointer hidden items-center justify-center md:flex`}
                >
                  <span className="w-[22px]">
                    <VolumeIcons colors={seasonDetector?.ColorSeason} />
                  </span>
                </div>

                {/* Weather section */}
                <article className="w-12 h-12 md:w-[120px]  md:h-11 bg-btnBgColor border border-searchBgColor rounded-xl ml-2">
                  <div className="w-full h-full ">
                    <Popover
                      className=" w-full h-full flex items-center justify-center rounded-lg cursor-pointer  md:px-2 md:gap-x-[5px] "
                      open={openWeather}
                      onOpenChange={handleOpenChangeWeather}
                      trigger="click"
                      options={["Hide"]}
                      placement="bottomRight"
                      content={contentWeather}
                    >
                      {SeasonTypeArray.filter(
                        (e) => e.id === seasonDetector.type
                      ).map((data) => {
                        return (
                          <figure
                            key={data?.id}
                            className="w-full h-full md:flex hidden items-center justify-center select-none cursor-pointer "
                          >
                            <img
                              src={data?.icons}
                              alt="weather"
                              className=" "
                            />
                            {data?.type_ru && data?.type_uz && (
                              <figcaption className=" ml-[10px] font-AeonikProMedium  flex items-center text-[15px] ">
                                {languageDetector?.typeLang === "ru" &&
                                  data?.type_ru}
                                {languageDetector?.typeLang === "uz" &&
                                  data?.type_uz}
                              </figcaption>
                            )}
                          </figure>
                        );
                      })}
                      {SeasonTypeArrayMobile.filter(
                        (e) => e.id === seasonDetector.type
                      ).map((data) => {
                        return (
                          <figure
                            key={data?.id}
                            className="w-full h-full md:hidden flex items-center justify-center select-none cursor-pointer  "
                          >
                            <img
                              src={data?.icons}
                              alt="weather"
                              className="mr-0 "
                            />
                          </figure>
                        );
                      })}
                    </Popover>
                  </div>
                </article>

                {/* Searching section */}
                <article className="items-center justify-center rounded-xl font-AeonikProMedium h-[44px] md:border-transparent md:w-[676px] ml-2 ss:hidden md:flex">
                  {/* Catalog section */}
                  <button
                    className={`items-center left-20 ${seasonDetector?.BtnOpacitySeason} justify-center px-5 gap-x-[10px] h-[44px] rounded-l-xl cursor-pointer hidden md:flex`}
                    onClick={() =>
                      setDressInfo({
                        ...dressInfo,
                        openCatologId: !dressInfo?.openCatologId,
                      })
                    }
                  >
                    <span>
                      <CotegoryIcons colors={seasonDetector?.ColorSeason} />
                    </span>
                    <span
                      className={`not-italic font-AeonikProMedium text-sm leading-4 `}
                    >
                      {t("Mcategory")}
                    </span>
                  </button>

                  <span className="flex md:hidden">
                    <SearchIcons />
                  </span>
                  <div className="w-full flex items-center relative">
                    <input
                      type="text"
                      name="search"
                      autoComplete="search"
                      placeholder={`${searchForLocation?.includes("shops") &&
                          searchForLocation?.length == 2
                          ? t("MsearchMar")
                          : t("MsearchProd")
                        } `}
                      className="bg-transparent w-full px-3 h-[44px] text-sm border border-transparent md:border-searchBgColor placeholder:font-AeonikProRegular"
                      value={searchMarketName || ""}
                      onChange={handleChange}
                      onKeyDown={_handleKeyDownSearch}
                    />
                    {searchMarketName && (
                      <button
                        onClick={handleClear}
                        className="absolute right-2 "
                        type="button"
                      >
                        <MdClose size={20} color={"#a1a1a1"} />
                      </button>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => getSearchClick()}
                    className="bg-searchBgColor active:scale-95 border border-searchBgColor w-[100px]  h-[44px] items-center justify-center rounded-r-xl  hidden md:flex -ml-[2px]"
                  >
                    <span>
                      <SearchIcons />
                    </span>
                  </button>
                </article>

                {/* Line border */}
                <article className="line h-5 border-x-[1px] text-textColor ss:hidden md:block mx-3"></article>

                {/* Map section */}
                <NavLink
                  to="/locations"
                  className="items-center justify-center bg-btnBgColor rounded-xl md:h-[44px] text-sm md:w-[100px] md:mt-0 hidden md:flex"
                >
                  <span className="pr-[6px]">
                    <MapIcons colors={"#000"} />
                  </span>
                  <p className="font-AeonikProMedium text-sm"> {t("Mmap")}</p>
                </NavLink>

                {/* Line border */}
                <p className="line h-5 border-x-[1px] text-textColor ss:hidden md:block mx-3"></p>

                {/* User section */}
                {localStorage.getItem("userAccess") ? (
                  <NavLink
                    to="/profile/edit"
                    className=" bg-btnBgColor rounded-xl items-center justify-center w-11 h-11 mr-2 hidden md:flex"
                  >
                    {({ isActive }) =>
                      isActive ? (
                        <span>
                          <ActivePersonIcons
                            colors={seasonDetector?.ColorSeason}
                          />
                        </span>
                      ) : (
                        <span>
                          <PersonIcons colors={"#000"} />
                        </span>
                      )
                    }
                  </NavLink>
                ) : (
                  <NavLink
                    to="/sign_in"
                    className=" bg-btnBgColor rounded-xl items-center justify-center w-11 h-11 mr-2 hidden md:flex"
                  >
                    <span>
                      <PersonIcons colors={"#000"} />
                    </span>
                  </NavLink>
                )}

                {/* Heart section */}
                <NavLink
                  to="/favourites"
                  className={
                    "bg-btnBgColor rounded-xl  items-center justify-center w-11 h-11 mr-2 md:mr-0 hidden md:flex"
                  }
                >
                  {({ isActive }) =>
                    isActive ? (
                      <span>
                        <svg
                          width="20"
                          height="18"
                          viewBox="0 0 15 14"
                          fill="#D50000"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.41337 12.8733C8.18671 12.9533 7.81337 12.9533 7.58671 12.8733C5.65337 12.2133 1.33337 9.45998 1.33337 4.79332C1.33337 2.73332 2.99337 1.06665 5.04004 1.06665C6.25337 1.06665 7.32671 1.65332 8.00004 2.55998C8.67337 1.65332 9.75337 1.06665 10.96 1.06665C13.0067 1.06665 14.6667 2.73332 14.6667 4.79332C14.6667 9.45998 10.3467 12.2133 8.41337 12.8733Z"
                            stroke="#D50000"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    ) : (
                      <figure>
                        <img src={HeartImg} className={"w-5 h-5"} alt="heart" />
                      </figure>
                    )
                  }
                </NavLink>
              </div>
            </section>

            {/*Starting of Opened Hamburger Menu section */}
            <section
              className={`flex md:hidden max-w-[440px] h-[90vh] w-[100%] z-50 fixed bg-white top-[70px] left-0 right-0 bottom-0  px-3 ${stateData?.hamburgerMenu
                  ? " flex flex-col ease-linear duration-500 overscroll-none"
                  : "left-[-500px] lg:left-[-1000px] ease-linear duration-500"
                }`}
            >
              <div
                className={`w-full h-full flex flex-col mb-[80px] flex-wrap relative`}
              >
                {/* Categories */}
                <ul className="flex flex-col w-full">
                  <li>
                    <NavLink
                      onClick={() => setRegionsList(true)}
                      // to="/signup-seller"
                      className="flex items-center bg-btnBgColor mt-3 font-AeonikProMedium h-[48px] border rounded-xl border-searchBgColor px-5 mb-3 w-full"
                    >
                      <div className="flex items-center">
                        <span className=" py-3 pr-3">
                          <LocationIcons colors={"#000"} />
                        </span>
                        <span className="ml-[11.67px]">
                          {languageDetector?.typeLang === "ru" && "Ташкент"}
                          {languageDetector?.typeLang === "uz" && "Toshkent"}
                        </span>
                      </div>
                      <span className="arrowRotate ml-auto rotate-[90deg]">
                        <ArrowTopIcons colors={"#000"} />
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={() =>
                        setStateData({ ...stateData, hamburgerMenu: false })
                      }
                      to="/shops"
                      className="flex items-center bg-btnBgColor  font-AeonikProMedium h-[52px] border rounded-xl border-searchBgColor px-5 mb-3 w-full"
                    >
                      <div className="flex items-center">
                        <span className=" py-3 pr-3">
                          <MarketIcons colors={"#000"} />
                        </span>
                        <span className="ml-[11.67px]">{t("market")}</span>
                      </div>
                      <span className="arrowRotate ml-auto rotate-[90deg]">
                        <ArrowTopIcons colors={"#000"} />
                      </span>
                    </NavLink>
                  </li>
                  <li className="line border-b w-full border-searchBgColor ls:w-full mb-3"></li>
                  <li className="flex items-center gap-x-3">
                    <div className="w-1/2 h-[52px] flex items-center bg-btnBgColor font-AeonikProMedium border rounded-xl border-searchBgColor px-5">
                      <div
                        onClick={() => {
                          setAudioPlay(!audioPlay);
                        }}
                        className="w-full flex items-center justify-center"
                      >
                        <span className=" py-3 pr-3">
                          <VolumeIcons colors={"#007DCA"} />
                        </span>
                        <span className="w-full items-center justify-center ml-[10px] text-base">
                          {t("Mmusic")}
                        </span>
                      </div>
                    </div>
                    <div className="w-1/2 h-[52px] flex items-center bg-btnBgColor font-AeonikProMedium border rounded-xl border-searchBgColor px-5">
                      {LanguageList.filter(
                        (data) => data.value === currentLang
                      ).map((data) => {
                        return (
                          <div
                            key={data?.id}
                            className="w-full flex items-center justify-between"
                          >
                            <Popover
                              key={data?.id}
                              open={openLang}
                              onOpenChange={handleOpenLangList}
                              className="w-full languageMobile flex text-[13px] items-center h-full"
                              trigger="click"
                              options={["Hide"]}
                              placement="bottom"
                              content={contentLang}
                            >
                              <span className="block min-w-[20px] w-[20px]">
                                {" "}
                                <img
                                  src={data?.icons}
                                  width={"20px"}
                                  alt=""
                                />{" "}
                              </span>
                              <p className="ml-[6px] mr-[5px] ll:ml-3 not-italic flex items-center font-AeonikProMedium text-base text-black ">
                                {data?.type}
                              </p>
                              <span className="arrowRotate ml-auto rotate-[180deg]">
                                <ArrowTopIcons colors={"#000"} />
                              </span>
                            </Popover>
                          </div>
                        );
                      })}
                    </div>
                  </li>
                </ul>

                {/* Business and Questions */}
                <div className="w-full gap-x-3 mt-3 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setStateData({ ...stateData, hamburgerMenu: false });
                      window.open(
                        " https://seller.dressme.uz",
                        "_blank"
                      );
                    }}
                    className="w-1/2 flex items-center bg-btnBgColor font-AeonikProMedium h-[52px] border rounded-xl border-searchBgColor px-5"
                  >
                    <div className="flex items-center text-center">
                      <span className=" py-3 pr-3">
                        <HouseStatisticIcons colors={"#000"} />
                      </span>
                      <span className="h-full mr-[5px] ml-[11.67px] text-[16pxpx] text-center">
                        {t("business")}
                      </span>
                    </div>
                    <span className="arrowRotate ml-auto rotate-[90deg]">
                      <ArrowTopIcons colors={"#000"} />
                    </span>
                  </button>
                  <NavLink
                    to="https://t.me/Dishkan_Kh"
                    target="_blank"
                    // onClick={() => setStateData({ ...stateData, hamburgerMenu: false })}
                    className="w-1/2 h-[52px] flex items-center bg-btnBgColor font-AeonikProMedium border rounded-xl border-searchBgColor px-5"
                  >
                    <div className="flex items-center">
                      <UploadIcons />
                      <p className="text-[16px] mr-[2px] flex items-center font-AeonikProMedium leading-4 ml-[10px] xs:ml-[12.5px]">
                        {t("Mquestion")}
                        <span>?</span>
                      </p>
                    </div>
                    <span className="arrowRotate ml-auto rotate-[90deg]">
                      <ArrowTopIcons colors={"#000"} />
                    </span>
                  </NavLink>
                </div>
              </div>
            </section>
          </div>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
};
export default MediumHeader;
