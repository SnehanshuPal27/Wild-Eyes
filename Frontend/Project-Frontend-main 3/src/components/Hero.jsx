import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sher from "../assets/sher.png";
import tiger from "../tiger.jpeg";
import AOS from "aos";
import "./Hero.css";

const Hero = () => {
  useEffect(() => {
    AOS.refresh();
  });

  return (
    <div className="dark:bg-black dark:text-white duration-300">
      <div className="container min-h-[620px] flex flex-col md:flex-row">
        <div className="grid grid-cols-1 md:grid-cols-2 place-items-center">
          <div
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-once="false"
            className="order-2 md:order-1 mb-8 md:mb-0"
          >
            <img
              src={tiger}
              alt=""
              className="w-81 h-auto mx-auto md:max-w-none md:h-[500px] lg:h-[600px] drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)] "
            />
          </div>
          <div className="space-y-5 order-1 md:order-2 md:pl-10">
            <p
              data-aos="fade-up"
              className="text-lg md:text-2xl font-serif"
              style={{ color: "#f6a308" }}
            >
              Effortless
            </p>
            <h1
              data-aos="fade-up"
              data-aos-delay="600"
              className="text-2xl md:text-4xl lg:text-5xl font-semibold font-serif"
            >
              Welcome to WildEyes!
            </h1>
            <p
              data-aos="fade-up"
              data-aos-delay="1000"
              className="text-base md:text-lg lg:text-xl"
              style={{ fontFamily: "cursive", fontWeight: "500" }}
            >
              Identify species, learn fascinating facts and discover the wonders
              of wildlife around you <br /> - Start your journey into the wild
              today{" "}
            </p>
            <Link to="/cars">
              <button
                data-aos="fade-up"
                data-aos-delay="1500"
                onClick={() => {
                  AOS.refreshHard();
                }}
                className="rounded-md hover:bg-primary/80 transition duration-500 py-2 px-6 text-white hero-btn"
              >
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;