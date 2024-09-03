import React, { useState, useEffect } from "react";
import local from "../assets/venue.jpg";
import globe from "../assets/globe.jpg";
import venue from "../assets/events.jpg";
import { Link } from "react-router-dom";

// ok


const Slider = () => {
  const [index, setIndex] = useState(0);
  const [isHidden, setIsHidden] = useState(true);

  const slides = [
    {
      image: globe,
      alt: "Image 1",
      text: "Attend National Events",
    },
    {
      image: local,
      alt: "Image 2",
      text: "Attend Local Events",
    },
    {
      image: venue,
      alt: "Image 3",
      text: "Manage all events",
    },
  ];

  const nextSlide = () => {
    setIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };


  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
      setIsHidden(false);
    }, 3000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="flex bg-[#061621] mt-5 py-2 max-w-[90rem] mx-auto rounded-[8px] p-4 items-center justify-center flex-wrap">
      <div className="w-full lg:w-1/2">
        <p className="text-white my-2 text-2xl font-bold lg:pr-[3rem] w-full">
          What can you do On our platform?
        </p>

        <ol className="list-disc text-white text-base p-1 mb-6">
          <li>Create and Manage events</li>
          <li>Register to local and national events</li>
        </ol>

        <Link
          className="mt-10 mb-10 text-white border border-primary px-5 py-3 rounded font-semibold transition duration-300 ease-in-out hover:bg-red-600"
          to={"/events"}
        >
          Explore Events
        </Link>
      </div>

      <div className="relative w-[300px] lg:w-[400px] h-[300px] lg:h-[400px] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <div
            className="relative w-full h-full"
            style={{ transition: "opacity 0.5s ease-in-out" }}
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                className={`absolute top-0 left-0 w-full h-full flex justify-center items-center transition-opacity duration-1000 ${
                  i === index ? "opacity-100 z-10" : "opacity-0"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover rounded-full object-center"
                />
                <div className="absolute h-full w-full rounded-full flex items-center justify-center p-4 bg-[rgba(0,0,0,0.5)] bg-opacity-50 text-white text-center font-semibold text-xl">
                  {slide.text}
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Slider;
