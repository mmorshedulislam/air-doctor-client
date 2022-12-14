import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="banner my-10 mx-5 lg:mx-0">
      <div className="img-gradient rounded-lg">
        <img
          src="https://dy6a9v2cv3oh.cloudfront.net/uploads/the-health-system-is-nationwide-1585887448.jpg"
          className="w-full max-h-screen rounded-lg"
          alt=""
        />
      </div>
      <div className="banner-text ">
        <div className="text-4xl lg:text-7xl text-center text-white">
          <h2>
            The World's Best <br />
            <i className="font-bold text-4xl lg:text-9xl text-[#9EC23C]">
              Psychological
            </i>
            <br /> Services
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Header;
