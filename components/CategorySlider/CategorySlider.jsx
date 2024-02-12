import { useState } from "react";
import CS_Card from "./SubComps/CS_Card";

const CategorySlider = ({
  categoryItems,
  id,
  currActiveCategory,
  activeCategoryCallback,
}) => {
  const [activeCategory, setActiveCategory] = useState(currActiveCategory);

  const handleCategoryChange = (category) => {
    console.log("Changed to " + category);
    setActiveCategory(category);
    activeCategoryCallback(category);
  };

  return (
    <section className="flex flex-col w-full">
      {/* Slider Div */}
      <div className="relative flex whitespace-nowrap px-4 py-2 gap-4 overflow-x-auto scrollbar-hide scroll-smooth">
        <CS_Card
          catName={["All"]}
          catID={id + "_category_" + "-1"}
          catActive={activeCategory}
          onClickCallback={handleCategoryChange}
        />
        {categoryItems.map((category, index) => (
          <CS_Card
            key={id + "_category_" + index}
            catName={Object.keys(category)}
            catID={id + "_category_" + index}
            catActive={activeCategory}
            onClickCallback={handleCategoryChange}
          />
        ))}
      </div>
      <div className="absolute left-0 w-4 h-14 bg-gradient-to-r from-white from-40%" />
      <div className="absolute right-0 w-5 h-14 bg-gradient-to-l from-white from-40%" />
    </section>
  );
};

export default CategorySlider;
