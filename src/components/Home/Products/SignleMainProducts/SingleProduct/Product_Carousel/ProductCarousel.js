import React, { useState, useEffect, useRef, useContext } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Slider from "react-slick";
import {
  BrushColorIcons,
  MenuCloseIcons,
} from "../../../../../../assets/icons";
import { dressMainData } from "../../../../../../ContextHook/ContextMenu";
import { SliderPhotosColorContext } from "../../../../../../ContextHook/SliderPhotosColor";
import { Popover } from "antd";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { HomeMainDataContext } from "../../../../../../ContextHook/HomeMainData";
import { useTranslation } from "react-i18next";
import { LanguageDetectorDress } from "../../../../../../language/LanguageItems";
import { SaesonDetectorDress } from "../../../../../../ContextHook/SeasonContext";
import { LocationIdDetector } from "../../../../../../ContextHook/LocationId";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { SelectedLocation } from "../../../../../../ContextHook/SelectedLocation";

const ProductCarousel = ({ show, data }) => {
  const [colorId, setcolorId] = useContext(SliderPhotosColorContext);
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const [dressInfo] = useContext(dressMainData);
  const [nav2] = useState();
  const [seasonDetector, setSeasonDetector] = useContext(SaesonDetectorDress);
  const [selectedLocation, setSelectedLocation, selectedSize, setSelectedSize] =
    useContext(SelectedLocation);

  const { t } = useTranslation("products");
  const [languageDetector, setLanguageDetector] = useContext(
    LanguageDetectorDress
  );
  const [locationIdDetector, setLocationIdDetector] =
    useContext(LocationIdDetector);

  const [selectedColor, setSelectedColor] = useState(data?.product?.colors[0]);

  const filterColorsOnSelect = (id) => {
    setSelectedColor(
      data?.product?.colors?.find((item) => item?.pivot?.id === id)
    );
  };

  // Remove duplicates and select only first -----

  let idMap = new Map();
  let uniqueArray = [];

  data?.product?.photos?.forEach((obj) => {
    if (!idMap.has(obj.product_color_id)) {
      idMap.set(obj.product_color_id, obj);
      uniqueArray.push(obj);
    }
  });

  const [, , wishList, setWishlist, , , oldWishList, setOldWishlist] =
    useContext(HomeMainDataContext);
  const slider1 = useRef(null);

  const [sliderState, setSliderState] = useState(0);

  let photos_length = data?.product?.photos?.length;

  useEffect(() => {
    slider1.current.slickGoTo(sliderState);
  }, [sliderState]);

  const [modalOfCarsouel, setModalOfCarsouel] = useState(false);

  const sliderRef = useRef();

  const handleClickCarosuel = (index) => {
    sliderRef.current.slickGoTo(index);
    setModalOfCarsouel(true);
  };

  useEffect(() => {
    if (modalOfCarsouel) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalOfCarsouel]);

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
    };
  }
  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <main
        className={`hidden md:flex absolute text-center cursor-pointer no-underline opacity-50 w-8 h-8 group-hover:flex items-center justify-center top-[48%] z-10 right-[20px] rounded-lg md:rounded-full bg-bgColor duration-200 border  border-searchBgColor`}
        onClick={onClick}
      >
        <button className="next">
          <GrFormNext size={20} />
        </button>
      </main>
    );
  };
  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <main
        className={`hidden md:flex absolute text-center cursor-pointer no-underline opacity-50 w-8 h-8 group-hover:flex items-center justify-center top-[48%] z-10 left-[20px] rounded-lg md:rounded-full bg-bgColor duration-200 border  border-searchBgColor`}
        onClick={onClick}
      >
        <button className="prev">
          <GrFormPrevious size={20} />
        </button>
      </main>
    );
  };

  const NextArrowModal = (props) => {
    const { onClick } = props;
    return (
      <main
        className={`fixed md:absolute text-center cursor-pointer no-underline opacity-70 w-[44px] h-[44px] flex items-center justify-center bottom-[2vh] md:top-[47%] z-10 right-[30%] md:right-[0px] rounded-full bg-bgColor duration-200 border  border-searchBgColor  `}
        onClick={onClick}
      >
        <button className="next">
          <GrFormNext size={20} />
        </button>
      </main>
    );
  };
  const PrevArrowModal = (props) => {
    const { onClick } = props;
    return (
      <main
        className={`fixed md:absolute text-center cursor-pointer no-underline opacity-70 w-[44px] h-[44px] flex items-center justify-center bottom-[2vh] md:top-[47%] z-10 left-[30%] md:left-[0px] rounded-full bg-bgColor duration-200 border  border-searchBgColor`}
        onClick={onClick}
      >
        <button className="prev">
          <GrFormPrevious size={20} />
        </button>
      </main>
    );
  };

  let settings = {
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    infinite: true,
    dots: false,
    speed: 500,
  };

  let settingsModal = {
    nextArrow: <NextArrowModal />,
    prevArrow: <PrevArrowModal />,
    infinite: true,
    dots: false,
    speed: 500,
  };

  const contentSize = (data) => {
    if (data?.category_id === "1") {
      return (
        <section className="w-[250px] h-fit p-[5px] ">
          <article className="w-full flex flex-col items-center justify-start font-AeonikProMedium text-sm text-center">
            <div className="w-full flex items-center justify-start text-base font-AeonikProRegular mb-[10px]">
              {t("size_in_numbers")}:
              <span className="ml-auto">
                {data?.min_head_girth ? data?.min_head_girth : "-"}{" "}
                {data?.max_head_girth ? "- " + data?.max_head_girth : null}
              </span>
            </div>
          </article>
        </section>
      );
    } else if (data?.category_id === "2") {
      return (
        <section className="w-[250px] h-[135px] p-[5px] ">
          <article className="w-full flex flex-col items-center justify-start font-AeonikProMedium text-sm text-center">
            <div className="w-full flex items-center justify-start text-base font-AeonikProRegular mb-[10px]">
              {t("size_in_numbers")}:
              <span className="ml-auto">
                {data?.min_wear_size ? data?.min_wear_size : "-"}{" "}
                {data?.max_wear_size ? "- " + data?.max_wear_size : null}
              </span>
            </div>
            <div className="w-full flex items-center justify-start text-base font-AeonikProRegular mb-[10px]">
              {t("bust")},{" "}
              <span className="text-[#a5a5a5] ml-1">{t("in_cm")}</span>:
              <span className="ml-auto">
                {data?.min_chest_girth ? data?.min_chest_girth : "-"}{" "}
                {data?.max_chest_girth ? "- " + data?.max_chest_girth : null}
              </span>
            </div>
            <div className="w-full flex items-center justify-between text-base font-AeonikProRegular mb-[10px]">
              {t("waist_circumference")},{" "}
              <span className="text-[#a5a5a5] ml-1">{t("in_cm")}</span>:
              <span className="ml-auto">
                {data?.min_waist_girth ? data?.min_waist_girth : "-"}{" "}
                {data?.max_waist_girth ? "- " + data?.max_waist_girth : null}
              </span>
            </div>
            <div className="w-full flex items-center justify-between text-base font-AeonikProRegular">
              {t("hip_girth")},{" "}
              <span className="text-[#a5a5a5] ml-1">{t("in_cm")}</span>:
              <span className="ml-auto">
                {data?.min_hip_girth ? data?.min_hip_girth : "-"}{" "}
                {data?.max_hip_girth ? "- " + data?.max_hip_girth : null}
              </span>
            </div>
          </article>
        </section>
      );
    } else if (data?.category_id === "3") {
      return (
        <section className="w-[250px] h-fit p-[5px] ">
          <article className="w-full flex flex-col items-center justify-start font-AeonikProMedium text-sm text-center">
            <div className="w-full flex items-center justify-start text-base font-AeonikProRegular mb-[10px]">
              {t("size_in_numbers")}:
              <span className="ml-auto">
                {data?.min_wear_size ? data?.min_wear_size : "-"}{" "}
                {data?.max_wear_size ? "- " + data?.max_wear_size : null}
              </span>
            </div>
            <div className="w-full flex items-center justify-between text-base font-AeonikProRegular mb-[10px]">
              {t("waist_circumference")},{" "}
              <span className="text-[#a5a5a5] ml-1">{t("in_cm")}</span>:
              <span className="ml-auto">
                {data?.min_waist_girth ? data?.min_waist_girth : "-"}{" "}
                {data?.max_waist_girth ? "- " + data?.max_waist_girth : null}
              </span>
            </div>
            <div className="w-full flex items-center justify-between text-base font-AeonikProRegular mb-[10px]">
              {t("hip_girth")},{" "}
              <span className="text-[#a5a5a5] ml-1">{t("in_cm")}</span>:
              <span className="ml-auto">
                {data?.min_hip_girth ? data?.min_hip_girth : "-"}{" "}
                {data?.max_hip_girth ? "- " + data?.max_hip_girth : null}
              </span>
            </div>

            <div className="w-full flex items-center justify-start text-base font-AeonikProRegular mb-[10px]">
              {t("height")},{" "}
              <span className="text-[#a5a5a5] ml-1">{t("in_cm")}</span>:
              <span className="ml-auto">
                {data?.min_height ? data?.min_height : "-"}{" "}
                {data?.max_height ? "- " + data?.max_height : null}
              </span>
            </div>
          </article>
        </section>
      );
    } else if (data?.category_id === "4") {
      return (
        <section className="w-[250px] h-fit p-[5px] ">
          <article className="w-full flex flex-col items-center justify-start font-AeonikProMedium text-sm text-center">
            <div className="w-full flex items-center justify-between text-base font-AeonikProRegular mb-[10px]">
              {t("size_in_numbers")},{" "}
              <span className="text-[#a5a5a5] ml-1">{t("in_cm")}</span>:
              <span className="ml-auto">
                {data?.wear_size ? data?.wear_size : "-"}
              </span>
            </div>
            <div className="w-full flex items-center justify-between text-base font-AeonikProRegular">
              {t("foot_length")},{" "}
              <span className="text-[#a5a5a5] ml-1">{t("in_cm")}</span>:
              <span className="ml-auto">
                {data?.min_foot_length ? data?.min_foot_length : "-"}{" "}
                {data?.max_foot_length ? "- " + data?.max_foot_length : null}
              </span>
            </div>
          </article>
        </section>
      );
    } else if (data?.category_id === "5") {
      return (
        <section className="w-[250px] h-fit p-[5px] ">
          <article className="w-full flex flex-col items-center justify-start font-AeonikProMedium text-sm text-center">
            <div className="w-full flex items-center justify-between text-base font-AeonikProRegular mb-[10px]">
              {t("size_in_numbers")},{" "}
              <span className="text-[#a5a5a5] ml-1">{t("in_cm")}</span>:
              <span className="ml-auto">
                {data?.wear_size ? data?.wear_size : "-"}
              </span>
            </div>
            <div className="w-full flex items-center justify-between text-base font-AeonikProRegular mb-[10px]">
              {t("length")},{" "}
              <span className="text-[#a5a5a5] ml-1">{t("in_cm")}</span>:
              <span className="ml-auto">
                {data?.length ? data?.length : "-"}
              </span>
            </div>
            <div className="w-full flex items-center justify-start text-base font-AeonikProRegular mb-[10px]">
              {t("width")},{" "}
              <span className="text-[#a5a5a5] ml-1">{t("in_cm")}</span>:
              <span className="ml-auto">{data?.width ? data?.width : "-"}</span>
            </div>
          </article>
        </section>
      );
    }
  };

  // filtered for modal

  let filteredForModal = data?.product?.photos?.filter(
    (item) => item?.product_color_id === colorId
  );

  useEffect(() => {
    if (!selectedLocation) {
      let n =
        data?.product?.locations?.filter(
          (v) => v?.id === locationIdDetector?.locationIdForTest
        ) || [];

      setSelectedLocation(n[0]);
    }
  }, [data]);

  useEffect(() => {
    if (dressInfo?.linkedFrom === "mainPageShopsList") {
      data?.product?.locations?.forEach((item) => {
        if (item?.address == dressInfo?.productShowSelectedLocation?.address) {
          setSelectedLocation(item);
        }
      });
    } else if (dressInfo?.linkedFrom === "shopsFromLocation") {
      data?.product?.locations?.forEach((item) => {
        if (item?.address == dressInfo?.productShowSelectedLocation?.address) {
          setSelectedLocation(item);
        }
      });
    } else if (
      dressInfo?.linkedFrom === "mainPageProductList" &&
      dressInfo?.mainSubRegionId
    ) {
      data?.product?.locations?.forEach((item) => {
        if (item?.sub_region_id == dressInfo?.mainSubRegionId) {
          setSelectedLocation(item);
        }
      });
    } else {
      setSelectedLocation(data?.product?.locations[0]);
    }
  }, [data, dressInfo]);

  // useEffect(() => {
  //   if (selectedSize === null) {
  //     setSelectedColor(data?.product?.colors[0]);
  //     setcolorId(null);
  //   }
  // }, [selectedSize]);

  useEffect(() => {
    if (!colorId) {
      setSelectedLocation(null);
      setSelectedSize(null);
    }
  }, []);

  // useEffect(() => {
  //   setSliderState(0);
  // }, [colorId]);

  useEffect(() => {
    if (colorId) {
      if (selectedLocation) {
        setSelectedSize(
          data?.product?.sizes?.find(
            (x) =>
              Number(x?.product_color_id) === Number(colorId) &&
              x?.shop_location_id == selectedLocation?.id
          )
        );
      } else {
        setSelectedSize(
          data?.product?.sizes?.find(
            (x) =>
              Number(x?.product_color_id) === Number(colorId) &&
              x?.shop_location_id == data?.product?.locations[0]?.id
          )
        );
      }

      setSliderState(0);

      setSelectedColor(
        data?.product?.colors?.find((item) => item?.pivot?.id === colorId)
      );
    }
  }, [colorId, selectedLocation]);

  let indexPage = 0;
  let indexPageSelected = 0;

  return (
    <main className="w-full md:w-fit h-full ">
      <div className="w-full">
        <section
          onClick={() => setModalOfCarsouel(false)}
          className={`fixed inset-0 z-[200] duration-200 w-full h-[100vh] bg-black opacity-60 ${
            modalOfCarsouel ? "" : "hidden"
          }`}
        ></section>
        <section
          className={`fixed z-[201] rounded-lg  w-full md:w-fit h-fit mx-auto my-auto md:m-auto cursor-pointer flex flex-col items-center justify-center inset-0 ${
            modalOfCarsouel ? "" : "hidden"
          }`}
        >
          <button
            onClick={() => setModalOfCarsouel(false)}
            className="absolute flex items-center justify-center w-[45px] h-[45px] top-[-60px] right-2 md:top-3 z-40 md:right-[-80px] rounded-full bg-bgColor opacity-50 "
          >
            <MenuCloseIcons width={20} height={20} colors="#000" />
          </button>
          <div className="w-full h-full ">
            <Slider
              className=" w-full h-[80vh] md:px-[60px] overflow-hidden md:!w-[730px] md:h-[100vh] showpageSlider bg-transparent md:rounded-lg"
              {...settingsModal}
              ref={sliderRef}
            >
              {colorId
                ? filteredForModal?.map((data, i) => {
                    if (data?.product_color_id === colorId) {
                      indexPage += 1;
                      return (
                        <article
                          key={i}
                          className="relative w-full h-[80vh] md:h-full overflow-hidden"
                        >
                          <div className="relative w-fit mx-auto rounded-lg overflow-hidden">
                            <TransformWrapper defaultScale={1}>
                              <TransformComponent>
                                <figure
                                  key={data?.id}
                                  className="relative overflow-hidden min-w-[100vw] md:min-w-[610px] h-[80vh] w-full md:h-[100vh] md:rounded-lg  bg-btnBgColor flex items-center justify-center"
                                >
                                  <img
                                    src={data?.url_photo}
                                    alt=""
                                    className={`block w-full h-fit md:h-fit object-cover overflow-hidden`}
                                  />
                                </figure>
                              </TransformComponent>
                            </TransformWrapper>
                            {filteredForModal?.length > 1 ? (
                              <div className="flex w-full absolute items-center justify-between px-5 opacity-80 text-sm font-AeonikProMedium left-0 right-0 bottom-4 md:bottom-6">
                                <span className="bg-bgCard gap-x-[3px] rounded-[8px] px-3 py-1 flex items-center justify-center text-center">
                                  <p className="h-full w-full text-center pt-[4px]">
                                    {" "}
                                    {indexPage}
                                  </p>
                                  <span className="text-center pt-[2px]">
                                    /
                                  </span>
                                  <p className="h-full w-full text-center pt-[4px]">
                                    {filteredForModal?.length}
                                  </p>
                                </span>
                              </div>
                            ) : null}
                          </div>
                        </article>
                      );
                    }
                  })
                : data?.product?.photos?.map((data, i) => {
                    return (
                      <article
                        key={i}
                        className="flex relative w-full h-[80vh] md:h-full overflow-hidden"
                      >
                        <div className="relative w-fit mx-auto rounded-lg overflow-hidden">
                          <TransformWrapper defaultScale={1}>
                            <TransformComponent>
                              <figure
                                key={data?.id}
                                className=" overflow-hidden min-w-[100vw] md:min-w-[610px] h-[80vh] w-full md:h-[100vh] md:rounded-lg  bg-btnBgColor flex items-center justify-center "
                              >
                                <img
                                  src={data?.url_photo}
                                  alt=""
                                  className={`block w-full h-fit md:h-fit object-cover overflow-hidden`}
                                />
                              </figure>
                            </TransformComponent>
                          </TransformWrapper>
                          <div
                            className={` ${
                              photos_length > 1 ? "flex" : "hidden"
                            } first-letter:flex w-full absolute items-center justify-between px-5 opacity-80 text-sm font-AeonikProMedium left-0 bottom-4 md:bottom-8`}
                          >
                            <span className="bg-bgCard gap-x-[3px] rounded-[8px] px-3 py-1 flex items-center justify-center text-center">
                              <p className="h-full w-full text-center pt-[4px]">
                                {" "}
                                {i + 1}
                              </p>
                              <span className="text-center pt-[2px]">/</span>
                              <p className="h-full w-full text-center pt-[4px]">
                                {photos_length}
                              </p>
                            </span>
                          </div>
                        </div>
                      </article>
                    );
                  })}
            </Slider>
          </div>
        </section>
      </div>

      {screenSize.width >= 768 ? (
        <section
          className={`w-full h-[620px] flex flex-col md:flex-row md:gap-x-[10px] md:sticky duration-500 ${
            show ? "visible z-20 top-[110px]" : "visible z-20 top-[16px]"
          }`}
        >
          <article className="flex w-[93px] flex-col h-[620px] overflow-y-auto VerticelScroll">
            {colorId
              ? filteredForModal?.map((data, i) => {
                  if (data?.product_color_id === colorId) {
                    return (
                      <div
                        key={i}
                        onClick={() => {
                          setSliderState(i);
                        }}
                        className="mb-2 w-full"
                      >
                        <figure
                          key={data?.id}
                          style={{
                            backgroundImage: `url("${data?.url_photo}")`,
                            backgroundColor: "rgba(0,0,0,0.6)",
                            backgroundPosition: "center center",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                          }}
                          className={`${
                            sliderState === i
                              ? "border-2 border-[#007DCA]"
                              : "border border-searchBgColor"
                          } !w-[90px] cursor-pointer !h-[120px] bg-btnBgColor rounded-lg backdrop-blur-md flex items-center justify-center`}
                        ></figure>
                      </div>
                    );
                  }
                })
              : data?.product?.photos?.map((data, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        setSliderState(i);
                      }}
                      className="mb-2"
                    >
                      <figure
                        key={data?.id}
                        style={{
                          backgroundImage: `url("${data?.url_photo}")`,
                          backgroundColor: "rgba(0,0,0,0.6)",
                          backgroundPosition: "center center",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                        }}
                        className={`${
                          sliderState === i
                            ? "border-2 border-[#007DCA]"
                            : "border border-searchBgColor"
                        }  !w-[90px] cursor-pointer !h-[120px] bg-btnBgColor rounded-lg backdrop-blur-md flex items-center justify-center`}
                      ></figure>
                    </div>
                  );
                })}
          </article>

          <article className="group mx-auto md:w-[480px] md:h-[620px]">
            <Slider
              className="w-full h-full rounded-lg"
              asNavFor={nav2}
              ref={slider1}
              {...settings}
              initialSlide={0}
              afterChange={(current) => {
                setSliderState(current);
              }}
            >
              {colorId
                ? filteredForModal?.map((data, i) => {
                    if (data?.product_color_id === colorId) {
                      return (
                        <article
                          key={i}
                          onClick={() => {
                            handleClickCarosuel(i);
                          }}
                        >
                          <figure
                            style={{
                              backgroundImage: `url("${data?.url_photo}")`,
                              backgroundColor: "rgba(0,0,0,0.85)",
                              backgroundPosition: "center center",
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                              backgroundBlendMode: "darken",
                            }}
                            className="relative w-full h-[620px] overflow-hidden border border-searchBgColor bg-btnBgColor rounded-lg flex items-center justify-center cursor-pointer"
                          >
                            <img
                              className="w-full h-fit"
                              src={data?.url_photo}
                              alt=""
                            />
                          </figure>
                        </article>
                      );
                    }
                  })
                : data?.product?.photos?.map((data, i) => {
                    return (
                      <article
                        key={i}
                        onClick={() => {
                          handleClickCarosuel(i);
                        }}
                      >
                        <figure
                          style={{
                            backgroundImage: `url("${data?.url_photo}")`,
                            backgroundColor: "rgba(0,0,0,0.85)",
                            backgroundPosition: "center center",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundBlendMode: "darken",
                          }}
                          className="relative w-full h-[620px] overflow-hidden border border-searchBgColor bg-btnBgColor rounded-lg flex items-center justify-center cursor-pointer"
                        >
                          <img
                            className="w-full h-fit"
                            src={data?.url_photo}
                            alt=""
                          />
                        </figure>
                      </article>
                    );
                  })}
            </Slider>
          </article>
        </section>
      ) : (
        <section className="w-full h-full flex flex-col">
          {/* 1 */}
          <article className="w-full ll:max-w-[440px] h-full widthInherit mx-auto ">
            <Slider
              className="w-full ll:h-[482px] rounded-lg"
              ref={slider1}
              {...settings}
              initialSlide={0}
              afterChange={(current) => {
                setSliderState(current);
              }}
            >
              {colorId
                ? filteredForModal?.map((data, i) => {
                    if (data?.product_color_id === colorId) {
                      indexPageSelected += 1;
                      return (
                        <article
                          key={i}
                          onClick={() => {
                            handleClickCarosuel(i);
                          }}
                        >
                          <figure className="relative w-full h-[478px] overflow-hidden  border border-searchBgColor bg-btnBgColor rounded-lg flex items-center justify-center cursor-pointer ">
                            <img
                              className="w-full h-full object-cover "
                              src={data?.url_photo}
                              alt=""
                            />
                            {filteredForModal?.length > 1 ? (
                              <div className="flex w-full absolute items-center justify-between px-5 opacity-80 text-sm font-AeonikProMedium left-0 right-0 bottom-4 md:bottom-6">
                                <span className="bg-bgCard gap-x-[3px] rounded-[8px] px-3 py-1 flex items-center justify-center text-center">
                                  <p className="h-full w-full text-center pt-[4px]">
                                    {" "}
                                    {indexPageSelected}
                                  </p>
                                  <span className="text-center pt-[2px]">
                                    /
                                  </span>
                                  <p className="h-full w-full text-center pt-[4px]">
                                    {filteredForModal?.length}
                                  </p>
                                </span>
                              </div>
                            ) : null}
                          </figure>
                        </article>
                      );
                    }
                  })
                : data?.product?.photos?.map((data, i) => {
                    return (
                      <article
                        key={i}
                        onClick={() => {
                          handleClickCarosuel(i);
                        }}
                        className="w-full "
                      >
                        <figure className="relative w-full h-[478px] object-cover overflow-hidden border border-searchBgColor bg-btnBgColor rounded-lg flex items-center justify-center cursor-pointer">
                          <img
                            className="w-full h-full object-cover"
                            src={data?.url_photo}
                            alt=""
                          />
                          {photos_length > 1 ? (
                            <div className="flex w-full absolute items-center justify-between px-4 opacity-80 text-sm font-AeonikProMedium left-0 right-0 bottom-4 md:bottom-6">
                              <span className="bg-bgCard gap-x-[3px] rounded-[8px] px-3 py-1 flex items-center justify-center text-center">
                                <p className="h-full w-full text-center pt-[4px]">
                                  {" "}
                                  {i + 1}
                                </p>
                                <span className="text-center pt-[2px]">/</span>

                                <p className="h-full w-full text-center pt-[4px]">
                                  {photos_length}
                                </p>
                              </span>
                            </div>
                          ) : null}
                        </figure>
                      </article>
                    );
                  })}
            </Slider>
          </article>

          {/* 2 */}
          <article className="w-full flex md:hidden items-center justify-between mb-4 mt-6">
            <section className="w-fit flex flex-wrap pr-[5px] items-center">
              {selectedSize ? (
                <>
                  <p className="mr-[8px] flex items-center font-AeonikProMedium text-[20px] text-black">
                    {selectedSize?.discount_price
                      ? parseInt(selectedSize?.discount_price)
                          ?.toLocaleString()
                          ?.split(",")
                          .join(" ")
                      : parseInt(selectedSize?.price)
                          ?.toLocaleString()
                          ?.split(",")
                          .join(" ")}{" "}
                    <span className={`text-[16px] ml-[5px]`}>
                      {t("currency")}
                    </span>
                  </p>
                  {selectedSize?.discount_price ? (
                    <p className="flex items-center font-AeonikProRegular line-through text-[16px] text-setTexOpacity">
                      {parseInt(selectedSize?.price)
                        ?.toLocaleString()
                        ?.split(",")
                        .join(" ")}{" "}
                      <span className={`${"ml-[5px] text-[14px]"}`}>
                        {t("currency")}
                      </span>
                    </p>
                  ) : null}
                </>
              ) : (
                <>
                  <p className="mr-[8px] flex items-center font-AeonikProMedium text-[20px] text-black">
                    {data?.product?.cost?.discount_price
                      ? parseInt(data?.product?.cost?.discount_price)
                          ?.toLocaleString()
                          ?.split(",")
                          .join(" ")
                      : parseInt(data?.product?.cost?.price)
                          ?.toLocaleString()
                          ?.split(",")
                          .join(" ")}{" "}
                    <span
                      className={`text-[16px] ${
                        data?.product?.cost?.discount_price
                          ? "ml-[5px]"
                          : "flex ml-[5px]"
                      }`}
                    >
                      {t("currency")}
                    </span>
                  </p>
                  {data?.product?.cost?.discount_price ? (
                    <p className="flex items-center font-AeonikProRegular line-through text-[16px] text-setTexOpacity">
                      {parseInt(data?.product?.cost?.price)
                        ?.toLocaleString()
                        ?.split(",")
                        .join(" ")}{" "}
                      <span className={`${"ml-[5px] text-[14px]"}`}>
                        {t("currency")}
                      </span>
                    </p>
                  ) : null}
                </>
              )}
            </section>

            <section
              className={`w-fit ${seasonDetector?.TextColorSeason} items-center text-sm flex ml-auto`}
            >
              <p
                className={`font-AeonikProRegular text-center ${
                  languageDetector?.typeLang === "ru"
                    ? "whitespace-nowrap ml-[8px]"
                    : null
                }`}
              >
                {t("in_stock")}:
              </p>
              <p className="ml-2 font-AeonikProMedium text-base text-right">
                {selectedSize
                  ? selectedSize?.amount
                  : data?.product?.sizes_sum_amount}
              </p>
            </section>
          </article>

          {/* 3 */}
          <article className="w-full flex flex-col">
            <div className="w-full flex items-center justify-between mb-4 text-base">
              <div className="w-fit flex items-center">
                <BrushColorIcons colors={"#000"} />
                <p className="font-AeonikProRegular mr-2 ml-[6px]">
                  {t("color")}:
                </p>
                <span className="font-AeonikProMedium">
                  {languageDetector?.typeLang === "ru" &&
                    selectedColor?.name_ru}
                  {languageDetector?.typeLang === "uz" &&
                    selectedColor?.name_uz}
                </span>
              </div>
              <button
                onClick={() => {
                  if (wishList?.includes(data?.product?.id)) {
                    setWishlist(
                      wishList?.filter((item) => item !== data?.product?.id)
                    );
                    setOldWishlist(
                      oldWishList?.filter((item) => item !== data?.product?.id)
                    );
                  } else {
                    setWishlist([...wishList, data?.product?.id]);
                  }
                }}
                className="w-10 h-10 flex md:hidden items-center justify-center rounded-xl active:scale-95 border border-searchBgColor bg-btnBgColor"
              >
                {wishList?.includes(data?.product?.id) ? (
                  <BsHeartFill color="#d50000" />
                ) : (
                  <BsHeart />
                )}
              </button>
            </div>

            {/* Mobile slider ----------- */}

            <article className="flex flex-row gap-x-1">
              {selectedSize
                ? uniqueArray?.map((data, i) => {
                    return (
                      <div
                        key={data?.id}
                        className={`${
                          data?.product_color_id ==
                          selectedSize?.product_color_id
                            ? ""
                            : "opacity-40"
                        } `}
                      >
                        <div
                          key={data?.id}
                          className={`${
                            colorId == data?.product_color_id
                              ? "border-2 border-[#007DCA]"
                              : "border border-searchBgColor"
                          }  !w-[72px] cursor-pointer !h-[96px] bg-btnBgColor rounded-lg flex items-center justify-center`}
                          onClick={() => {
                            filterColorsOnSelect(data?.product_color_id);
                            setcolorId(data?.product_color_id);
                            setSliderState(0);
                          }}
                          style={{
                            backgroundImage: `url("${data?.url_photo}")`,
                            backgroundColor: "rgba(0,0,0,0.6)",
                            backgroundPosition: "center center",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                          }}
                        ></div>
                      </div>
                    );
                  })
                : uniqueArray?.map((data, i) => {
                    return (
                      <div key={data?.id}>
                        <div
                          className={`${
                            colorId == data?.product_color_id
                              ? "border-2 border-[#007DCA]"
                              : "border border-searchBgColor"
                          }  !w-[72px] cursor-pointer !h-[96px] bg-btnBgColor rounded-lg flex items-center justify-center`}
                          onClick={() => {
                            filterColorsOnSelect(data?.product_color_id);
                            setcolorId(data?.product_color_id);
                            setSliderState(0);
                          }}
                          style={{
                            backgroundImage: `url("${data?.url_photo}")`,
                            backgroundColor: "rgba(0,0,0,0.6)",
                            backgroundPosition: "center center",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                          }}
                        ></div>
                      </div>
                    );
                  })}
            </article>
          </article>

          {/* 4 */}

          <article className="w-full h-fit flex md:hidden mt-7 mb-4 items-center">
            <section className="w-full h-fit flex flex-wrap items-center gap-x-3 gap-y-3">
              {data?.product?.category_id === "1"
                ? data?.product?.sizes?.map((data) => {
                    if (
                      data?.shop_location_id == selectedLocation?.id &&
                      selectedColor?.pivot?.id === data?.product_color_id
                    ) {
                      return (
                        <div
                          key={data?.id}
                          onClick={() => {
                            setSelectedSize(data);
                          }}
                          className={`${
                            data?.id === selectedSize?.id
                              ? "border-fullBlue"
                              : "border-[#dadada]"
                          }  w-fit px-2 !h-[39px] rounded-lg border  hover:border-fullBlue`}
                        >
                          <Popover
                            trigger={data?.min_head_girth ? "click" : "false"}
                            content={() => contentSize(data)}
                            className={`w-full !h-full cursor-pointer rounded-lg flex flex-col items-center justify-center ${
                              data?.amount === "0"
                                ? "bg-[#f6f6f9] text-[#d3d4dd]"
                                : ""
                            }`}
                          >
                            <p
                              className={`w-full font-AeonikProMedium text-sm uppercase text-center ${
                                data?.amount === "0"
                                  ? "text-[#d3d4dd]"
                                  : "text-black"
                              } `}
                            >
                              {data?.one_size ? "ONE SIZE" : null}
                            </p>
                          </Popover>
                        </div>
                      );
                    }
                  })
                : null}

              {data?.product?.category_id === "2"
                ? data?.product?.sizes?.map((data) => {
                    if (
                      data?.shop_location_id == selectedLocation?.id &&
                      selectedColor?.pivot?.id == data?.product_color_id
                    ) {
                      return (
                        <div
                          key={data?.id}
                          onClick={() => {
                            setSelectedSize(data);
                          }}
                          className={`${
                            data?.id === selectedSize?.id
                              ? "border-fullBlue"
                              : "border-[#dadada]"
                          } w-[60px] !h-[39px] rounded-lg border hover:border-fullBlue`}
                        >
                          <Popover
                            trigger="click"
                            style={{ left: "100px" }}
                            content={() => contentSize(data)}
                            className={`w-full !h-full ${
                              data?.amount === "0"
                                ? "bg-[#f6f6f9] text-[#d3d4dd]"
                                : ""
                            }  cursor-pointer rounded-lg flex flex-col items-center justify-center`}
                          >
                            <p
                              className={`w-full font-AeonikProMedium text-sm uppercase text-center ${
                                data?.amount === "0"
                                  ? "text-[#d3d4dd]"
                                  : "text-black"
                              } `}
                            >
                              {data?.letter_size}
                            </p>
                            {data?.letter_size ? (
                              <span
                                className={`w-full text-center text-[10px] font-AeonikProRegular ${
                                  data?.amount === "0"
                                    ? "text-[#d3d4dd]"
                                    : "text-[#757575]"
                                } `}
                              >
                                {data?.min_wear_size}{" "}
                                {data?.max_wear_size
                                  ? "- " + data?.max_wear_size
                                  : null}
                              </span>
                            ) : (
                              <p
                                className={`w-full font-AeonikProMedium text-sm uppercase text-center ${
                                  data?.amount === "0"
                                    ? "text-[#d3d4dd]"
                                    : "text-black"
                                }`}
                              >
                                {data?.min_wear_size}{" "}
                                {data?.max_wear_size
                                  ? "- " + data?.max_wear_size
                                  : null}
                              </p>
                            )}
                          </Popover>
                        </div>
                      );
                    }
                  })
                : null}

              {data?.product?.category_id === "3"
                ? data?.product?.sizes?.map((data) => {
                    if (
                      data?.shop_location_id == selectedLocation?.id &&
                      selectedColor?.pivot?.id === data?.product_color_id
                    ) {
                      return (
                        <div
                          key={data?.id}
                          onClick={() => {
                            setSelectedSize(data);
                          }}
                          className={`${
                            data?.id === selectedSize?.id
                              ? "border-fullBlue"
                              : "border-[#dadada]"
                          } w-[60px] !h-[39px] rounded-lg border hover:border-fullBlue`}
                        >
                          <Popover
                            trigger="click"
                            content={() => contentSize(data)}
                            className={`w-full !h-full cursor-pointer rounded-lg flex flex-col items-center justify-center ${
                              data?.amount === "0"
                                ? "bg-[#f6f6f9] text-[#d3d4dd]"
                                : ""
                            }`}
                          >
                            <p
                              className={`w-full font-AeonikProMedium text-sm uppercase text-center ${
                                data?.amount === "0"
                                  ? "text-[#d3d4dd]"
                                  : "text-black"
                              }`}
                            >
                              {data?.letter_size}
                            </p>
                            {data?.letter_size ? (
                              <span
                                className={`w-full text-center text-[10px] font-AeonikProRegular ${
                                  data?.amount === "0"
                                    ? "text-[#d3d4dd]"
                                    : "text-[#757575]"
                                }`}
                              >
                                {data?.min_wear_size}{" "}
                                {data?.max_wear_size
                                  ? "- " + data?.max_wear_size
                                  : null}
                              </span>
                            ) : (
                              <p
                                className={`w-full font-AeonikProMedium text-sm uppercase text-center ${
                                  data?.amount === "0"
                                    ? "text-[#d3d4dd]"
                                    : "text-black"
                                }`}
                              >
                                {data?.min_wear_size}{" "}
                                {data?.max_wear_size
                                  ? "- " + data?.max_wear_size
                                  : null}
                              </p>
                            )}
                          </Popover>
                        </div>
                      );
                    }
                  })
                : null}

              {data?.product?.category_id === "4"
                ? data?.product?.sizes?.map((data) => {
                    if (
                      data?.shop_location_id == selectedLocation?.id &&
                      selectedColor?.pivot?.id === data?.product_color_id
                    ) {
                      return (
                        <div
                          key={data?.id}
                          onClick={() => {
                            setSelectedSize(data);
                          }}
                          className={`${
                            data?.id === selectedSize?.id
                              ? "border-fullBlue"
                              : "border-[#dadada]"
                          } w-[60px] !h-[39px] rounded-lg border hover:border-fullBlue`}
                        >
                          <Popover
                            trigger="click"
                            content={() => contentSize(data)}
                            className={`w-full !h-full cursor-pointer rounded-lg flex flex-col items-center justify-center ${
                              data?.amount === "0"
                                ? "bg-[#f6f6f9] text-[#d3d4dd]"
                                : ""
                            }`}
                          >
                            <p
                              className={`w-full font-AeonikProMedium text-sm uppercase text-center ${
                                data?.amount === "0"
                                  ? "text-[#d3d4dd]"
                                  : "text-black"
                              }`}
                            >
                              {data?.wear_size}
                            </p>
                          </Popover>
                        </div>
                      );
                    }
                  })
                : null}

              {data?.product?.category_id === "5"
                ? data?.product?.sizes?.map((data) => {
                    if (
                      data?.shop_location_id == selectedLocation?.id &&
                      selectedColor?.pivot?.id === data?.product_color_id
                    ) {
                      if (data?.letter_size || data?.wear_size) {
                        return (
                          <div
                            key={data?.id}
                            onClick={() => {
                              setSelectedSize(data);
                            }}
                            className={`${
                              data?.id === selectedSize?.id
                                ? "border-fullBlue"
                                : "border-[#dadada]"
                            } w-[60px] !h-[39px] rounded-lg border hover:border-fullBlue`}
                          >
                            <Popover
                              trigger="click"
                              content={() => contentSize(data)}
                              className={`w-full !h-full cursor-pointer rounded-lg flex flex-col items-center justify-center ${
                                data?.amount === "0"
                                  ? "bg-[#f6f6f9] text-[#d3d4dd]"
                                  : ""
                              }`}
                            >
                              <p
                                className={`w-full font-AeonikProMedium text-sm uppercase text-center ${
                                  data?.amount === "0"
                                    ? "text-[#d3d4dd]"
                                    : "text-black"
                                }`}
                              >
                                {data?.letter_size}
                              </p>
                              <span
                                className={`w-full text-center text-[10px] font-AeonikProRegular ${
                                  data?.amount === "0"
                                    ? "text-[#d3d4dd]"
                                    : "text-[#757575]"
                                }`}
                              >
                                {data?.wear_size}
                              </span>
                            </Popover>
                          </div>
                        );
                      }
                    }
                  })
                : null}
            </section>
          </article>
        </section>
      )}
    </main>
  );
};
export { ProductCarousel };
