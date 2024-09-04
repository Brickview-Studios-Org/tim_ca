import CategorySlider from "@/components/CategorySlider/CategorySlider";
import { BookOpenIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const ProductViewCatalogue = ({
  catalogue,
  selectedProductID,
  categories,
  selectedCategory,
  callback_OnChange_SelectedProduct,
}) => {
  const [isCatalogueExpanded, setIsCatalogueExpanded] = useState(false);

  function HandleToggle_Expand() {
    setIsCatalogueExpanded(!isCatalogueExpanded);
  }

  console.log("CATALOGUE:");
  console.log(catalogue);
  console.log("CATEGORIES");
  console.log(categories);

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
      <div className="flex flex-col items-center justify-start p-4 gap-4 h-full w-full backdrop-blur-3xl bg-white/50 overflow-clip">
        {/*<CatalogueNav
          categories={categories}
          selectedCategory={selectedCategory}
          callback_ActiveCategory={null}
        />*/}
        <CatalogueGrid
          catalogue={catalogue}
          activeProduct={null}
          activeCategory={null}
          callback_OnChange_SelectedProduct={callback_OnChange_SelectedProduct}
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
  const [activeCategory, setActiveCategory] = useState[selectedCategory];

  console.log("AAAAAAAAAAAAAAAAA");
  console.log(categories);

  const HandleChange_Category = (category) => {
    setActiveCategory(category);
    callback_ActiveCategory(category);
  };

  return (
    <section className="flex whitespace-nowrap p-2 gap-4 h-16 border-2 border-tif-lavender rounded-[2rem] overflow-x-auto scrollbar-hide scroll-smooth">
      {/*categories.map((category, index) => (
        <button
          key={"CatalogueNav_Category_" + index}
          onClick={() => HandleChange_Category(Object.keys(category))}
        >
          {Object.keys(category)}
        </button>
      ))*/}
    </section>
  );
};

const CatalogueGrid = ({
  catalogue,
  activeProduct,
  activeCategory,
  callback_OnChange_SelectedProduct,
}) => {
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 p-4 gap-4">
      {catalogue.map((product) => (
        <CatalogueCard
          key={"CatalogueCard_" + product.productID}
          productInfo={product}
          callback_OnSelect={callback_OnChange_SelectedProduct}
        />
      ))}
    </section>
  );
};

const CatalogueCard = ({ productInfo, callback_OnSelect }) => {
  return (
    <button
      className="flex items-center justify-center p-4"
      onClick={() => callback_OnSelect(productInfo.productID)}
    >
      {productInfo.productName}
    </button>
  );
};
