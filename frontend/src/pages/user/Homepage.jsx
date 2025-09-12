import React from "react";

const Homepage = () => {
  return (
    <div>
      <div className="block sm:hidden">
        <img
          src="https://www.iprimo.jp/common/img/index/2023/hero_fig02.png"
          alt=""
        />
      </div>
      <div className="hidden sm:block">
        <img
          src="https://www.iprimo.jp/common/img/index/2023/hero_fig02.webp"
          alt=""
        />{" "}
      </div>
    </div>
  );
};

export default Homepage;
