import React from "react";
import SliderBanner from './../../components/user/homepage/SliderBanner';
import Section1 from './../../components/user/homepage/Section1';
import SearchByBrand from './../../components/user/homepage/SearchByBrand';
import PreOrdersNow from './../../components/user/homepage/PreOrdersNow';
import Event from '../../components/user/homepage/Event';




const Homepage = () => {
  return (
   <div>
    <SliderBanner />
    <Section1  />
  <div className=" max-w-screen-xl mx-auto">
  <PreOrdersNow  />

<SearchByBrand  />

<Event />

  </div>
   </div>
  );
};


export default Homepage;
