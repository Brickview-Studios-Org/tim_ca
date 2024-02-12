"use client";
import axios from "axios";
import LoadingIndicator from "@/components/Common/LoadingIndicator";
import ProductViewInfoCard from "@/components/Product View/ProductViewInfoCard/ProductViewInfoCard";
import ProductViewNavBar from "@/components/Product View/ProductViewNavBar/ProductViewNavBar";
import useProduct from "@/hooks/useProduct";
import { useEffect, useState } from "react";
import ProductViewMirror from "@/components/Product View/ProductViewMirror/ProductViewMirror";

const ProductView = ({ params }) => {
  const { product, isProductLoading, isProductError } = useProduct(
    params.productID
  );

  const [analyticsViewsFields, setAnalyticsViewsFields] = useState({
    productID: 0,
    ARloadtime: 100,
    ARviews: 1,
    clicksToAddToCart: 2,
    clicksToWishlist: 3,
    clickToColorChange: 4,
    clickToTextureChange: 5,
    duration360: 6,
    durationAR: 7,
    Loadtime360: 100,
    productSKU: 0,
    screenshotsInAR: 8,
    videosInAR: 9,
    views360: 10,
  });

  console.log("Product Data Fetched: ");
  console.log(product);

  useEffect(() => {
    if (product) {
      SetAnalyticsData(product);
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      console.log("Uploading analytics data");
      uploadAnalytics();
    }
  }, [analyticsViewsFields]);

  function SetAnalyticsData(productData) {
    var anl_data = {
      productID: productData.data.productID,
      ARloadtime: 100,
      ARviews: 1,
      clicksToAddToCart: 2,
      clicksToWishlist: 3,
      clickToColorChange: 4,
      clickToTextureChange: 5,
      duration360: 6,
      durationAR: 7,
      Loadtime360: 100,
      productSKU: 0,
      screenshotsInAR: 8,
      videosInAR: 9,
      views360: 10,
    };

    setAnalyticsViewsFields(anl_data);
    console.log("Analytics data set: " + JSON.stringify(analyticsViewsFields));
  }

  const uploadAnalytics = async () => {
    console.log(
      "Uploading analytics - " + JSON.stringify(analyticsViewsFields)
    );
    try {
      const response = await axios.patch(
        "https://0zwhtezm4f.execute-api.ap-south-1.amazonaws.com/TryItFirst/analytics/views",
        analyticsViewsFields
      );

      if (response.status === 200) {
        console.log("Analytics data upload successful");
      } else {
        console.log("Analytics upload error");
      }
    } catch (err) {
      console.log("Analytics upload error");
    }
  };

  return (
    <main className="flex md:flex-row flex-col items-center justify-center w-screen h-[100svh] bg-white">
      <ProductViewNavBar />
      {isProductLoading && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-gray-500">
          <LoadingIndicator />
          <span className="font-semibold lg:text-xl">Loading Product</span>
          <span className="font-light text-xs lg:text-sm">Please wait</span>
        </section>
      )}

      {product && product.data == null && !isProductLoading && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-red-500">
          <span className="font-semibold lg:text-xl">
            Sorry, there was an error while loading data
          </span>
          <span className="font-light text-xs lg:text-sm">
            Please refresh the page if you still see an error after 30 secs
          </span>
        </section>
      )}

      {isProductError && (
        <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-red-500">
          <span className="font-semibold lg:text-xl">
            Sorry, there was an error while loading data
          </span>
          <span className="font-light text-xs lg:text-sm">
            Please refresh the page if you still see an error after 30 secs
          </span>
        </section>
      )}

      {/*product && product.data != null && !isProductError && (
        <section className="flex md:flex-row flex-col md:items-center md:justify-center md:gap-6 md:p-6 w-full h-full">
          <section className="w-full md:h-2/3 h-1/3 bg-white">
            <ProductViewModelCard productInfo={product} />
          </section>
          <section className="z-10 w-full h-2/3 bg-gray-100 md:rounded-3xl rounded-t-3xl shadow-[0_10px_25px_5px_rgba(0,0,0,0.25)] border-gray-300 border-t-2">
            <ProductViewInfoCard productInfo={product} />
          </section>
        </section>
      )*/}

      {product && product.data != null && !isProductError && (
        <section className="flex flex-col items-center justify-center w-full h-full">
          <div className="flex items-center justify-center w-full h-full text-white bg-gray-900">
            <ProductViewMirror
              iFrameBaseURLMobile="https://mobile.d1lmusw209sqn4.amplifyapp.com/"
              iFrameBaseURLDesktop="https://main.d1lmusw209sqn4.amplifyapp.com/"
              productID={product.data.productID}
              skeJSON={product.data.skeJson}
              texJSON={product.data.texJson}
              texPNG={product.data.texPng}
            />
          </div>
          {/*<div className="absolute w-full h-full z-10">
            <ProductViewInfoCard productInfo={product} />
          </div>*/}
        </section>
      )}
    </main>
  );
};

export default ProductView;
