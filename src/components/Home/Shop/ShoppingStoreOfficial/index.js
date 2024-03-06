import React, { useContext, useEffect, useState } from "react";
import ShoppingStoreOfficialTop from "./ShoppingStoreOfficialTop/ShoppingStoreOfficialTop";
import ShowPageComment from "./ShowPageComment/ShowPageComment";
import { GoBackIcon } from "../../../../assets/icons";
import { useNavigate, useParams } from "react-router-dom";
import { dressMainData } from "../../../../ContextHook/ContextMenu";
import { HomeMainDataContext } from "../../../../ContextHook/HomeMainData";
import ShopOfficialCard from "./ShoppingStoreCategory/ShopOfficialCards/ShopOfficialCard";
import FilterList from "./ShoppingStoreCategory/FilterList/FilterList";
import axios from "axios";
import YandexLocationShopFilter from "./ShoppingStoreCategory/YandexLocationShop/YandexLocationShopFilter";
import LoadingNetwork from "../../../Loading/LoadingNetwork";
import NewBreadCrump from "../../../Breadcrumbs/NewBreadCrump";

const ShoppingStoreOfficial = () => {
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const [data, setData] = useContext(HomeMainDataContext);

  const [openTabComment, setOpenTabComment] = useState(false);
  const [openTabLocation, setOpenTabLocation] = useState(false);
  const [filteredData, setFilteredData] = useState();
  const [filteredError, setFilteredError] = useState(false);
  const [pageId, setPageId] = useState(1);

  const [getGenderId, setGetGenderId] = useState(null);
  const [getCategory, setGetCategory] = useState(null);
  const [getRating, setGetRating] = useState(null);
  const [getRange, setGetRange] = useState([]);
  const [dataColor, setDataColor] = useState([]);
  const [discount, setDiscount] = useState(false);
  const [getOutWearList, setGetOutWearList] = useState(null);
  const [getUnderWearList, setGetUnderWearList] = useState(null);
  const [getFootWearList, setGetFootWearList] = useState(null);
  const [filterToggle, setFilterToggle] = useState(false);
  const [openMobileFilter, setOpenMobileFilter] = useState(false);
  const [initalParamsId, setInitalParamsId] = useState(null);
  const [newFilterParamasId, setNewFilterParamasId] = useState();
  const [newFilterParamasIdCopy, setNewFilterParamasIdCopy] = useState();
  const toggleFilterOpen = React.useCallback(() => setFilterToggle(true), []);
  const toggleFilterClose = React.useCallback(() => setFilterToggle(false), []);
  useEffect(() => {
    setFilterToggle(false)
  }, [dressInfo?.mainSubRegionId, dressInfo?.mainRegionId,])
  useEffect(() => {
    if (dressInfo?.openShopIdFilter) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [dressInfo?.openShopIdFilter]);

  const genderId = (childData) => {
    setGetGenderId(childData);
    setPageId(1);
  };
  function discountId(childData) {
    setDiscount(childData);
    setPageId(1);
  }
  const categoryId = (childData) => {
    setGetCategory(childData);
    setPageId(1);
  };
  const getBadgePrice = (childData) => {
    setGetRange(childData);
    setPageId(1);
  };
  const getRatingList = (childData) => {
    setGetRating(childData);
    setPageId(1);
  };
  const outWearList = (childData) => {
    if (childData !== undefined) {
      setGetOutWearList(childData);
    }
    setPageId(1);
  };
  const underWearList = (childData) => {
    if (childData !== undefined) {
      setGetUnderWearList(childData);
    }
    setPageId(1);
  };
  const footWearList = (childData) => {
    setGetFootWearList(childData);
    setPageId(1);
  };

  // console.log(pageId, "pageId,");
  const clickButtons = {
    openTabComment,
    setOpenTabComment,
    openTabLocation,
    setOpenTabLocation,
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  const navigate = useNavigate();
  const params = useParams();
  const newId = params?.id?.replace(":", "");

  const refreshLocationId = () => {
    data?.getMainProductCard?.shops?.map((item) => {
      if (item?.id === Number(newFilterParamasId)) {
        if (dressInfo?.mainSubRegionId) {
          let foundElement = item?.approved_shop_locations.find(function (
            element
          ) {
            return Number(element.sub_region_id) === dressInfo?.mainSubRegionId;
          });
          setDressInfo({
            ...dressInfo,
            locationIdParams: foundElement?.id,
          });
          // let index = item?.approved_shop_locations.findIndex(function (
          //   element
          // ) {
          //   return Number(element.sub_region_id) === dressInfo?.mainSubRegionId;
          // });
          // if (index === -1) {
          //   navigate("/");
          // }
        }
        if (!dressInfo?.mainSubRegionId) {
          setDressInfo({
            ...dressInfo,
            locationIdParams: item?.approved_shop_locations[0]?.id,
          });
        }
      }
    });
  };

  useEffect(() => {
    refreshLocationId();
  }, [newFilterParamasId, dressInfo?.mainSubRegionId, dressInfo?.mainRegionId, data?.getMainProductCard?.shops]);

  // console.log(dressInfo?.shopsData?.shops, 'dressInfo?.shopsData?.shops?.data');
  useEffect(() => {
    data?.getMainProductCard?.shops?.map(item => {
      if (newId?.split('-')?.join(' ')?.includes(item?.name?.toLowerCase())) {
        setNewFilterParamasId(item?.id)
        if (!newFilterParamasIdCopy) {
          setNewFilterParamasIdCopy(item?.id)
        }
      }
    })
  }, [data?.getMainProductCard?.shops]);

  const [loading, setLoading] = useState(false);

  const url = `https://api.dressme.uz/api`;

  const fetchGetAllData = () => {
    let params = new URLSearchParams();
    dressInfo?.mainSearchNameshop &&
      params.append("keywords", dressInfo?.mainSearchNameshop);
    params.append("location_id", dressInfo?.locationIdParams);
    getGenderId && params.append("gender", getGenderId);
    discount && params.append("discount", discount);
    getCategory && params.append("category", getCategory);
    getRating && params.append("rating", getRating);
    getFootWearList?.wear_size &&
      params.append("footwear_size", getFootWearList?.wear_size);
    // OUTWEAR SIZES
    getOutWearList?.letter_size &&
      params.append("outwear_size[letter_size]", getOutWearList?.letter_size);
    !getOutWearList?.letter_size &&
      getOutWearList?.min_wear_size &&
      params.append(
        "outwear_size[min_wear_size]",
        getOutWearList?.min_wear_size
      );
    !getOutWearList?.letter_size &&
      getOutWearList?.max_wear_size &&
      params.append(
        "outwear_size[max_wear_size]",
        getOutWearList?.max_wear_size
      );
    // UNDERWEAR SIZES
    getUnderWearList?.letter_size &&
      params.append(
        "underwear_size[letter_size]",
        getUnderWearList?.letter_size
      );
    !getUnderWearList?.letter_size &&
      getUnderWearList?.min_wear_size &&
      params.append(
        "underwear_size[min_wear_size]",
        getUnderWearList?.min_wear_size
      );
    !getUnderWearList?.letter_size &&
      getUnderWearList?.max_wear_size &&
      params.append(
        "underwear_size[max_wear_size]",
        getUnderWearList?.max_wear_size
      );
    pageId && params.append("page", pageId);
    getRange?.min && params.append("budget[from]", getRange?.min);
    getRange?.max && params.append("budget[to]", getRange?.max);
    dataColor?.length > 0 &&
      dataColor?.forEach((e, index) => {
        params.append("colors[]", dataColor[index]);
      });
    axios
      .get(`${url}/main/shops/${newFilterParamasId}?`, {
        params: params,
      })
      .then((res) => {
        if (res?.status >= 200 && res?.status < 300) {
          setFilteredData(res?.data);
          setDressInfo({ ...dressInfo, filterDataProductList: res?.data })
          setFilteredError(false)
          // console.log(res?.data, 'category---res?.data');

          // console.log(filteredData,'11111-filteredData1111');
        }
      })
      .catch((res) => {
        // console.log(res, 'category---error');

        if (res?.response?.status === 422) {
          refreshLocationId();
          setFilteredData(null)
          setFilteredError(true)
        }
        throw new Error(res.response?.data?.message || "something wrong");
      })
      .finally(() => {
        setLoading(false);
      })
  };

  useEffect(() => {
    if (!filteredData && dressInfo?.locationIdParams || initalParamsId && initalParamsId !== dressInfo?.locationIdParams && !getGenderId && !getCategory && !getRating && !getRange?.length && !dataColor?.length && !discount && !getOutWearList && !getUnderWearList && !getFootWearList) {
      fetchGetAllData();
      setLoading(true)
    }
    setInitalParamsId(dressInfo?.locationIdParams)
  }, [dressInfo?.locationIdParams]);

  useEffect(() => {
    if (data?.getMainProductCard?.shops && dressInfo?.locationIdParams && newFilterParamasIdCopy) {
      fetchGetAllData();
      if (!filteredData) {
        setLoading(true)
      }
    }
  }, [
    newFilterParamasIdCopy,
    pageId,
    discount,
    dataColor?.length,
    getGenderId,
    discount,
    getCategory,
    getUnderWearList,
    getOutWearList,
    getFootWearList,
    getRating,
    getRange?.min,
    getRange?.max,
    data?.getMainProductCard,
    dressInfo?.mainSearchNameshop,
    data?.getMainProductCard?.shops,
  ]);

  useEffect(() => {
    if (openMobileFilter) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [openMobileFilter]);
  const [screenSize, setScreenSize] = useState(getCurrentDimension());

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

  // console.log(params, 'params');
  const breadcrumbItems = [
    { label_uz: 'Home', label_ru: 'Главная', url: '/' },
    { label_uz: 'section', label_ru: 'Магазины', url: '/shops' },
    { label_uz: params?.id, label_ru: params?.id, url: '/shops/:id' },
  ];
  // console.log(filteredData, 'category---filteredData');
  // console.log(dressInfo?.locationIdParams, 'category---dressInfo?.locationIdParams');
  // console.log('category-------------------------------------');

  return (
    <div className="w-full">
      {loading ? (
        <div className="flex items-center justify-center w-full h-full ">
          <LoadingNetwork />
        </div>
      ) : (
        <main className="max-w-[1280px] w-[100%] flex flex-col items-center justify-between m-auto">
          {/* {!filteredData ? <LoadingNetwork />
        :  */}
          <div className="w-full">
            <section className="w-full border-b border-searchBgColor py-3 md:pt-8 md:pb-5">
              <NewBreadCrump items={breadcrumbItems} />
            </section>
            {dressInfo?.mainSubRegionId && !dressInfo?.locationIdParams ?
              <div className="w-full flex items-center  justify-center font-AeonikProMedium text-2xl h-[50vh] ">
                Ничего не найдено
              </div> :
              <div className="w-full ">
                <section className="w-full border-searchBgColor">
                  <ShoppingStoreOfficialTop
                    clickButtons={clickButtons}
                    filteredData={filteredData}
                    toggleFilterLeftOpen={toggleFilterOpen}
                    toggleFilterLeftClose={toggleFilterClose}
                    filterLeftAction={filterToggle}
                    setOpenMobileFilter={setOpenMobileFilter}
                  />
                </section>
                {/* FOR MOBILE VERSION */}
                <section
                  onClick={() => {
                    setOpenMobileFilter(false);
                  }}
                  className={`fixed inset-0 z-[112] duration-200 w-full h-[100vh] bg-black opacity-50 ${openMobileFilter ? "" : "hidden"
                    }`}
                ></section>
                {screenSize.width < 768 && (
                  <section
                    className={` fixed h-[70vh] z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${openMobileFilter ? "bottom-0" : "bottom-[-800px] z-0"
                      }`}
                  >
                    <div className="max-w-[440px] w-[100%] h-[70vh] z-[114]  overflow-y-auto mx-auto bg-white shadow-navMenuShadov  overflow-hidden rounded-t-[12px]">
                      <FilterList
                        paramsId={newFilterParamasId}
                        genderId={genderId}
                        discountId={discountId}
                        categoryId={categoryId}
                        getBadgePrice={getBadgePrice}
                        setDataColor={setDataColor}
                        dataColor={dataColor}
                        getRatingList={getRatingList}
                        outWearList={outWearList}
                        underWearList={underWearList}
                        footWearList={footWearList}
                        filterToggle={filterToggle}
                        setFilterToggle={setFilterToggle}
                        setPageId={setPageId}
                        openMobileFilter={openMobileFilter}
                        setOpenMobileFilter={setOpenMobileFilter}
                      />
                    </div>
                  </section>
                )}
                <section className="w-full flex items-center justify-center ">
                  <div className="w-full flex flex-col items-center justify-center">
                    {/* Products Section */}
                    <article
                      className={`${openTabComment || openTabLocation ? "hidden" : "block"
                        } w-full `}
                    >
                      <section className="w-[100%] h-fit">
                        <section className="w-full flex flex-gap-6 justify-between md:my-10 mt-3 mb-20">
                          {screenSize.width >= 768 && (
                            <div
                              className={`${filterToggle ? "md:block" : "md:hidden"
                                } hidden md:w-[22%] h-full ss:px-4 md:px-0`}
                            >
                              <FilterList
                                paramsId={newFilterParamasId}
                                genderId={genderId}
                                discountId={discountId}
                                categoryId={categoryId}
                                getBadgePrice={getBadgePrice}
                                setDataColor={setDataColor}
                                dataColor={dataColor}
                                getRatingList={getRatingList}
                                outWearList={outWearList}
                                underWearList={underWearList}
                                footWearList={footWearList}
                                filterToggle={filterToggle}
                                setFilterToggle={setFilterToggle}
                                setPageId={setPageId}
                              />
                            </div>
                          )}

                          <div
                            className={` ${filterToggle ? "md:w-[77%]" : "md:w-[100%]"
                              } w-full h-full px-[10px] md:px-0`}
                          >
                            {filteredData?.products?.data?.length > 0 ? (
                              <ShopOfficialCard
                                filteredData={filteredData}
                                setPageId={setPageId}
                                paramsId={newId}
                              />
                            ) : (
                              <div className="w-full flex items-center justify-center font-AeonikProMedium text-lg md:text-2xl h-fit md:h-[60vh] ">
                                Ничего не найдено
                              </div>
                            )}
                          </div>
                        </section>
                      </section>
                    </article>

                    {/* Comment Section For Shopping Page */}
                    <div
                      className={`${openTabComment ? "block" : "hidden"
                        } w-full pb-[88px] `}
                    >
                      <ShowPageComment
                        filteredData={filteredData}
                        setOpenTabComment={setOpenTabComment}
                      />
                    </div>

                    {/* Map Section */}
                    <div
                      className={`${openTabLocation && !openTabComment ? "block" : "hidden"
                        } w-full text-3xl px-4 pb-[88px]`}
                    >
                      <button
                        onClick={() => {
                          setOpenTabLocation(false);
                        }}
                        className={`flex items-center cursor-pointer justify-start md:justify-center md:border border-borderColor2 rounded-lg mr-20 md:mt-4 md:mr-5`}
                      >
                        <GoBackIcon />
                      </button>
                      {/* <YandexLocationShop /> */}
                      <YandexLocationShopFilter filteredData={filteredData} />
                    </div>
                  </div>
                </section>
              </div>
            }
          </div>
        </main>
      )}
    </div>
  );
};

export default React.memo(ShoppingStoreOfficial);
