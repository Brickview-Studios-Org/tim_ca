import { useState, useEffect, useRef } from "react";

const FilterPriceControls = ({
  minPrice,
  maxPrice,
  activePriceRange,
  callback_PriceChanged,
}) => {
  const progressRef = useRef(null);
  const [currActivePriceRange, setCurrActivePriceRange] =
    useState(activePriceRange);
  const [minValue, setMinValue] = useState(currActivePriceRange.min);
  const [maxValue, setMaxValue] = useState(currActivePriceRange.max);

  const handleMin = (e) => {
    if (maxValue - minValue >= 10000 && maxValue <= maxPrice) {
      if (parseInt(e.target.value) > parseInt(maxValue)) {
      } else {
        setMinValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) < minValue) {
        setMinValue(parseInt(e.target.value));
      }
    }
  };

  const handleMax = (e) => {
    if (maxValue - minValue >= 10000 && maxValue <= maxPrice) {
      if (parseInt(e.target.value) < parseInt(minValue)) {
      } else {
        setMaxValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) > maxValue) {
        setMaxValue(parseInt(e.target.value));
      }
    }
  };

  useEffect(() => {
    progressRef.current.style.left = (minValue / maxPrice) * 100 + "%";
    progressRef.current.style.right = 100 - (maxValue / maxPrice) * 100 + "%";
  }, [minValue, maxValue, minPrice, maxPrice]);

  useEffect(() => {
    let newActivePriceRange = currActivePriceRange;
    newActivePriceRange.min = minValue;
    newActivePriceRange.max = maxValue;

    setCurrActivePriceRange(newActivePriceRange);
    callback_PriceChanged(newActivePriceRange);
  }, [minValue, maxValue]);

  return (
    <div className="flex flex-col justify-center items-stretch w-full p-4 gap-4">
      <h1 className="w-full font-medium text-sm text-gray-900">
        Use Slider or enter minimum & maximum price
      </h1>

      <div className="flex justify-between items-center px-4 mt-4">
        <div className="flex items-center justify-center gap-2 rounded-md">
          <span className="font-semibold">Min</span>
          <input
            onChange={(e) =>
              e.target.value < minPrice
                ? setMinValue(minPrice)
                : e.target.value > maxValue - 10000
                ? setMinValue(maxValue - 10000)
                : setMinValue(e.target.value)
            }
            type="number"
            value={minValue}
            className="w-24 rounded-md border-2 px-2 py-1 border-tif-blue"
          />
        </div>
        <div className="ml-2 font-semibold text-lg"> - </div>
        <div className="flex items-center justify-center gap-2 rounded-md">
          <span className="font-semibold">Max</span>
          <input
            onChange={(e) =>
              e.target.value > maxPrice
                ? setMaxValue(maxPrice)
                : e.target.value < minValue + 10000
                ? setMaxValue(minValue + 10000)
                : setMaxValue(e.target.value)
            }
            type="number"
            value={maxValue}
            className="w-24 rounded-md border-2 px-2 py-1 border-tif-blue"
          />
        </div>
      </div>

      <div className="mt-12 mb-6 px-4">
        <div className="slider relative h-1 rounded-md bg-gray-300">
          <div
            className="progress absolute h-1 bg-tif-blue rounded"
            ref={progressRef}
          >
            <div className="flex flex-col items-center justify-between">
              <div className="flex items-center justify-start w-full h-20 -mt-16">
                <h1 className="px-2 py-1 bg-tif-blue rounded-lg font-medium text-xs text-white">
                  {minValue}
                </h1>
              </div>
              <div className="flex items-center justify-end w-full">
                <h1 className="px-2 py-1 bg-tif-blue rounded-lg font-medium text-xs text-white">
                  {maxValue}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="range-input relative">
          <input
            onChange={handleMin}
            type="range"
            value={minValue}
            min={minPrice}
            step={100}
            max={maxPrice}
            className="range-min absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-none"
          />

          <input
            onChange={handleMax}
            type="range"
            value={maxValue}
            min={minPrice}
            step={100}
            max={maxPrice}
            className="range-max absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPriceControls;
