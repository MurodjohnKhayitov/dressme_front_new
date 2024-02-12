import React, { useContext, useEffect, useState } from "react";
import { dressMainData } from "../../../../ContextHook/ContextMenu";
import { SearchIcons } from "../../../../assets/icons";
import "../../../../index.css";
import { ClothingParametr } from "./ClothingParametr";
import WearType from "./WearType";
import { HomeMainDataContext } from "../../../../ContextHook/HomeMainData";
import { CollectionCardItem } from "./CollectionCardItem";
import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";

export default function CollectionCards() {
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const [openWearType, setOpenWearType] = useState(false);
  const [pagination, setPagination] = useState(30);
  const [data, setData, wishList, setWishlist, page, setPage] = useContext(HomeMainDataContext);

  // -------------------------------------
  const toggle = React.useCallback(() => setOpenWearType(false), []);
  // -------------------------------------

  useEffect(() => {
    if (openWearType) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [openWearType]);

  const handleLeaveMouse = (eId) => {
    const elementsIndex = dressInfo.ProductList.findIndex(
      (element) => element.id == eId
    );
    let newArray = [...dressInfo.ProductList];
    newArray[elementsIndex] = {
      ...newArray[elementsIndex],
      colourCard: false,
    };
    setDressInfo((current) => {
      return { ...current, ProductList: newArray };
    });
  };

  return (
    <main className="flex flex-col justify-center items-center m-0 p-0 box-border">
      <div
        onClick={() => setOpenWearType(false)}
        className={`fixed inset-0 z-[112] duration-200 w-full h-[100vh] bg-black opacity-50 ${
          openWearType ? "" : "hidden"
        }`}
      ></div>
      <section
        className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${
          openWearType ? "bottom-0" : "bottom-[-800px] z-0"
        }`}
      >
        <WearType onClick={toggle} />
      </section>

      <section className="max-w-[1280px] w-[100%] px-[10px] md:px-0 flex flex-col justify-center items-center m-auto border-t md:border-0 border-searchBgColor">
        {/* Searching section */}
        <section className="w-full h-12 flex md:hidden items-center justify-between rounded-xl font-AeonikProRegular border border-searchBgColor bg-white mt-4">
          <input
            type="text"
            name="name"
            placeholder="Искать товары"
            autoComplete="name"
            className="bg-transparent w-[90%] h-full text-[14px] border border-transparent px-3"
          />
          <span className="w-[1px] h-full border-r border-searchBgColor"></span>
          <span className="w-[15%] rounded-r-xl flex h-full bg-[#fafafa] items-center justify-center">
            <SearchIcons />
          </span>
        </section>

        <section className="w-full mt-4">
          <ClothingParametr />
        </section>

        {data?.products?.length ? (
          <section className="w-full  hidden md:flex justify-start items-center mb-[24px] md:mb-0 md:px-0">
            <div className="not-italic font-AeonikProMedium lg:w-fit lg:text-2xl xl:text-3xl flex items-center leading-8 text-black">
              <p>Коллекция одежд</p>
            </div>
          </section>
        ) : null}

        <section className="w-full  md:hidden flex justify-start items-center my-5 ">
          <div className="not-italic font-AeonikProMedium lg:w-fit lg:text-2xl xl:text-3xl flex items-center leading-6 text-black">
            <p>Коллекция одежд</p>
          </div>
        </section>

        <div className="w-full flex flex-col box-border ">
          <article className="flex flex-wrap justify-between md:justify-start md:mx-0 md:mt-[50px] mb-[20px] md:mb-0 gap-y-2 lg:gap-x-5 lg:gap-y-5 ">
            {data?.products?.length ? (
              data?.products?.map((data) => {
                return (
                  <CollectionCardItem
                    setDressInfo={setDressInfo}
                    dressInfo={dressInfo}
                    key={data?.id}
                    data={data}
                    setOpenWearType={setOpenWearType}
                    handleLeaveMouse={handleLeaveMouse}
                    wishList={wishList}
                    setWishlist={setWishlist}
                    mainSelectedId={dressInfo?.mainColorId}
                  />
                );
              })
            ) : (
              <div className="w-full flex items-center justify-center font-AeonikProMedium text-2xl h-[200px] ">
                Ничего не найдено
              </div>
            )}
          </article>

          {data?.getMainProductCard?.products?.next_page_url ? (
            <div className="w-full h-fit flex items-center justify-center mt-14">
              {data?.btnLoader ? (
                <button
                  type="button"
                  className="w-[760px] h-[60px] active:scale-95 cursor-pointer not-italic font-AeonikProMedium text-base leading-4 text-center text-borderWinter flex items-center justify-center rounded-xl border border-borderWinter bg-btnBgColor"
                >
                  <ClipLoader
                    className="h-full py-[2px]"
                    color={"#007DCA"}
                    size={30}
                    loading={true}
                  />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setPage((prev) => prev + 1);
                  }}
                  className="w-[760px] h-[60px] active:scale-95 cursor-pointer not-italic font-AeonikProMedium text-base leading-4 text-center text-borderWinter flex items-center justify-center rounded-xl border border-borderWinter bg-btnBgColor"
                >
                  Показать ещё{" "}
                </button>
              )}
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
