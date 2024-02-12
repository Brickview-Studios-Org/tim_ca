import { getFormattedPrice } from "@/utils/productInfoUtils";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const ProductViewInfoCard = ({ productInfo }) => {
  const [isInfoExpanded, setIsInfoExpanded] = useState(false);

  function handleExpandToggleClick() {
    setIsInfoExpanded(!isInfoExpanded);
  }

  const availableSizes = productInfo.data.productSizes;

  return (
    <section
      className={`absolute bottom-5 left-5 right-5 flex flex-col items-center justify-between overflow-clip transition-all ease-in-out duration-100 z-20 ${
        isInfoExpanded ? "h-[40rem] rounded-3xl" : "h-20 rounded-full"
      }`}
    >
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between p-4 gap-4 h-20 w-full bg-gradient-to-br from-tif-lavender to-tif-pink shadow-md z-10">
        <h1 className="flex items-center justify-start w-full h-full truncate text-white font-semibold">
          {productInfo.data.productName}
        </h1>
        <button
          onClick={handleExpandToggleClick}
          className="flex items-center justify-center h-full aspect-square text-tif-blue bg-white rounded-full shadow-lg"
        >
          <ChevronDownIcon
            className={`w-6 h-6 ${
              isInfoExpanded ? "rotate-0" : "rotate-180"
            } transition-all ease-in-out delay-100 duration-150`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-end h-[35rem] w-full bg-white">
        <div className="relative flex flex-col px-4 py-2 h-[20.25rem] w-full">
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white from-40% z-10" />
          <h1 className="w-full pb-2 text-black text-lg font-medium bg-white">
            Description
          </h1>
          <div className="flex gap-2 text-sm overflow-y-auto">
            {productInfo.data.description}
          </div>
        </div>

        <div className="flex flex-col px-4 py-2 w-full">
          <h1 className="w-full text-black text-lg font-medium">
            Available Sizes
          </h1>
          <div className="flex gap-4 -mx-4 px-4 py-2 overflow-x-auto">
            {availableSizes.map((size) => (
              <div
                key={size.toUpperCase(size)}
                className="flex items-center justify-center p-4 text-white text-xs font-medium bg-gray-600 rounded-md"
              >
                {size.toUpperCase(size)}
              </div>
            ))}
            <div className="absolute left-0 w-4 h-12 bg-gradient-to-r from-white from-40%" />
            <div className="absolute right-0 w-4 h-12 bg-gradient-to-l from-white from-40%" />
          </div>
        </div>

        <div className="flex flex-col p-4 w-full py-4 pt-2">
          <div className="flex flex-col gap-2 p-4 border-tif-blue border-2 rounded-2xl">
            <h2 className="text-lg font-medium">Price</h2>
            <div className="flex items-center gap-4">
              {productInfo.data.discountPercent > 0 && (
                <div className="flex items-center justify-center gap-2 p-4 text-2xl font-bold text-white bg-gradient-to-br from-tif-blue to-tif-pink rounded-xl">
                  {productInfo.data.discountPercent + "%"}
                  <h1>Off</h1>
                </div>
              )}

              <div className="flex flex-col">
                {productInfo.data.discountPercent > 0 && (
                  <h2 className="line-through text-red-500/50">
                    {getFormattedPrice(
                      productInfo.data.currency,
                      productInfo.data.price
                    )}
                  </h2>
                )}
                <h1 className="text-2xl font-bold">
                  {getFormattedPrice(
                    productInfo.data.currency,
                    productInfo.data.discountPercent > 0
                      ? productInfo.data.discountedPrice
                      : productInfo.data.price
                  )}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductViewInfoCard;
