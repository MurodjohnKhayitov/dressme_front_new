import React, { useContext } from "react";
import {
  MenuCloseIcons,
  SearchIcons,
} from "../../../../../../../../assets/icons";
import { Radio } from "antd";
import { LanguageDetectorDress } from "../../../../../../../../language/LanguageItems";

function LocationDropUp({
  onClick,
  data,
  selectedLocation,
  checkedData,
  setOpenLocationModal,
  setSelectedLocation,
  setSelectedSize,
  existRegions,
  existRegionsObj,
}) {
  const [languageDetector, setLanguageDetector] = useContext(
    LanguageDetectorDress
  );

  return (
    <main>
      <div className="max-w-[440px] w-[100%] mx-auto bg-white shadow-navMenuShadov  overflow-hidden h-fit rounded-t-[12px]">
        <section className="h-[52px] w-full bg-btnBgColor flex items-center  justify-between px-4 mb-1 ">
          <p className="text-xl font-AeonikProMedium">Локации</p>
          <button onClick={onClick}>
            <MenuCloseIcons colors={"#000"} />
          </button>
        </section>
        <section className="w-full h-[380px] px-4 flex flex-col items-center">
          <div className="w-full h-fit flex items-center justify-center overflow-auto VerticelScroll flex-wrap gap-x-7 mb-[28px]">
            <Radio.Group
              style={{
                width: "100%",
              }}
              value={selectedLocation?.id}
              defaultValue={selectedLocation?.id}
            >
              {existRegions.map((item, i) => {
                return (
                  <div key={i}>
                    <div className="font-AeonikProRegular text-base border-b border-[#f0f0f0] mb-[15px]">
                      {existRegionsObj[item]}
                    </div>
                    <div className="w-full">
                      {data?.product?.locations.map((data, i) => {
                        if (data?.sub_region?.region_id === item) {
                          return (
                            <div
                              onClick={() => {
                                checkedData = data;
                              }}
                              key={i}
                              className="mb-[8px]"
                            >
                              <Radio
                                value={data?.id}
                                name="location"
                                checked={selectedLocation?.id === item?.id}
                                className="text-sm font-AeonikProRegular"
                              >
                                {languageDetector?.typeLang === "ru" &&
                                  data?.sub_region?.name_ru}
                                {languageDetector?.typeLang === "uz" &&
                                  data?.sub_region?.name_uz}
                                ({data?.address})
                              </Radio>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                );
              })}
            </Radio.Group>
          </div>
          <div className="w-full mt-auto flex items-center justify-between gap-x-3 mb-10">
            <button
              onClick={onClick}
              className="w-[45%] h-[38px] text-base font-AeonikProMedium bg-white text-borderWinter border border-borderWinter rounded-md active:scale-95"
            >
              Закрыт
            </button>
            <button
              type="button"
              onClick={() => {
                setOpenLocationModal(false);
                setSelectedLocation(checkedData);
                setSelectedSize(null);
                onClick();
              }}
              className="w-[55%] h-[38px] text-base font-AeonikProMedium bg-borderWinter text-white border border-borderWinter rounded-md active:scale-95"
            >
              Готово
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
export default React.memo(LocationDropUp);
