import React, { useState, useEffect, useRef, useContext } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Slider from "react-slick";
import { BrushColorIcons, MenuCloseIcons, VideoStoreIcons } from "../../../../../../assets/icons";
import { dressMainData } from "../../../../../../ContextHook/ContextMenu";

const ProductCarousel = ({ show }) => {
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const [dressInfo] = useContext(dressMainData);

  const [modalOfCarsouel, setModalOfCarsouel] = useState(false)
  const handleClickCarosuel = (id) => {
    setModalOfCarsouel(true)
  }

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

  const [imgGroup] = useState([
    {
      id: 1,
      action: true,
      img: "https://images.uzum.uz/ch15okj57mg9720fq5h0/original.jpg",
    },
    {
      id: 2,
      action: false,
      img: "https://images.uzum.uz/cgcp9n7g49devoab8a50/t_product_240_high.jpg",
    },
    {
      id: 3,
      action: false,
      img: "https://images.uzum.uz/ch15okng49devoaengt0/original.jpg",
    },
    {
      id: 4,
      action: false,
      img: "https://images.uzum.uz/ch15okvhj8j9g69e280g/original.jpg",
    },
    {
      id: 5,
      action: false,
      img: "https://images.uzum.uz/cgcphi7hgiov1qif46p0/original.jpg",
    },
    {
      id: 6,
      action: false,
      img: "https://images.uzum.uz/ch0g2rr57mg9720fmb9g/t_product_240_high.jpg",
    },
    {
      id: 7,
      action: false,
      img: "https://images.uzum.uz/ch0g2rvhj8j9g69dv4v0/original.jpg",
    },
    {
      id: 8,
      action: false,
      img: "https://images.uzum.uz/ch0g2rvhj8j9g69dv4vg/original.jpg",
    },
    {
      id: 9,
      action: false,
      img: "https://images.uzum.uz/cgl7vevhj8j9g69br4e0/original.jpg",
    },
  ]);

  const [SizeBtnList] = useState([
    { id: 1, size_in_letters: "XXS", size_in_numbers: "11-23" },
    { id: 2, size_in_letters: "XS", size_in_numbers: "11-23" },
    { id: 3, size_in_letters: "S", size_in_numbers: "25-36" },
    { id: 4, size_in_letters: "M", size_in_numbers: "25-36" },
    { id: 5, size_in_letters: "L", size_in_numbers: "36-44" },
    { id: 6, size_in_letters: "XL", size_in_numbers: "36-44" },
    { id: 7, size_in_letters: "XXL", size_in_numbers: "36-44" },
    { id: 8, size_in_letters: "3XL", size_in_numbers: "36-44" },
    { id: 9, size_in_letters: "4XL", size_in_numbers: "36-44" },
    { id: 10, size_in_letters: "5XL", size_in_numbers: "36-44" },
    { id: 11, size_in_letters: "6XL", size_in_numbers: "36-44" },
  ]);

  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const slider1 = useRef(null);
  const slider2 = useRef(null);

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <main
        className={`md:hidden absolute text-center cursor-pointer no-underline opacity-50 w-8 h-8 group-hover:flex flex items-center justify-center top-[50%] z-10 right-[20px] rounded-lg md:rounded-full bg-bgColor duration-200 border  border-searchBgColor`}
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
        className={`md:hidden absolute text-center cursor-pointer no-underline opacity-50 w-8 h-8 group-hover:flex flex items-center justify-center top-[50%] z-10 left-[20px] rounded-lg md:rounded-full bg-bgColor duration-200 border  border-searchBgColor`}
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
        className={`absolute text-center cursor-pointer no-underline opacity-70 w-[44px] h-[44px] hidden md:flex items-center justify-center top-[50%] z-10 right-[15px] md:right-[-70px] rounded-full bg-bgColor duration-200 border  border-searchBgColor  `}
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
        className={`absolute text-center cursor-pointer no-underline opacity-70 w-[44px] h-[44px] hidden md:flex items-center justify-center top-[50%] z-10 left-[15px] md:left-[-70px] rounded-full bg-bgColor duration-200 border  border-searchBgColor`}
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
  let settings1 = {
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 390,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
    ],
  };
  let settings2 = {
    dots: false,
    infinite: true,
    swipeToSlide: true,
    initialSlide: 0,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };
  let settingsModal = {
    nextArrow: <NextArrowModal />,
    prevArrow: <PrevArrowModal />,
    infinite: true,
    dots: false,
    speed: 500,
  };

  return (
    <main className="w-full md:w-fit h-full">

      <div className="w-full">
        <section
          onClick={() => setModalOfCarsouel(false)}
          className={`fixed inset-0 z-[200] duration-200 w-full h-[100vh] bg-black opacity-60 ${modalOfCarsouel ? "" : "hidden"
            }`}
        ></section>
        <section
          className={`fixed z-[201] rounded-lg bg-white w-fit h-fit mx-auto mt-[130px] md:m-auto cursor-pointer flex flex-col items-center justify-center inset-0 ${modalOfCarsouel ? "" : "hidden"
            }`}
        >
          <button
            onClick={() => setModalOfCarsouel(false)}
            className="absolute flex items-center justify-center w-10 h-10 md:w-[50px] md:h-[50px] top-[-60px] right-0 md:top-0 z-40 md:right-[-80px]  rounded-full bg-[#808080]">
            <MenuCloseIcons colors="#fff" />
          </button>
          <div>
            <Slider
              className="relative w-[360px] h-[480px] md:!w-[670px] md:h-[850px] showpageSlider !overflow-visible bg-white rounded-lg mt-[-4px]"
              {...settingsModal}
            >
              {imgGroup?.map((data) => {
                return (
                  <article>
                    <figure className="relative w-[360px] h-[480px] md:w-full md:h-[850px]  border border-searchBgColor bg-btnBgColor rounded-lg flex items-center justify-center">
                      <img className="w-full h-full" src={data?.img} alt="" />
                      <figcaption className="flex md:hidden w-full absolute items-center justify-between px-4 opacity-80 text-sm font-AeonikProMedium left-0 right-0 bottom-4 ">
                        <span className="bg-bgCard pt-1 gap-x-[3px] rounded-[40%] px-3 py-1 flex items-center leading-5 tracking-wider  ">
                          <p> {data.id}</p>/<p>{imgGroup.length}</p>
                        </span>
                      </figcaption>
                    </figure>
                  </article>

                );
              })}

            </Slider>
          </div>

        </section>
      </div>

      {screenSize.width >= 768 ? (

        <section className={`w-full h-[620px] flex flex-col md:flex-row md:gap-x-[10px] md:sticky duration-500 ${show ? "visible z-20 top-[110px]" : "visible z-20 top-[16px]"
          }
        `}>
          <article className="flex w-[90px] flex-col">
            <Slider
              asNavFor={nav1}
              ref={slider2}
              slidesToShow={6}
              swipeToSlide={true}
              focusOnSelect={true}
              vertical={true}
              className="flex flex-col flex-wrap w-full h-full pt-0 rounded-lg"
            >
              {imgGroup?.map((data) => {
                return (
                  <figure
                    key={data?.id}
                    className="!w-[90px] cursor-pointer !h-[120px] border border-searchBgColor bg-btnBgColor rounded-lg flex items-center justify-center"
                  >
                    <img
                      className="w-full h-full rounded-lg"
                      src={data?.img}
                      alt=""
                    />
                  </figure>
                );
              })}
            </Slider>
          </article>

          <article className="group mx-auto md:w-[480px] md:h-[620px]">
            <Slider
              className="w-full h-full rounded-lg"
              asNavFor={nav2}
              ref={slider1}
              {...settings}
            >
              {imgGroup?.map((data) => {
                return (
                  <article
                    key={data?.id}
                    onClick={() => handleClickCarosuel(data?.id)}
                  >
                    <figure className="relative w-full h-full overflow-hidden border border-searchBgColor bg-btnBgColor rounded-lg flex items-center justify-center">
                      <img className="w-full h-fit" src={data?.img} alt="" />
                      <figcaption className="flex md:hidden w-full absolute items-center justify-between px-4 opacity-80 text-sm font-AeonikProMedium left-0 right-0 bottom-4 ">
                        <span className="bg-bgCard pt-1 gap-x-[3px] rounded-[40%] px-3 py-1 flex items-center leading-5 tracking-wider  ">
                          <p> {data.id}</p>/<p>{imgGroup.length}</p>
                        </span>
                        <span className="w-fit flex items-center p-2 gap-x-2 rounded-lg bg-bgCard border border-searchBgColor">
                          <p className="flex items-center ">
                            <VideoStoreIcons />
                          </p>
                          <p className="flex items-center not-italic font-AeonikProRegular text-sm leading-4 text-black">
                            Видео
                          </p>
                        </span>
                      </figcaption>
                    </figure>
                  </article>
                );
              })}
            </Slider>
          </article>
        </section>

      ) : (
        <section className="w-full h-fit flex flex-col">
          {/* 1 */}
          <article className="w-full widthInherit mx-auto">
            <Slider
              className="w-full h-full rounded-lg"
              ref={slider1}
              {...settings}
            >
              {imgGroup?.map((data) => {
                return (
                  <article
                    key={data?.id}
                    onClick={() => handleClickCarosuel(data?.id)}
                  >
                    <figure className="relative w-full h-full border border-searchBgColor bg-btnBgColor rounded-lg flex items-center justify-center">
                      <img className="w-full h-fit" src={data?.img} alt="" />
                      <figcaption className="flex md:hidden w-full absolute items-center justify-between px-4 opacity-80 text-sm font-AeonikProMedium left-0 right-0 bottom-4 ">
                        <span className="bg-bgCard pt-1 gap-x-[3px] rounded-[40%] px-3 py-1 flex items-center leading-5 tracking-wider  ">
                          <p> {data.id}</p>/<p>{imgGroup.length}</p>
                        </span>
                      </figcaption>
                    </figure>
                  </article>
                );
              })}
            </Slider>
          </article>

          {/* 2 */}
          <article className="w-full flex md:hidden items-center justify-between mb-6 mt-4">
            <section className="w-fit flex items-center">
              <span className="text-base font-AeonikProMedium mr-[5px]">от</span>
              <p className="block font-AeonikProMedium text-[24px] text-black mr-[5px]">
                452 000
              </p>
              <p className="font-AeonikProRegular line-through text-[16px] text-setTexOpacity">
                652 000
              </p>
            </section>
            <section
              className={`w-fit ${dressInfo?.TextColorSeason} items-center text-sm flex ml-8`}
            >
              <p className="font-AeonikProRegular text-right">
                В наличии:
              </p>
              <p className="ml-2 font-AeonikProMedium text-base text-right">
                28
              </p>
            </section>
          </article>

          {/* 3 */}
          <article className="w-full flex flex-col">
            <div className="w-full flex items-center mb-4 text-base">
              <BrushColorIcons colors={"#000"} />
              <p className="font-AeonikProRegular mr-2 ml-[6px]">Цвет:</p>
              <span className="font-AeonikProMedium">Синий</span>
            </div>
            <Slider
              // asNavFor={nav1}
              // focusOnSelect={true}
              ref={slider2}
              swipeToSlide={true}
              vertical={false}
              {...settings1}
              className="flex flex-row flex-wrap pt-0 rounded-lg"
            >
              {imgGroup?.map((data) => {
                return (
                  <figure
                    key={data?.id}
                    className="!w-[72px] cursor-pointer !h-[96px] border border-searchBgColor bg-btnBgColor rounded-lg flex items-center justify-center"
                  >
                    <img
                      className="w-full h-full rounded-lg"
                      src={data?.img}
                      alt=""
                    />
                  </figure>
                );
              })}
            </Slider>
          </article>

          {/* 4 */}
          <article className="w-full flex flex-col mt-4">
            <Slider
              // asNavFor={nav1}
              {...settings2}
              className="w-full flex flex-row flex-wrap rounded-lg"
            >
              {SizeBtnList?.map((data) => {
                return (
                  <article
                    key={data?.id}
                    className="!w-[62px] !h-[39px] cursor-pointer border border-searchBgColor rounded-lg flex items-center justify-center"
                  >
                    <div className="flex flex-col items-center justify-center py-1">
                      <div className="text-sm font-AeonikProMedium leading-4">{data.size_in_letters}</div>
                      <div className="text-xs font-AeonikProRegular text-[#757575]">{data.size_in_numbers}</div>
                    </div>
                  </article>
                );
              })}
            </Slider>
          </article>


        </section>
      )}
    </main>
  );
};
export { ProductCarousel };
