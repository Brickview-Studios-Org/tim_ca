import PG_Card from "./SubComps/PG_Card";

const ProductGrid = ({ productItems, category, outlet, priceRange }) => {
  console.log("PG -> Outlet -> " + JSON.stringify(outlet));
  console.log("PG -> Price Range -> " + JSON.stringify(priceRange));

  const fullList = productItems;
  const catFilteredList =
    category == "All"
      ? fullList
      : fullList.filter((product) => product.category == category);
  const outletFilteredList =
    outlet == -1
      ? catFilteredList
      : catFilteredList.filter((product) => product.outletIDs == outlet);
  const priceFilteredList = priceRange
    ? outletFilteredList.filter(
        (product) =>
          product.price >= priceRange.min && product.price <= priceRange.max
      )
    : outletFilteredList;

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 pt-0 p-4 gap-4">
      {priceFilteredList.map((product) => (
        <PG_Card key={product.productID} productInfo={product} />
      ))}
    </section>
  );
};

export default ProductGrid;
