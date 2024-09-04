import CategorySlider from "@/components/CategorySlider/CategorySlider";
import { getFormattedPrice } from "@/utils/productInfoUtils";
import { BookOpenIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";

const ProductViewCatalogue = ({
  catalogue,
  selectedProductID,
  categories,
  selectedCategory,
  callback_OnChange_SelectedProduct,
}) => {
  const [isCatalogueExpanded, setIsCatalogueExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState(selectedCategory);
  const [activeProductID, setActiveProductID] = useState(selectedProductID);

  function HandleToggle_Expand() {
    setIsCatalogueExpanded(!isCatalogueExpanded);
  }

  function HandleChange_Category(newCat) {
    setActiveCategory(newCat);
  }

  function HandleChange_Product(newProductID, newProductData) {
    setActiveProductID(newProductID);
    callback_OnChange_SelectedProduct(newProductID, newProductData);
    setIsCatalogueExpanded(false);
  }

  return (
    <section
      className={`absolute bottom-0 right-0 flex flex-col items-center justify-between overflow-clip transition-all ease-in-out duration-300 ${
        isCatalogueExpanded
          ? "h-full w-full rounded-2xl z-30"
          : "h-20 w-20 rounded-[2.5rem] z-20"
      }`}
    >
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between p-4 gap-0 h-20 w-full bg-gradient-to-br from-tif-lavender to-tif-pink shadow-md z-10">
        <div
          className={`${
            isCatalogueExpanded ? "w-full" : "w-0"
          } flex items-center justify-start gap-4 h-full truncate text-white font-semibold`}
        >
          <BookOpenIcon
            className={`${
              isCatalogueExpanded ? "w-6 h-6 opacity-100" : "w-0 h-0 opacity-0"
            } transition-all delay-150 duration-300 ease-in-out`}
          />
          <h1>Catalogue</h1>
        </div>
        <button
          onClick={HandleToggle_Expand}
          className="flex items-center justify-center h-full aspect-square text-tif-blue bg-white rounded-full shadow-lg"
        >
          <BookOpenIcon
            className={`${
              isCatalogueExpanded ? "w-0 h-0 opacity-0" : "w-6 h-6 opacity-100"
            } transition-all delay-150 duration-300 ease-in-out`}
          />
          <XMarkIcon
            className={`${
              isCatalogueExpanded ? "w-6 h-6 opacity-100" : "w-0 h-0 opacity-0"
            } transition-all delay-150 duration-300 ease-in-out`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-start p-4 gap-4 h-full w-full backdrop-blur-lg bg-white/50 overflow-clip">
        <CatalogueNav
          categories={categories}
          selectedCategory={activeCategory}
          callback_ActiveCategory={HandleChange_Category}
        />
        <CatalogueGrid
          catalogue={catalogue}
          activeProductID={activeProductID}
          activeCategory={activeCategory}
          callback_OnChange_SelectedProduct={HandleChange_Product}
        />
      </div>
    </section>
  );
};

export default ProductViewCatalogue;

const CatalogueNav = ({
  categories,
  selectedCategory,
  callback_ActiveCategory,
}) => {
  const [activeCategory, setActiveCategory] = useState(selectedCategory);

  const HandleChange_Category = (category) => {
    setActiveCategory(category);
    callback_ActiveCategory(category);
  };

  return (
    <div className="flex shrink-0 whitespace-nowrap p-1 md:p-2 gap-4 min-w-full h-16 bg-white rounded-xl overflow-x-auto scrollbar-hide scroll-smooth">
      <CategoryCard
        key={"CatalogueNav_Category_All"}
        catID={"CatalogueNav_Category_All"}
        catName={["All"]}
        catActive={activeCategory}
        callback_OnClick={HandleChange_Category}
      />
      {categories.map((category, index) => (
        <CategoryCard
          key={"CatalogueNav_Category_" + index}
          catID={"CatalogueNav_Category_" + index}
          catName={Object.keys(category)}
          catActive={activeCategory}
          callback_OnClick={HandleChange_Category}
        />
      ))}
    </div>
  );
};

const CategoryCard = ({ catName, catID, catActive, callback_OnClick }) => {
  const catNameValue = Object.values(catName);
  const catActiveValue = catActive;

  return (
    <button
      key={catName}
      id={catID}
      onClick={() => callback_OnClick(catName)}
      className={`${
        catNameValue.toString() === catActiveValue.toString()
          ? "font-semibold text-white bg-gradient-to-br from bg-tif-blue to-tif-pink"
          : "text-gray-900 font-medium"
      } rounded-lg px-4 h-full text-sm transition-all duration-[250ms] ease-in-out`}
    >
      <h1>{catName}</h1>
    </button>
  );
};

const CatalogueGrid = ({
  catalogue,
  activeProductID,
  activeCategory,
  callback_OnChange_SelectedProduct,
}) => {
  return (
    <section className="w-full overflow-y-auto scrollbar-hide scroll-smooth">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-4 pb-20">
        {catalogue
          .filter(
            (product) =>
              activeCategory == "All" || product.category == activeCategory
          )
          .map((product) => (
            <CatalogueCard
              key={"CatalogueCard_" + product.productID}
              productInfo={product}
              activeProductID={activeProductID}
              callback_OnSelect={callback_OnChange_SelectedProduct}
            />
          ))}
      </div>
    </section>
  );
};

const CatalogueCard = ({ productInfo, activeProductID, callback_OnSelect }) => {
  return (
    <button
      disabled={productInfo.productID == activeProductID}
      className="group flex flex-col bg-white hover:bg-tif-blue disabled:bg-gradient-to-br from-tif-blue to-tif-pink disabled:pointer-events-none rounded-xl shadow-[0_0px_15px_3px_rgba(0,0,0,0.10)] hover:shadow-md transition-all"
      onClick={() => callback_OnSelect(productInfo.productID, productInfo)}
    >
      <div className="flex flex-col px-2 pt-2 pb-4 gap-4 w-full h-72 md:h-80 lg:h-96 justify-center items-center">
        <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-md overflow-clip relative">
          <Image
            src={productInfo.poster}
            blurDataURL={productInfo.poster}
            alt="Product Image"
            quality={100}
            fill
            style={{ objectFit: "cover" }}
            placeholder="blur"
          />
        </div>

        <div className="flex flex-col w-full">
          <h1 className="text-gray-600 group-hover:text-white group-disabled:text-white text-sm font-medium group-hover:font-bold truncate transition-all">
            {productInfo.productName}
          </h1>
          <h2 className="text-xs font-normal group-hover:font-semibold text-red-500 group-hover:text-white group-disabled:text-white transition-all">
            {getFormattedPrice(productInfo.currency, productInfo.price)}
          </h2>
        </div>
      </div>
    </button>
  );
};
