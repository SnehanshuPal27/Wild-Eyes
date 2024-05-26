import React from "react";
import { Link } from "react-router-dom";
import CarPng from "../assets/sher.png";
import "./About.css";

const About = () => {
  return (
    <div
      className="dark:bg-dark bg-black sm:min-h-[600px] sm:grid sm:place-items-center duration-300"
    >
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div data-aos="slide-right" data-aos-duration="1500">
            <img
              src={CarPng}
              alt=""
              className="sm:scale-125 sm:-translate-x-11 max-h-[300px] drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)]"
            />
          </div>
          <div>
            <div className="space-y-5 sm:p-16 pb-6">
              <h1
                data-aos="fade-up"
                className="text-3xl sm:text-4xl font-bold font-serif"
                style={{ color: "#f6a308" }}
              >
                About us
              </h1>
              <p data-aos="fade-up" className="leading-8 tracking-wide sm:pr-10">
                At WildEyes, we are passionate about connecting people with the natural world.
                Our mission is to make it easy for everyone to discover and appreciate the diverse species that inhabit our planet. With our user-friendly platform, you can identify local wildlife and learn intriguing facts about them.
              </p>
              <p data-aos="fade-up" className="leading-8 tracking-wide">
                We believe that understanding and appreciating biodiversity is crucial for its preservation. By fostering a deeper connection with nature, we aim to inspire conservation efforts and promote environmental awareness. Join us at WildEyes and embark on a journey to uncover the hidden wonders of the natural world around you.
              </p>
              <Link to="/cars">
                <button data-aos="fade-up" className="button-outline-about">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
