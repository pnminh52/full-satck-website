import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./slider.css"
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useRef } from "react";
const slidesData = [
  {
    url: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-40-iphone-17-pro-202509?wid=800&hei=1000&fmt=jpeg&qlt=90&.v=UzBXQnlhUWdraTNvNU1Kb3pEQlpXQjVOVStZaG1ncWFjNXVUZkZ4anVIYlNab1lJcUZwSFVRK1htYlNmZUtPTG54cStVNU5BQmhzbkxYRGxDWUc3R2RBR0JWVHBRN0NKVm11SFZzeU45T2VCTXFJbjVIbEFUN05pTHFFYldZYzg",
    name: "iPhone 17 Pro",
    des: "Pro đỉnh cao.",
    tag: "Đặt trước ngay",
    price: "Từ 34.990.000₫",
  },
  {
    url: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-40-iphone-air-202509?wid=800&hei=1000&fmt=jpeg&qlt=90&.v=UzBXQnlhUWdraTNvNU1Kb3pEQlpXT0lGL3JSRk9QTHUvdlNaQzlmZ3M4Ym45S05qekNUdVUwMVFyK1pKaERUd2JGcXNRQnFCV0w3WVRjTExvdm1ic1VsVU5yYWhNQlZNeWo2SGZrN292cVlVRk5BYjU4dkMrYjBKSjFqVXFOVGg",
    name: "iPhone Air",
    des: "iPhone mỏng nhất từng có.",
    tag: "Đặt trước ngay",
    price: "Từ 31.990.000₫",
  },
  {
    url: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-40-iphone-17-202509?wid=800&hei=1000&fmt=jpeg&qlt=90&.v=UzBXQnlhUWdraTNvNU1Kb3pEQlpXSHVrRHVBUzZ5dlZsTGhlK2dxMHZnWDkvamYzRzRvcFlnajNacmhEOC9BeDE1UUxLT2t0cW42N3FvQzVqaGhrVVFzY1NTN1pYSVRIN1hKQ2xOdjlkRnArYWpGdS9XeFgvbS9ITnNYOEhYaG4",
    name: "iPhone 17",
    des: "Đa tài, đa sắc.",
    tag: "Đặt trước ngay",
    price: "24.990.000 ₫",
  },
  {
    url: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-40-watch-s11-202509_GEO_VN?wid=800&hei=1000&fmt=jpeg&qlt=90&.v=QWhYaUFuRS9hTUliZ3N5RWVCV09valRRUlJUaDNLcGNDeGFIUENxWmdjTDk3Y1N3azlHUnRFSmV6dzBqZlVnVDczTGJ1bkVZOVdxMC9CSUwydmQ4a0o0eThMS0YvelVrajJyK1hYTEVqWTV6Ukc4b2xrODAySlBPRHpuUEkvUS8",
    name: "Apple Watch Series 11",
    des: "Chiếc Apple Watch cực đỉnh giúp bạn theo dõi sức khỏe.",
    tag: "",
    price: "Từ 11.499.000₫",
  },
  {
    url: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-40-watch-se-202509_GEO_VN?wid=800&hei=1000&fmt=jpeg&qlt=90&.v=QWhYaUFuRS9hTUliZ3N5RWVCV09vblVvWDFTR2d2QS9FZ0dqdEJBMEFEb0NDYVBpVElaTE1rWEYzYjFOM0lRRjFQYkthbm1jaTVkUmtRenhDTTR4ZnI3N0VpSi8yV1hHV0lOdGdTbTEwNmxjVkxRRWhEdlRXbjh4bzBuQjVaN3U",
    name: "Apple Watch SE",
    des: "Đi cùng. Trò chuyện. Theo sát. Mãi yêu.  ",
    tag: "",
    price: "Từ 6.999.000₫",
  },
  {
    url: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-40-macbook-air-202503?wid=800&hei=1000&fmt=p-jpg&qlt=95&.v=MjhMcWJ2MGZwbXEwdnBkcUN6ZnhyOWVOMytmanI1M0ZTQWR1RjlDMWJpNXFTRjNxbmh1UnU2R29ibGdpZUFXc0prY3crUWRsN1dqVjRnMHR5S1hVbk15N0N0R0lhUGhlMG1Tdmc3RjZVQ09NTUhYNlZ6OGxKNWpBMHlTSTlldko",
    name: "MacBook Air ",
    des: "Nhẹ mê. Nhanh dễ nể.",
    tag: "ĐẶT TRƯỚC NGAY",
    price: " Từ 26.508.000₫ ",
  },
];

const Slider1 = () => {
    const swiperRef = useRef(null);
  return (
<div className="relative">
<button
  onClick={() => swiperRef.current.swiper.slidePrev()}
  className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-black/50 p-2 cursor-pointer rounded-full shadow-lg hover:bg-black transition"
>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="white" className="w-8 h-8 text-white">
    <path d="M21.559,12.062 L15.618,17.984 L21.5221,23.944 C22.105,24.533 22.1021,25.482 21.5131,26.065 C21.2211,26.355 20.8391,26.4999987 20.4571,26.4999987 C20.0711,26.4999987 19.6851,26.352 19.3921,26.056 L12.4351,19.034 C11.8531,18.446 11.8551,17.4999987 12.4411,16.916 L19.4411,9.938 C20.0261,9.353 20.9781,9.354 21.5621,9.941 C22.1471,10.528 22.1451,11.478 21.5591,12.062 L21.559,12.062 Z"></path>
  </svg>
</button>


  {/* Custom Next Button */}
  <button
    onClick={() => swiperRef.current.swiper.slideNext()}
    className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-black/50 p-2 cursor-pointer rounded-full shadow-lg hover:bg-black transition"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="white" className="w-8 h-8 rotate-180 text-white">
        <path d="M21.559,12.062 L15.618,17.984 L21.5221,23.944 C22.105,24.533 22.1021,25.482 21.5131,26.065 C21.2211,26.355 20.8391,26.4999987 20.4571,26.4999987 C20.0711,26.4999987 19.6851,26.352 19.3921,26.056 L12.4351,19.034 C11.8531,18.446 11.8551,17.4999987 12.4411,16.916 L19.4411,9.938 C20.0261,9.353 20.9781,9.354 21.5621,9.941 C22.1471,10.528 22.1451,11.478 21.5591,12.062 L21.559,12.062 Z"></path>
      </svg>
    </button>
<Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination]}
        slidesPerView={3}
        spaceBetween={20}
        pagination={{ clickable: true }}
        loop={true}
        className="px-5"
      >
      {slidesData.map((item, index) => (
     <SwiperSlide
     key={index}
     id={`slide-${index}`}
     className="relative h-[504px] overflow-hidden rounded-3xl "
   >
     <img
       src={item.url}
       alt={item.name}
       className="w-full h-full object-cover"
     />
     <div
       className={`absolute top-5 left-5 max-w-md ${
         index === 0 ? "text-black" : "text-white"
       }`}
     >
       <span
         className={`uppercase text-sm ${
           index === 0 ? "text-white" : "text-black"
         }`}
       >
         {item.tag}
       </span>
       <h2 className={`text-3xl font-sf ${index === 0 ? "text-white" : "text-black"}`}>
         {item.name}
       </h2>
       <p className={`text-lg font-sf ${index === 0 ? "text-white" : "text-black"}`}>
         {item.des}
       </p>
       <p className={`text-sm ${index === 0 ? "text-white" : "text-black"}`}>
         {item.price}
       </p>
     </div>
   </SwiperSlide>
   
    
      ))}
    </Swiper>
</div>
  );
};

export default Slider1;
