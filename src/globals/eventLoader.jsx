import React from 'react';

const EventLoader = ({ count }) => {
  const elements = Array.from({ length: count }, (_, index) => index);

  return (
    <>
      {elements.map((element) => (
        <div key={element} className="mx-3 space-y-4">
          {/* Event image skeleton */}
          <div className="w-[300px] h-[280px] bg-gray-200 animate-pulse rounded"></div>
          {/* Event description skeleton */}
          <div className="w-[300px] h-[100px] bg-gray-200 animate-pulse rounded"></div>
          {/* Small text skeleton */}
          <div className="w-[60%] h-5 bg-gray-200 animate-pulse rounded mt-2"></div>
        </div>
      ))}
    </>
  );
};

export default EventLoader;
