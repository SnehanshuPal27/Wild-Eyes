import React from "react";
import { FaCameraRetro } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { SlNote } from "react-icons/sl";

const skillsData = [
  {
    name: "SeamLess UI ",
    icon: (
      <FaCameraRetro className="text-5xl group-hover:text-black duration-300" style={{color:'#f6a308'}}/>
    ),
    link: "#",
    description: "Experience the Flow: Seamless UI for Effortless Interactions",
    aosDelay: "0",
  },
  {
    name: "Accurate Predictions",
    icon: (
      <GiNotebook className="text-5xl  group-hover:text-black duration-300" style={{color:'#f6a308'}}/>
    ),
    link: "#",
    description: "Predict with Precision: Accuracy You Can Trust",
    aosDelay: "500",
  },
  {
    name: "24/7 Customer Support",
    icon: (
      <SlNote className="text-5xl  group-hover:text-black duration-500" style={{color:'#f6a308'}}/>
    ),
    link: "#",
    description: "Enjoy peace of mind around the clock with our dedicated 24/7 customer support.",
    aosDelay: "1000",
  },
];
const Services = () => {
  return (
    <>
      <span id="about"></span>
      <div className="dark:bg-black dark:text-white py-14 sm:min-h-[600px] sm:grid sm:place-items-center">
        <div className="container" style={{position:'relative', left:'-1%' }}>
          <div className="pb-12">
            <h1
              data-aos="fade-up"
              className="text-3xl font-semibold text-center sm:text-4xl font-serif"
            >
              Why Choose Us
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" >
            {skillsData.map((skill) => (
              <div
                key={skill.name}
                data-aos="fade-up"
                data-aos-delay={skill.aosDelay}
                className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-16   hover:bg-primary duration-300 text-white hover:text-black rounded-lg"
                style={{ backgroundColor: "rgb(17 17 17 / var(--tw-bg-opacity))" }}
              >
                <div className="grid place-items-center">{skill.icon}</div>
                <h1 className="text-2xl font-bold">{skill.name}</h1>
                <p>{skill.description}</p>
                <a
                  href={skill.link}
                  className="inline-block text-lg font-semibold py-3  group-hover:text-black duration-300"
                  style={{color:'#f6a308'}}
                >
                  Learn more
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
