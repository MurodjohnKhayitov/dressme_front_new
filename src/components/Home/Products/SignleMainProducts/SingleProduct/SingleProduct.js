import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductCarousel } from "./Product_Carousel/ProductCarousel";
import { ProductDetails } from "./Product_Detail/ProductDetails";
import { SingleProductTop } from "../SingleProductTop/SingleProductTop";
import { dressMainData } from "../../../../../ContextHook/ContextMenu";

import {
  InputCheckedTrueIcons,
  NoImg,
  StarIcons,
} from "../../../../../AssetsMain/icons";
import { AddBasket, HeartImg } from "../../../../../AssetsMain";
import ProductComment from "./ProductComment/ProductComment";
import AboutProduct from "./AboutProduct/AboutProduct";

const SingleProduct = () => {
  const [dressInfo] = useContext(dressMainData);

  let LikeProduct = [];
  let LastSeenProduct = [];
  dressInfo.ProductList.forEach((data) => {
    if (data.id > 0 && data.id <= 5) {
      LikeProduct.push(data);
    }
    if (data.id > 5 && data.id <= 10) {
      LastSeenProduct.push(data);
    }
  });

  const navigate = useNavigate();
  const goDetail = (id) => {
    navigate(`/product/:${id}`);
  };

  const [show, setShow] = useState(true);
  const [scrollPost, setscrollPost] = useState(0);

  // ----------------NavMenu----------------
  const [ShowNavMenu, setShowNavMenu] = useState(true);
  const [ScrollPostNavMenu, setScrollPostNavMenu] = useState(0);

  // ----------------NavBar----------------
  const handleScroll = () => {
    setscrollPost(document.body.getBoundingClientRect().top);
    if (parseInt(Math.abs(scrollPost)) > 300) {
      setShow(document.body.getBoundingClientRect().top > scrollPost);
    }
  };

  // ----------------NavMenu----------------
  const handleScrollNavMenu = () => {
    setScrollPostNavMenu(document.body.getBoundingClientRect().top);
    setShowNavMenu(
      document.body.getBoundingClientRect().top < ScrollPostNavMenu
    );
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScrollNavMenu);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScrollNavMenu);
    };
  }, [show, scrollPost, ShowNavMenu, ScrollPostNavMenu]);
 
 

  return (
    <div className="flex flex-col  m-0 p-0 box-border">
      <div>
        <SingleProductTop />
      </div>
      <div className="max-w-[1280px] w-[100%] flex flex-col justify-start items-center m-auto border-box mb-20 md:mb-[60px]">
        <div className=" relative w-[100%] h-fit mt-6 flex justify-between flex-col md:flex-row">
          <div
            className={`md:w-1/2 h-fit md:sticky duration-500  ${
              show ? "visible z-[29] top-[110px]" : "visible z-[29] top-[16px]"
            } `}
          >
            <ProductCarousel />
          </div>
          <div className="w-full md:w-1/2 h-full ">
            <ProductDetails />
          </div>
          <div className="block md:hidden w-full">
            <AboutProduct />
          </div>
        </div>
        {/* Products Comment */}
        <div className="md:mt-20 w-full">
          <ProductComment />
        </div>
        <div className="w-full h-fit  ">
          <div className="w-full mt-[34px] md:mt-[120px]">
            <div className="md:mb-10">
              <span className="not-italic font-AeonikProMedium text-2xl leading-7 text-black">
                Похожие продукты
              </span>
            </div>
            <div className="flex flex-wrap justify-between md:justify-start md:mx-0  gap-y-2 lg:gap-x-5 lg:gap-y-5 ">
              {LikeProduct.map((data) => {
                return (
                  <div
                    key={data.id}
                    onClick={() => goDetail(data?.title)}
                    className={`ss:w-[49%] md:w-[24%] lg:w-[240px]  xs:h-[456px] lg:h-fit border border-solid borderColorCard overflow-hidden rounded-xl`}
                  >
                    <div className="relative w-full cursor-pointer ss:h-[200px] ls:h-[220px] ll:h-[238px] xs:h-[309px] lg:h-[320px] bg-btnBgColor  flex content-between items-center overflow-hidden border-b border-solid flex-nowrap">
                      {data.ProducImg ? (
                        <img
                          className="w-full h-full m-auto hover:scale-105 transition duration-700 ease-in-out"
                          src={data.ProducImg}
                          alt="ProducImg"
                        />
                      ) : (
                        <NoImg />
                      )}
                      <div className="w-full flex absolute top-px p-[5px]  ss:justify-end xs:justify-between">

                        <div className="flex flex-col gap-y-1">
                          <p className="w-8 h-8  rounded-lg flex items-center bg-bgCard justify-center border border-solid border-borderColorCard hover:bg-white transition ease-out duration-500">
                            <img src={HeartImg} alt="" />
                          </p>
                        </div>

                      </div>
                    </div>
                    <div className="w-full rounded-b-xl bg-white  flex flex-wrap h-[130px] md:h-[136px] ">
                      <div className=" w-full flex justify-between items-center px-1  border-solid xs:h-[38px] lg:h-8 ss:h-[30px] xs:px-2 md:px-4 bg-white">
                        {data?.changeColor.map((itemValue) => {
                          return (
                            <div
                              key={itemValue?.id}
                              className={`rounded-full flex items-center justify-center hover:scale-110 duration-300 ls:w-[22px] ls:h-[22px] w-5 h-5 lg:w-6 lg:h-6 ${itemValue?.colors} cursor-pointer  border border-solid border-borderColorCard mr-[3px]`}
                              htmlFor="Color1"
                            >
                              {itemValue?.action ? (
                                <InputCheckedTrueIcons colors={"#fff"} />
                              ) : null}
                            </div>
                          );
                        })}
                      </div>
                      <div className="w-full  xs:px-3 ss:px-3 xs:mt-3 ss:mt-2">
                        <div className="relative w-full whitespace-nowrap overflow-hidden not-italic font-AeonikProRegular text-[12px] ls:text-sm lg:text-[15px] leading-4 text-black mb-2 md:mb-0  cursor-pointer">
                          <div className="absolute categoryLinearText left-0 w-full h-full z-[10] top-0"></div>
                          {data?.title || "NoData"}
                        </div>
                        <div className="w-full flex justify-between items-center xs:mt-3">
                          <div className="flex items-center justify-between">
                            <span>
                              <StarIcons />
                            </span>
                            <span className="not-italic font-AeonikProRegular text-[10px] ls:text-xs leading-4 text-right text-gray-500 ml-[2px] md:ml-1 flex items-center">
                              <span className="font-AeonikProMedium text-[10px] ls:text-xs not-italic mx-1 text-black md:mr-[6px] md:text-[13px]">
                                5.0{" "}
                              </span>
                              ({data?.starCount || 0}{" "}
                              <span className="ss:hidden lg:block md:ml-1 md:text-[11px]">
                                голосов
                              </span>
                              )
                            </span>
                          </div>
                          <div className="not-italic xs:font-AeonikProMedium ss:font-AeonikProRegular leading-4 text-black  ss:text-[11px] sm:text-xs  md:text-[13px] ">
                            <b>
                              <span>{data?.shirtSize || 0}</span>
                            </b>
                          </div>
                        </div>
                      </div>
                      <div className="w-full flex items-center justify-between  pl-3 pr-[5px]">
                        <div className="flex items-center ">
                          {data.sale ? (
                            <div className="flex flex-col-reverse ll:flex-row	text-start items-start ">
                              <div className="text-start m-0 p-0  not-italic font-AeonikProMedium text-[16px]  md:text-base leading-1 text-red-700 xs:text-base xs:leading-4 mr-1">
                                {data?.sale}
                              </div>
                              <div className="text-start m-0 p-0 text-[11px] mt-[8px]  line-through not-italic font-AeonikProRegular leading-3  text-borderColorCard ss:leading-1 md:text-[11px]">
                                {data?.price}
                              </div>
                            </div>
                          ) : (
                            <p
                              className="not-italic font-AeonikProMedium text-base leading-4"
                              style={{ color: "black" }}
                            >
                              {data?.price}{" "}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center">
                          <button className="w-[32px] h-[32px] md:w-[36px] md:h-[36px] ll:mb-1 rounded-lg overflow-hidden border border-searchBgColor bg-btnBgColor flex items-center justify-center">
                            <img src={AddBasket} alt="addbag" className="w-8" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="hidden md:block w-full md:mt-[120px]">
            <div>
              <span className="not-italic font-AeonikProMedium text-2xl leading-7 text-black">
                Недавно просмотренные продукты{" "}
              </span>
            </div>
            <div className="flex flex-wrap justify-between mt-10  ">
              {LikeProduct.map((data) => {
                return (
                  <div
                    key={data.id}
                    onClick={() => goDetail(data?.title)}
                    className={`ss:w-[49%] md:w-[24%] lg:w-[240px]  xs:h-[456px] lg:h-fit border border-solid borderColorCard overflow-hidden rounded-xl`}
                  >
                    <div className="relative w-full cursor-pointer ss:h-[200px] ls:h-[220px] ll:h-[238px] xs:h-[309px] lg:h-[320px] bg-btnBgColor  flex content-between items-center overflow-hidden border-b border-solid flex-nowrap">
                      {data.ProducImg ? (
                        <img
                          className="w-full h-full m-auto hover:scale-105 transition duration-700 ease-in-out"
                          src={data.ProducImg}
                          alt="ProducImg"
                        />
                      ) : (
                        <NoImg />
                      )}
                      <div className="w-full flex absolute top-px p-[5px]  ss:justify-end xs:justify-between">                     

                        <div className="flex flex-col gap-y-1">
                          <p className="w-8 h-8  rounded-lg flex items-center bg-bgCard justify-center border border-solid border-borderColorCard hover:bg-white transition ease-out duration-500">
                            <img src={HeartImg} alt="" />
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="w-full rounded-b-xl bg-white  flex flex-wrap h-[130px] md:h-[136px] ">
                      <div className=" w-full flex justify-between items-center px-1  border-solid xs:h-[38px] lg:h-8 ss:h-[30px] xs:px-2 md:px-4 bg-white">
                        {data?.changeColor.map((itemValue) => {
                          return (
                            <div
                              key={itemValue?.id}
                              // onClick={() =>
                              //   onColorChecked(data?.id, itemValue?.id)
                              // }
                              className={`rounded-full flex items-center justify-center hover:scale-110 duration-300 ls:w-[22px] ls:h-[22px] w-5 h-5 lg:w-6 lg:h-6 ${itemValue?.colors} cursor-pointer  border border-solid border-borderColorCard mr-[3px]`}
                              htmlFor="Color1"
                            >
                              {itemValue?.action ? (
                                <InputCheckedTrueIcons colors={"#fff"} />
                              ) : null}
                            </div>
                          );
                        })}
                      </div>
                      <div className="w-full  xs:px-3 ss:px-3 xs:mt-3 ss:mt-2">
                        <div className="relative w-full whitespace-nowrap overflow-hidden not-italic font-AeonikProRegular text-[12px] ls:text-sm lg:text-[15px] leading-4 text-black mb-2 md:mb-0  cursor-pointer">
                          <div className="absolute categoryLinearText left-0 w-full h-full z-[10] top-0"></div>
                          {data?.title || "NoData"}
                        </div>
                        <div className="w-full flex justify-between items-center xs:mt-3">
                          <div className="flex items-center justify-between">
                            <span>
                              {" "}
                              <StarIcons />
                            </span>
                            <span className="not-italic font-AeonikProRegular text-[10px] ls:text-xs leading-4 text-right text-gray-500 ml-[2px] md:ml-1 flex items-center">
                              <span className="font-AeonikProMedium text-[10px] ls:text-xs not-italic mx-1 text-black md:mr-[6px] md:text-[13px]">
                                5.0{" "}
                              </span>
                              ({data?.starCount || 0}{" "}
                              <span className="ss:hidden lg:block md:ml-1 md:text-[11px]">
                                голосов
                              </span>
                              )
                            </span>
                          </div>
                          <div className="not-italic xs:font-AeonikProMedium ss:font-AeonikProRegular leading-4 text-black  ss:text-[11px] sm:text-xs  md:text-[13px] ">
                            <b>
                              <span>{data?.shirtSize || 0}</span>
                            </b>
                          </div>
                        </div>
                      </div>
                      <div className="w-full flex items-center justify-between  pl-3 pr-[5px]">
                        <div className="flex items-center ">
                          {data.sale ? (
                            <div className="flex flex-col-reverse ll:flex-row	text-start items-start ">
                              <div className="text-start m-0 p-0  not-italic font-AeonikProMedium text-[16px]  md:text-base leading-1 text-red-700 xs:text-base xs:leading-4 mr-1">
                                {data?.sale}
                              </div>
                              <div className="text-start m-0 p-0 text-[11px] mt-[8px]  line-through not-italic font-AeonikProRegular leading-3  text-borderColorCard ss:leading-1 md:text-[11px]">
                                {data?.price}
                              </div>
                            </div>
                          ) : (
                            <p
                              className="not-italic font-AeonikProMedium text-base leading-4"
                              style={{ color: "black" }}
                            >
                              {data?.price}{" "}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center">
                          <button className="w-[32px] h-[32px] md:w-[36px] md:h-[36px] ll:mb-1 rounded-lg overflow-hidden border border-searchBgColor bg-btnBgColor flex items-center justify-center">
                            <img src={AddBasket} alt="addbag" className="w-8" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export { SingleProduct };
