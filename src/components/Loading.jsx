import React from "react";
import Lottie from "lottie-react";
import loadingAnim from "../lotties/loadingAnim.json";

function Loading() {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 m-12 outline-none focus:outline-none">
        <div className="relative w-full my-6 mx-auto max-w-sm">
          <div className="border-0 rounded-md shadow-lg relative flex flex-col w-full justify-center items-center outline-none focus:outline-none">
            <Lottie
              animationData={loadingAnim}
              loop={true}
              className="w-24 h-24"
            />
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default Loading;
