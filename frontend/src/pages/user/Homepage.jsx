import React from "react";
import SliderBanner from './../../components/user/homepage/SliderBanner';
import Section1 from './../../components/user/homepage/Section1';
import SearchByBrand from './../../components/user/homepage/SearchByBrand';
import PreOrdersNow from './../../components/user/homepage/PreOrdersNow';
import Exclusives from './../../components/user/homepage/Exclusives';




const Homepage = () => {
  return (
   <div>
    <SliderBanner />
    <Section1  />
  <div className=" max-w-screen-xl mx-auto">
 <SearchByBrand  />
 <PreOrdersNow  />
 <Exclusives />
  </div>
   </div>
  );
};


export default Homepage;
