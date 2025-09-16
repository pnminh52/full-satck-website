import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Dữ liệu ảnh
const images = [
  {
    small: "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/carousel/309/947a43c3fc1a0458b1db5e7906da4d39.jpg",
    large: "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/carousel/309/44a9caf06ac35b96bffcad0a9f52e4e5.jpg",
  },
  {
    small: "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/carousel/306/60dabdc9b284425b1e332b86db721ccf.jpg",
    large: "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/carousel/306/62756daa69355d097b3fbc3603c13368.jpg",
  },
  {
    small: "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/carousel/303/ff150f6a785943547573e6dce622c925.jpg",
    large: "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/carousel/303/21dcd9af597c2b25a9c98e9f9f3d5b99.jpg",
  },
  {
    small: "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/carousel/314/e0d5a258719377017c3f0e1597dcb83f.jpg",
    large: "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/carousel/314/6ab1e5de255565e7bbca049b65d85685.jpg",
  },
  {
    small: "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/carousel/308/61d73fad9d4dd477dc807a38c1f3cde6.jpg",
    large: "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/carousel/308/bd4a8f5636c1df0414f30628d4f9d567.jpg",
  },
];

// Component hiển thị ảnh responsive
const ResponsiveImage = ({ small, large }) => (
  <picture>
    <source media="(max-width: 959.98px)" srcSet={small} />
    <source media="(min-width: 960px)" srcSet={large} />
    <img src={small}  loading="lazy" className="w-full h-auto object-cover " />
  </picture>
);

const Homepage = () => {
  return (
    <div className="sm:px-30 px-0 w-auto h-auto flex justify-center">
      <div className="relative w-full">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          slidesPerView={1}
          centeredSlides={true} // focus vào ảnh giữa
          spaceBetween={20}
          loop={true}
          className="sm:rounded-xl rounded-none"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i} className="transition-all duration-300">
              {({ isActive }) => (
                <div
                  className={` overflow-hidden ${
                    isActive ? "opacity-100" : "opacity-50 "
                  } transition-all duration-300`}
                >
                  <ResponsiveImage {...img} />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom nút prev/next */}
       <div className="hidden sm:block">
       <button className="custom-prev absolute top-1/2 left-20 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100">
          ◀
        </button>
        <button className="custom-next absolute top-1/2 right-20 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100">
          ▶
        </button>
       </div>
      </div>
    </div>
  );
};


export default Homepage;
