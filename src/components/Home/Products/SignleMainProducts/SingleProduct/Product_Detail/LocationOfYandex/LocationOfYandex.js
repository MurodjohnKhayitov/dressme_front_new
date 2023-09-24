import React, { useEffect } from "react";
import {
  YMaps,
  Map,
  ZoomControl,
  GeolocationControl,
  Placemark,
} from "react-yandex-maps";
import "./LocationOfYandex.css";
import { markerIcons } from "../../../../../../../assets";


function LocationOfYandex() {
  //------------------------------------------------------------------------------------------------
  const mapState = {
    center: [41.312922, 69.249465],
    zoom: 14,
  };
  //------------------------------------------------------------------------------------------------

  const handleOpenYandex = () => {
    window.open(`https://yandex.uz/maps/10335/tashkent/?ll=${mapState?.center[1]}%2C${mapState?.center[0]}&mode=search&sll=${mapState?.center[1]}%2C${mapState?.center[0]}&text=${mapState?.center[0]}%2C${mapState?.center[1]}&z=15`, "_blank")

  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  return (
    <div className={`w-full `}>
      <div className={"mapRoot"}>
        <YMaps
          query={{
            apikey: "8b56a857-f05f-4dc6-a91b-bc58f302ff21",
            lang: "ru",
          }}
        >
          <Map
            className={` overflow-hidden w-full h-[350px] md:h-[400px] rounded-lg productDetailsMaps`}
            defaultState={mapState}
            modules={["control.FullscreenControl"]}

          >
            <Placemark
              className={"placemarkCLuster cursor-pointer"}
              // key={index}
              // onClick={() => handlePlaceMark(data?.marketId, data?.cordinate)}
              geometry={mapState?.center}
              options={{
                iconLayout: "default#image",
                iconImageHref: markerIcons,
                iconImageSize: [32, 32],
              }}
              modules={["geoObject.addon.balloon"]}
            />
            <ZoomControl
              options={{
                float: "right",
                position: { bottom: 170, right: 10, },
                // size: "small",
              }}
            />{" "}
            <GeolocationControl
              options={{
                float: "right",
                position: { bottom: 80, right: 10 },
                // size: "small",
              }}
            />
          </Map>
        </YMaps>
      </div>
      <div className="w-full flex justify-end">
        <button
          onClick={handleOpenYandex}
          className={
            "w-full md:w-fit text-center active:scale-95 px-5 py-[10px] md:py-3 bg-borderWinter text-white font-AeonikProMedium text-xs md:text-base mt-[15px] rounded-lg"
          }
        >
          Открыть на карте
        </button>
      </div>
    </div>
  );
}
export default React.memo(LocationOfYandex);
