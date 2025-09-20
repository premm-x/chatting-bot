import React from "react";

const Loading = () => {
  return (
    <>
      <style>
        {`
          @keyframes bounceFade {
            to {
              opacity: 0.1;
              transform: translateY(-0.1rem);
            }
          }
        `}
      </style>

      <div className="flex justify-center pt-0.5">
        <div className="w-2 h-2  mx-1 bg-[#8385aa] rounded-full animate-[bounceFade_0.6s_infinite_alternate]" />
        <div className="w-2 h-2  mx-1 bg-[#8385aa] rounded-full animate-[bounceFade_0.6s_infinite_alternate] [animation-delay:0.2s]" />
        <div className="w-2 h-2  mx-1 bg-[#8385aa] rounded-full animate-[bounceFade_0.6s_infinite_alternate] [animation-delay:0.4s]" />
      </div>
    </>
  );
};

export default Loading;
