import { Dialog, Transition } from "@headlessui/react";
import {
  BuildingStorefrontIcon,
  CreditCardIcon,
  FunnelIcon,
} from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";
import FilterOutletsRadioGroup from "./FilterOutletsRadioGroup";
import FilterPriceControls from "./FilterPriceControls";

const ModalFiltersContent = ({
  outletNameList,
  activeOutletName,
  productPriceMin,
  productPriceMax,
  activePriceRange,
  onOutletChangedCallback,
  onPriceRangeChangedCallback,
  onCloseCallback,
}) => {
  const [currActiveOutlet, setCurrActiveOutlet] = useState(activeOutletName);
  const [currActivePriceRange, setCurrActivePriceRange] =
    useState(activePriceRange);
  console.log(
    "ModalContent Outlet Objects Recieved-> " + JSON.stringify(outletNameList)
  );
  console.log(
    "ModalContent Active Outlet Recieved-> " + JSON.stringify(activeOutletName)
  );

  function Callback_OnOutletChanged(newActiveOutlet) {
    console.log("Outlet changed to " + newActiveOutlet);
    setCurrActiveOutlet(newActiveOutlet);
    onOutletChangedCallback(newActiveOutlet);
  }

  function Callback_OnPriceChanged(newActivePriceRange) {
    console.log(
      "Price Range changed to | Min -> " +
        newActivePriceRange.min +
        " | Max -> " +
        newActivePriceRange.max
    );
    setCurrActivePriceRange(newActivePriceRange);
    onPriceRangeChangedCallback(newActivePriceRange);
  }

  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="flex flex-col w-full max-w-md transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-2xl transition-all">
            <div className="flex flex-col justify-between p-4 bg-gradient-to-br from-tif-blue to-tif-pink">
              <Dialog.Title
                as="div"
                className="flex items-center justify-start gap-4 text-lg font-medium text-white"
              >
                <FunnelIcon className="h-8 w-8" />
                <h1>Choose Filters</h1>
              </Dialog.Title>
            </div>

            <div
              className={`flex flex-col px-0 pb-6 gap-4 items-center justify-center w-full`}
            >
              <div className="flex flex-col w-full overflow-clip">
                <div className="flex items-center justify-start p-2 gap-2 bg-tif-pink text-white">
                  <BuildingStorefrontIcon className="w-5 h-5" />
                  <h1 className="font-medium text-lg text-white">
                    Outlets Filter
                  </h1>
                </div>
                <FilterOutletsRadioGroup
                  outletList={outletNameList}
                  activeOutlet={currActiveOutlet}
                  callback_OutletChanged={Callback_OnOutletChanged}
                />
              </div>

              <div className="flex flex-col w-full overflow-clip">
                <div className="flex items-center justify-start p-2 gap-2 bg-tif-pink text-white">
                  <CreditCardIcon className="w-5 h-5" />
                  <h1 className="font-medium text-lg text-white">
                    Price Filter
                  </h1>
                </div>
                <FilterPriceControls
                  minPrice={productPriceMin}
                  maxPrice={productPriceMax}
                  activePriceRange={currActivePriceRange}
                  callback_PriceChanged={Callback_OnPriceChanged}
                />
              </div>
            </div>

            <div className="w-full p-2 pt-0">
              <button
                onClick={() => onCloseCallback()}
                className="flex p-2 items-center justify-center w-full font-semibold text-white bg-tif-blue hover:bg-tif-lavender hover:shadow-md rounded-lg transition-all"
              >
                <h1>Set Filters</h1>
              </button>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  );
};

export default ModalFiltersContent;
