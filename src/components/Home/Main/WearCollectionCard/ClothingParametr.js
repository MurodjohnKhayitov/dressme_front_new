import React, { useState, useEffect, useContext } from "react";
import {
  BrushColorIcons,
  ClothesIcons,
  CotegoryMenuIcons,
  DollorIcons,
  InputCheckedTrueIcons,
  ManGenIcons,
  ManWomanGen,
  MenuCloseIcons,
  TopBrandsIcon,
  WinterBoyIcons,
  WomanGenIcons,
} from "../../../../assets/icons";
import { dressMainData } from "../../../../ContextHook/ContextMenu";
import { GrClose } from "react-icons/gr";
import { HomeMainDataContext } from "../../../../ContextHook/HomeMainData";
import Slider from "react-slider";
const ClothingParametr = () => {
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const [data, setData, , , page, setPage] = useContext(HomeMainDataContext);

  const [state, setState] = useState({
    clothesTypeMobile: false,
    priceToggleMobile: false,
    genderMobile: false,
    selectColorToggleMobile: false,
    minPrice: 60000,
    maxPrice: 1800000,
  });

  useEffect(() => {
    if (
      state?.clothesTypeMobile ||
      state?.priceToggleMobile ||
      state?.genderMobile ||
      state?.selectColorToggleMobile
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [
    state?.clothesTypeMobile,
    state?.priceToggleMobile,
    state?.genderMobile,
    state?.selectColorToggleMobile,
  ]);

  const [iconsColor] = useState("black");

  const [personItems, setPersonItems] = useState([
    {
      id: 1111,
      childText: [
        { id: 0, anyIcons: <CotegoryMenuIcons />, name: "Все", action: false },
        { id: 1, anyIcons: <ManGenIcons />, name: "", action: false },
        { id: 2, anyIcons: <WomanGenIcons />, name: "", action: false },
        { id: 3, anyIcons: <WinterBoyIcons />, name: "", action: false },
      ],
    },
    {
      id: 2222,
      childText: [
        { id: 0, anyIcons: <CotegoryMenuIcons />, name: "Все", action: false },
        { id: 1, anyIcons: <ManGenIcons />, name: "", action: false },
        { id: 2, anyIcons: <WomanGenIcons />, name: "", action: false },
        { id: 3, anyIcons: <WinterBoyIcons />, name: "", action: false },
      ],
    },
    {
      id: 3333,
      childText: [
        { id: 0, anyIcons: <CotegoryMenuIcons />, name: "Все", action: false },
        { id: 1, anyIcons: <ManGenIcons />, name: "", action: false },
        { id: 2, anyIcons: <WomanGenIcons />, name: "", action: false },
        { id: 3, anyIcons: <WinterBoyIcons />, name: "", action: false },
      ],
    },
    {
      id: 4444,
      childText: [
        { id: 0, anyIcons: <CotegoryMenuIcons />, name: "Все", action: false },
        { id: 1, anyIcons: <ManGenIcons />, name: "", action: false },
        { id: 2, anyIcons: <WomanGenIcons />, name: "", action: false },
        { id: 3, anyIcons: <WinterBoyIcons />, name: "", action: false },
      ],
    },
    {
      id:5555,
      childText: [
        { id: 0, anyIcons: <CotegoryMenuIcons />, name: "Все", action: true },
        { id: 1, anyIcons: <ManGenIcons />, name: "", action: false },
        { id: 2, anyIcons: <WomanGenIcons />, name: "", action: false },
        { id: 3, anyIcons: <WinterBoyIcons />, name: "", action: false },
      ],
    },
  ]);

  const onFilterCategory = (value) => {
    setDressInfo({ ...dressInfo, mainCategoryId: value });
  };

  const onClearFilterCategoryId = () => {
    setDressInfo({ ...dressInfo, mainCategoryId: null });
    // setState({ ...state, clothesTypeMobile: false });
  };

  const [minPrice, setMinPrice] = useState(
    Number(data?.getMainProductCard?.budget?.min_price)
  );
  const [maxPrice, setMaxPrice] = useState(
    Number(data?.getMainProductCard?.budget?.max_price)
  );

  const [values, setValues] = useState([]);

  useEffect(() => {
    setMinPrice(Number(data?.getMainProductCard?.budget?.min_price));
    setMaxPrice(Number(data?.getMainProductCard?.budget?.max_price));
    if (
      data?.getMainProductCard?.budget?.min_price &&
      data?.getMainProductCard?.budget?.max_price
    ) {
      if (!values[0] && !values[1]) {
        setValues([
          Number(data?.getMainProductCard?.budget?.min_price),
          Number(data?.getMainProductCard?.budget?.max_price),
        ]);
      }
    }
    if (
      !data?.getMainProductCard?.budget?.min_price &&
      !data?.getMainProductCard?.budget?.max_price
    ) {
      setValues([0, 0]);
    }
  }, [data?.getMainProductCard?.budget]);

  useEffect(() => {
    if (values[1] && values[0] && minPrice && maxPrice) {
      if (minPrice !== values[0] || maxPrice !== values[1]) {
        setState({ ...state, clearPrice: true });
      }
    }
  }, [values]);

  const sendPriceList = () => {
    setDressInfo({ ...dressInfo, mainRangePrice: values });
  };

  const clearPriceValue = () => {
    setState({ ...state, clearPrice: false, openPrice: false });
    setValues([
      Number(data?.getMainProductCard?.budget?.min_price),
      Number(data?.getMainProductCard?.budget?.max_price),
    ]);
    setDressInfo({ ...dressInfo, mainRangePrice: [] });
  };

  const newColorArrayId = (hex, id) => {
    setPage(1);
    if (!dressInfo?.mainColorHex) {
      setDressInfo({ ...dressInfo, mainColorId: id, mainColorHex: hex });
    }
    if (dressInfo?.mainColorHex === hex) {
      setDressInfo({ ...dressInfo, mainColorId: null, mainColorHex: null });
    }
    if (dressInfo?.mainColorHex !== hex) {
      setDressInfo({ ...dressInfo, mainColorId: id, mainColorHex: hex });
    }
  };
  const ClearColorId = () => {
    setDressInfo({ ...dressInfo, mainColorId: null, mainColorHex: null });
  };

  const handleFilterByUser = (fathId, childId) => {
    if (childId === 0) {
      setDressInfo({ ...dressInfo, mainGenderId: 0 });
    } else if (childId > 0) {
      setDressInfo({ ...dressInfo, mainGenderId: childId });
    }
  };

  return (
    <main className="max-w-[1280px] w-[100%] flex flex-col items-center m-auto md:px-0">
      <section className="w-full md:hidden flex items-center justify-between pb-3 gap-x-2">
        <button
          onClick={() => {
            setState({
              ...state,
              clothesTypeMobile: !state.clothesTypeMobile,
            });
          }}
          className="w-[25%] active:scale-95 rounded-[12px] bg-btnBgColor border border-searchBgColor flex items-center justify-center px-4 h-[48px]"
        >
          <p>
            {" "}
            <ClothesIcons colors={"#000"} />
          </p>
        </button>
        <button
          onClick={() =>
            setState({
              ...state,
              priceToggleMobile: !state.priceToggleMobile,
            })
          }
          className="w-[25%] active:scale-95 rounded-[12px] bg-btnBgColor border border-searchBgColor flex items-center justify-center px-4 h-[48px] "
        >
          <span>
            {" "}
            <DollorIcons colors={"#000"} />
          </span>
        </button>
        <button
          onClick={() =>
            setState({
              ...state,
              selectColorToggleMobile: !state.selectColorToggleMobile,
            })
          }
          className="w-[25%] active:scale-95 rounded-[12px] bg-btnBgColor border border-searchBgColor flex items-center justify-center px-4 h-[48px]"
        >
          <span>
            {" "}
            <BrushColorIcons colors={iconsColor} />
          </span>
        </button>
        <button
          onClick={() =>
            setState({
              ...state,
              genderMobile: !state.genderMobile,
            })
          }
          className="w-[25%] active:scale-95 rounded-[12px] bg-btnBgColor border border-searchBgColor flex items-center justify-center px-4 h-[48px]"
        >
          <span>
            {" "}
            <TopBrandsIcon colors={"#000"} />
          </span>
        </button>
      </section>

      <section className="w-full">
        {/* Cateories */}
        <section
          className={`h-fit top-30 left-[16px] fixed bg-white shadow-lg duration-200 z-50 ${
            state?.clothesTypeMobile ? "w-[92%]" : "w-0"
          }  `}
        >
          {state?.clothesTypeMobile && (
            <div className="fixed inset-0 z-10">
              <div
                className="fixed inset-0 w-full h-full bg-black opacity-40"
                onClick={() => setState({ ...state, clothesTypeMobile: false })}
              ></div>
              <div className="flex items-center min-h-screen px-4 py-8 ">
                <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                  <div className="flex items-center justify-between border-b border-searchBgColor pb-3 ">
                    <span className="text-black text-lg not-italic font-AeonikProRegular leading-5">
                      По категории
                    </span>
                    <button
                      type=""
                      onClick={() =>
                        setState({ ...state, clothesTypeMobile: false })
                      }
                    >
                      <GrClose size={22} />
                    </button>
                  </div>
                  <div className="pt-2 flex flex-col">
                    {data?.getMainProductCard?.categories?.map((data) => {
                      return (
                        <div className={` w-full flex items-center rounded-lg`}>
                          <div
                            key={data?.id}
                            onClick={() => {
                              onFilterCategory(data?.id);
                            }}
                            className={`${
                              data?.id === dressInfo?.mainCategoryId
                                ? "text-borderWinter bg-[#F6F6F6]"
                                : ""
                            }  ${
                              dressInfo?.TextHoverSeason
                            } relative bg-bgCard text-base text-[#303030] font-AeonikProMedium hover:bg-[#F6F6F6] w-[100%] h-10 xs:h-12 rounded-lg cursor-pointer flex items-center justify-center hover:duration-300 hover:ease-linear `}
                          >
                            {data.name_ru}
                          </div>
                        </div>
                      );
                    })}

                    <div className="w-full flex items-center justify-end">
                      {dressInfo?.mainCategoryId && (
                        <button
                          onClick={() => onClearFilterCategoryId()}
                          className="flex items-center text-fullBlue active:scale-95  active:opacity-70 justify-center px-2 pt-1"
                        >
                          Отключить
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Prizes */}
        <section
          className={`h-fit top-30 left-[16px] fixed bg-white shadow-lg duration-200 z-50 ${
            state?.priceToggleMobile ? "w-[92%]" : "w-0"
          }  `}
        >
          {state?.priceToggleMobile && (
            <div className="fixed inset-0 z-10 ">
              <div
                className="fixed inset-0 w-full h-full bg-black opacity-40"
                onClick={() => setState({ ...state, priceToggleMobile: false })}
              ></div>
              <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                  <div className="max-w-[350px] w-full h-[180px] m-0 ">
                    <div className="flex items-center justify-between border-b border-searchBgColor pb-3">
                      <span className="text-black text-lg not-italic font-AeonikProRegular leading-5">
                        По ценам
                      </span>
                      <span
                        onClick={() =>
                          setState({ ...state, priceToggleMobile: false })
                        }
                        className="w-6 h-6 cursor-pointer"
                      >
                        <MenuCloseIcons
                          className="w-[24px] h-[24px]"
                          colors={"#000"}
                        />
                      </span>
                    </div>
                    <div className="  flex flex-col rounded-lg  w-full pb-5 pt-10">
                      <div className="flex justify-between items-center mb-6 w-full px-2">
                        <div className="flex ">
                          <span className="flex items-center justify-start not-italic font-AeonikProMedium text-[13px] leading-3 text-center text-[#555] ">
                            от
                          </span>
                          <span className="flex items-center ml-2 justify-center not-italic font-AeonikProMedium text-base leading-3 text-center text-black">
                            <input
                              className="w-[70px] outline-none h-[32px] flex items-center rounded-lg text-center border border-searchBgColor px-[2px] mr-1"
                              name="name"
                              // value={state?.minPrice}
                              defaultValue={Number(
                                data?.getMainProductCard?.budget?.min_price
                              ).toLocaleString()}
                              // onChange={(e) =>
                              //   setData(
                              //     data?.getMainProductCard?.budget?.min_price
                              //   )
                              // }
                            />{" "}
                            сум
                          </span>
                        </div>
                        <div className="flex ">
                          <span className="flex items-center justify-start not-italic font-AeonikProMedium text-[13px] leading-3 text-center text-text-[#555] ">
                            до
                          </span>
                          <span className="flex items-center ml-2 justify-center not-italic font-AeonikProMedium text-base leading-3 text-center text-black">
                            <input
                              className="w-[100px] outline-none h-[32px] flex items-center rounded-lg text-center border border-searchBgColor px-[2px] mr-1"
                              name="name"
                              // value={state?.maxPrice}
                              defaultValue={Number(
                                data?.getMainProductCard?.budget?.max_price
                              ).toLocaleString()}
                              // onChange={(e) =>
                              //   setState({ ...state, maxPrice: e.target.value })
                              // }
                            />
                            сум
                          </span>
                        </div>
                      </div>
                      <div className="relative z-50 mb-[6px] w-full  marketFilter">
                        {" "}
                        <Slider
                          className={`slider w-full flex items-center h-[4px] bg-fullBlue border rounded-[1px] mt-[10px]`}
                          onChange={setValues}
                          value={values}
                          minDistance={10}
                          min={Number(minPrice)}
                          max={Number(maxPrice)}
                        />
                      </div>
                      <div
                        className={`flex items-center  mt-4 ${
                          state?.clearPrice ? "justify-between" : "justify-end"
                        }`}
                      >
                        {state?.clearPrice && (
                          <span
                            onClick={() => {
                              clearPriceValue();
                              setState({ ...state, priceToggleMobile: false });
                            }}
                            className="flex items-center select-none cursor-pointer text-sm justify-center  text-fullBlue"
                          >
                            Сбросить
                          </span>
                        )}
                        <span
                          onClick={() => {
                            sendPriceList();
                            setState({ ...state, priceToggleMobile: false });
                          }}
                          className="flex items-center select-none cursor-pointer text-sm justify-center  text-fullBlue"
                        >
                          Готово
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Colors */}
        <section
          className={`h-fit top-30  left-[16px] fixed  bg-white shadow-lg  duration-200 z-50 ${
            state?.selectColorToggleMobile ? "w-[92%]" : "w-0"
          }`}
        >
          {state?.selectColorToggleMobile && (
            <div className="fixed inset-0 z-10 ">
              <div
                className="fixed inset-0 w-full h-full bg-black opacity-40"
                onClick={() =>
                  setState({ ...state, selectColorToggleMobile: false })
                }
              ></div>
              <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                  <div
                    className={`flex items-center justify-between border-b border-searchBgColor pb-3"
                       `}
                  >
                    <span className="text-black text-lg not-italic font-AeonikProRegular leading-5">
                      По цвету
                    </span>
                    <button
                      className="py-2"
                      type=""
                      onClick={() =>
                        setState({ ...state, selectColorToggleMobile: false })
                      }
                    >
                      <GrClose size={22} />
                    </button>
                  </div>
                  <div className="w-full py-4 gap-x-2 gap-y-2 grid gap-4 grid-cols-4">
                    {data?.getMainProductCard?.colors?.map((data) => {
                      return (
                        <div
                          key={data?.id}
                          className="flex flex-col items-center justify-center "
                        >
                          <div
                            onClick={() => {
                              newColorArrayId(data?.hex, data?.id);
                            }}
                            style={{ backgroundColor: data?.hex }}
                            className={`rounded-full flex items-center justify-center w-[35px] h-[35px] ${
                              data?.hex === dressInfo?.mainColorHex
                                ? "border border-setTexOpacity flex items-center justify-center"
                                : "border"
                            }  `}
                          >
                            {dressInfo?.mainColorHex === data?.hex &&
                              data?.id !== 1 && (
                                <span>
                                  <InputCheckedTrueIcons colors={"#000"} />
                                </span>
                              )}

                            {dressInfo?.mainColorHex === data?.hex &&
                              data?.id === 1 && (
                                <InputCheckedTrueIcons colors={"#fff"} />
                              )}
                          </div>
                          <span
                            className={`text-black text-center text-xs not-italic font-AeonikProRegular`}
                          >
                            {data?.name_ru}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="w-full flex items-center justify-end">
                    {dressInfo?.mainColorHex && (
                      <button
                        onClick={() => ClearColorId()}
                        className="flex items-center text-fullBlue active:scale-95  active:opacity-70 justify-center  px-4"
                      >
                        Отключить
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Gender BUTTONS */}
        <section
          className={`w-full h-fit top-30 left-[16px] fixed bg-white shadow-lg duration-200 z-50 ${
            state?.genderMobile ? "w-[92%]" : "w-0"
          }`}
        >
          {state?.genderMobile && (
            <div className="fixed inset-0 z-10 ">
              <div
                className="fixed inset-0 w-full h-full bg-black opacity-40"
                onClick={() => setState({ ...state, genderMobile: false })}
              ></div>
              <div className="w-full mx-auto flex items-center min-h-screen px-4 py-8">
                <div className="relative w-full left-0 right-0 max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                  <div
                    className={`flex items-center justify-between border-b border-searchBgColor pb-3"
                       `}
                  >
                    <span className="text-black text-lg not-italic font-AeonikProRegular leading-5">
                      По полу
                    </span>
                    <button
                      className="py-2"
                      type=""
                      onClick={() =>
                        setState({ ...state, genderMobile: false })
                      }
                    >
                      <GrClose size={22} />
                    </button>
                  </div>

                  {/* Gender selection for Mobile */}
                  <div className="w-fit mx-auto box-border flex items-center gap-x-2 h-[44px] border border-searchBgColor overflow-hidden rounded-xl bg-btnBgColor mt-5 mb-2">
                    {personItems
                      ?.filter((value) => value?.id === dressInfo?.type)?.map((data) => {
                        console.log(data,'data');
                        console.log(dressInfo?.type, "dressInfo?.type");
                        console.log(
                          dressInfo?.mainGenderId,
                          "dressInfo?.mainGenderId"
                        );
                        return (
                          <div
                            key={data?.id}
                            className="w-fit h-full flex items-center  "
                          >
                            {data?.childText?.map((item) => {
                              console.log(item, "data?.childText");
                              return (
                                <div
                                  key={item?.id}
                                  className="flex items-center h-full box-border"
                                >
                                  <button
                                    onClick={() =>
                                      handleFilterByUser(data?.id, item?.id)
                                    }
                                    className={`${
                                      item?.id == dressInfo?.mainGenderId
                                        ? "bg-white border w-full h-[98%] my-auto mx-auto box-border border-searchBgColor rounded-xl"
                                        : " bg-btnBgColor text-black h-full"
                                    } px-6  cursor-pointer box-border  font-AeonikProMedium rounded-xl justify-center flex items-center`}
                                  >
                                    <span>{item?.anyIcons}</span>
                                    {item?.name && (
                                      <span className="ml-2 not-italic whitespace-nowrap text-sm font-AeonikProMedium tracking-wide	leading-5">
                                        {item?.name}
                                      </span>
                                    )}
                                  </button>
                                  {item?.id !== 3 && (
                                    <span className="w-[2px] h-[30px] mx-[1px] border-r border-searchBgColor"></span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </section>
    </main>
  );
};
export { ClothingParametr };
