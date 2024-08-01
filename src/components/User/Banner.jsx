// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import useFetch from "../../hooks/useFetch";
import BASE_URL from "../../hooks/baseURL";

const Banner = () => {
  const {data:banners} = useFetch(BASE_URL+"/banner");
  // console.log(banners);

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={true}
      modules={[Autoplay, Pagination]}
    >
      {banners && banners.map((banner, index) => {
        return (
          <SwiperSlide key={index}>
            <img
              className="bannerImg rounded-4 mt-3"
              src={banner.img_url}
              alt={banner}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Banner;
