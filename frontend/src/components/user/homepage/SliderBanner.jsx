import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
const ResponsiveImage = ({ small, large }) => (
  <picture>
    <source media="(max-width: 959.98px)" srcSet={small} />
    <source media="(min-width: 960px)" srcSet={large} />
    <img src={small}  loading="lazy" className="w-full sm:h-full h-[50vh]  object-cover " />
  </picture>
);
const SliderBanner = () => {
    
  return (
    <div className=" bg-black pt-4 pb-4   flex justify-center overflow-hidden">
    <div className="relative w-full h-full">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
    
        slidesPerView={1.5} 
        breakpoints={{
          0: {          
            slidesPerView: 1.2,
          },
          768: {       
            slidesPerView: 1.5,
          },
        }}

        centeredSlides={true} 
        spaceBetween={10}
        loop={true}
        
        autoplay={{
          delay: 5000, 
          
        }}
        className=""
      >
      {images.map((img, i) => (
<SwiperSlide key={i} className="transition-all duration-300 relative">
  {({ isActive }) => (
    <div className="relative overflow-hidden">
      <ResponsiveImage {...img} />

      {/* Overlay */}
      {!isActive && (
        <div className="absolute inset-0 bg-black/40 bg-opacity-50 transition-all duration-300"></div>
      )}
    </div>
  )}
</SwiperSlide>
))}

      </Swiper>

      {/* Custom nút prev/next */}
     <div className="hidden sm:block">
     <button className="cursor-pointer custom-prev absolute top-1/2 left-48 z-10 -translate-y-1/2 p-6 bg-white  rounded-full shadow hover:bg-gray-100">
       <img className="rotate-180 w-4 h-4 " src="https://www.goodsmile.com/img/icon/arrow-paging.svg" alt="" />
      </button>
      <button className="cursor-pointer custom-next absolute top-1/2 right-48 z-10 bg-white -translate-y-1/2 p-6 rounded-full shadow hover:bg-gray-100">
      <img className=" w-4 h-4 " src="https://www.goodsmile.com/img/icon/arrow-paging.svg" alt="" />

      </button>
     </div>
    </div>
  </div>
  )
}

export default SliderBanner