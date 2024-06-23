import React, { useContext } from "react";
import { Context } from "../Context";
import { HiChevronLeft } from "react-icons/hi";

const PageBack = () => {
  const { header, PageBack } = useContext(Context);

  return (
    <>
      <header
        className={`flex  items-center ${
          PageBack
            ? "justify-center gap-10 md:justify-between"
            : "justify-center"
        } text-3xl md:text-4xl font-bold text-blue-300 py-3 px-5 md:px-10`}
      >
        {PageBack ? (
          <a
            href="/"
            className="bg-gray-600 text-white p-2 rounded-full text-xl md:text-2xl"
          >
            <HiChevronLeft />
          </a>
        ) : null}
        {header}
      </header>
    </>
  );
};

export default PageBack;
