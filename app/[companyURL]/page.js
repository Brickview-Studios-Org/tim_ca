"use client";

import { useState } from "react";
import PrimaryNav from "@/components/PrimaryNav/PrimaryNav";
import ProductGrid from "@/components/ProductGrid/ProductGrid";
import useCompany from "@/hooks/useCompany";
import ModalAbout from "@/components/ModalAbout/ModalAbout";
import ModalFilters from "@/components/ModalFilters/ModalFilters";
import Image from "next/image";

const CompanyHome = ({ params }) => {
  const { company, isCompanyLoading, isCompanyError } = useCompany(
    params.companyURL,
    true
  );
  
  const [activeCategory, setActiveCategory] = useState(["All"]);
  const [activeOutlet, setActiveOutlet] = useState(-1);
  const [activePriceRange, setActivePriceRange] = useState({
    min: Number.MIN_VALUE,
    max: Number.MAX_VALUE,
  });
  const [openAboutUsModal, setOpenAboutUsModal] = useState(false);
  const [openFiltersModal, setOpenFiltersModal] = useState(false);

  const handleCategoryChange = (newActiveCategory) => {
    setActiveCategory(newActiveCategory);
  };

  const handleOutletChange = (newActiveOutlet) => {
    setActiveOutlet(newActiveOutlet);
  };

  const handlePriceRangeChange = (newActivePriceRange) => {
    setActivePriceRange(newActivePriceRange);
  };

  function Callback_Modal_AboutUs_Open() {
    setOpenAboutUsModal(true);
  }

  function Callback_Modal_AboutUs_Close() {
    setOpenAboutUsModal(false);
  }

  function Callback_Modal_Filters_Open() {
    setOpenFiltersModal(true);
  }

  function Callback_Modal_Filters_Close(outletFilter, priceRangeFilter) {
    console.log("Outlet Filter recieved at page -> " + outletFilter);
    console.log(
      "Price Filter recieved at page -> " + JSON.stringify(priceRangeFilter)
    );

    setOpenFiltersModal(false);
    handleOutletChange(outletFilter);
    if (priceRangeFilter) handlePriceRangeChange(priceRangeFilter);
  }

  if (isCompanyLoading) {
    return (
      
        <div className="flex bg-spoon-grey p-8 w-screen h-screen justify-center items-center">
          <h2 className="text-spoon-blue font-normal text-lg">
            Loading Brand Info
          </h2>
        </div>
      
    );
  }  

  if (isCompanyError) {
    return (      
        <div className="flex bg-gray-400 p-8 w-screen h-screen justify-center items-center">
          <h2 className="text-red-900 font-normal text-lg">
            There was an error
          </h2>
        </div>
      
    );
  }

  if(company?.company) {
    return (
        <main className="h-[100svh] w-full bg-white overflow-auto">
          <ModalAbout
            doOpen={openAboutUsModal}
            companyInfo={company.company[0]}
            callback_OnClose={Callback_Modal_AboutUs_Close}
          />
          <ModalFilters
            doOpen={openFiltersModal}
            companyOutlets={company.outletList}
            companyProducts={company.catalogue}
            activeOutlet={activeOutlet}
            activePriceRange={activePriceRange}
            callback_OnClose={Callback_Modal_Filters_Close}
          />
          <PrimaryNav
            companyInfo={company.company[0]}
            activeCategory={activeCategory}
            activeCategoryCallback={handleCategoryChange}
            openAboutUsModalCallback={Callback_Modal_AboutUs_Open}
            openFiltersModalCallback={Callback_Modal_Filters_Open}
          />
          <ProductGrid
            productItems={company.catalogue}
            category={activeCategory}
            outlet={activeOutlet}
            priceRange={activePriceRange}
          />
        </main>
    )
  }
  else {
    return (
        <main className="h-[100svh] w-full bg-white overflow-auto">
        <div className="flex flex-col items-center justify-center w-full h-full gap-6 p-8">
          <Image
            src="/Logos/TIF_Logo.svg"
            alt="Try It First Logo"
            width={200}
            height={32}
            className="animate-slideInSpringedBottom pb-2"
          />

          <h2 className="text-red-500 font-normal text-lg text-center">
            Sorry, we couldn't find the page you are looking for
          </h2>
        </div>
      </main>
    )
  }  
};

export default CompanyHome;