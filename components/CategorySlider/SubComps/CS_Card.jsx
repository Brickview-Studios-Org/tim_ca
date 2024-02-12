const CS_Card = ({ catName, catID, catActive, onClickCallback }) => {
  const catNameValue = Object.values(catName);
  const catActiveValue = catActive;

  return (
    <button
      key={catName}
      id={catID}
      onClick={() => onClickCallback(catName)}
      className={`${
        catNameValue.toString() === catActiveValue.toString()
          ? "font-semibold text-white bg-gradient-to-br from-tif-blue to-tif-pink"
          : "text-gray-900 font-medium shadow-[0_0px_6px_2px_rgba(0,0,0,0.10)]"
      } relative rounded-full px-4 py-2 text-sm transition duration-[250ms] ease-in-out`}
    >
      <h1>
        {console.log(
          "Name : " + Object.values(catName) + " | Active : " + catActive
        )}
        {catName}
      </h1>
    </button>
  );
};

export default CS_Card;
