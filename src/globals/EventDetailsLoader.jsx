import React from 'react';

export const EventHighlightLoader = () => {
  return (
    <div className="w-full flex flex-col sm:flex-row pt-20">
      <div className="w-full sm:w-1/2 text-white gap-8 flex flex-col px-5 sm:px-12 justify-center text-2xl">
        <div className="bg-gray-700 rounded h-12 w-[500px] mb-4 animate-pulse"></div>
        <div className="bg-gray-700 rounded h-8 w-3/5 mb-4 animate-pulse"></div>
        <div className="bg-gray-700 rounded h-8 w-3/5 animate-pulse"></div>
      </div>
    </div>
  );
};

export const EventContentLoader = () => {
  return (
    <div className="w-full sm:w-[70%] mr-5 flex flex-col gap-5">
      <div className="bg-gray-700 rounded h-8 w-1/5 mb-4 animate-pulse"></div>
      <div className="bg-gray-700 rounded h-20 w-[700px] mb-4 animate-pulse"></div>
      <div className="bg-gray-700 rounded h-8 w-1/5 mb-4 animate-pulse"></div>
      <div className="bg-gray-700 rounded h-20 w-[700px] mb-4 animate-pulse"></div>
      <div className="bg-gray-700 rounded h-20 w-[700px] mb-4 animate-pulse"></div>
      <div className="bg-gray-700 rounded h-20 w-[700px] mb-4 animate-pulse"></div>
      <div className="bg-gray-700 rounded h-20 w-[700px] mb-4 animate-pulse"></div>
    </div>
  );
};

export const EventOrganizerLoader = () => {
  return (
    <div className="w-full sm:w-[30%] mt-5 sm:mt-0 text-sm flex flex-col gap-4 border-s-2 border-primary p-3">
      <div className="bg-gray-700 rounded h-10 w-1/3 animate-pulse mb-2"></div>
      <div className="bg-gray-700 rounded h-10 w-1/3 animate-pulse mb-2"></div>
      <div className="bg-gray-700 rounded h-10 w-1/3 animate-pulse mb-2"></div>
      <div className="bg-gray-700 rounded h-10 w-2/5 animate-pulse"></div>
    </div>
  );
};
