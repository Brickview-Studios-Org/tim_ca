"use client";
import LoadingIndicator from "@/components/Common/LoadingIndicator";
import ProductViewInfoCard from "@/components/Product View/ProductViewInfoCard/ProductViewInfoCard";
import ProductViewNavBar from "@/components/Product View/ProductViewNavBar/ProductViewNavBar";
import useProduct from "@/hooks/useProduct";
import { useEffect, useState } from "react";
import ProductViewMirror from "@/components/Product View/ProductViewMirror/ProductViewMirror";
import { useSearchParams } from "next/navigation";
import useCompany from "@/hooks/useCompany";
import ProductViewCatalogue from "@/components/Product View/ProductViewCatalogue/ProductViewCatalogue";

const ProductView = ({ params }) => {
  const searchParams = useSearchParams();
  const debugMode = searchParams.get("debug");
  const companyIDQuery = searchParams.get("companyID");

  const { product, isProductLoading, isProductError } = useProduct(
    params.productID
  );

  const { company, isCompanyLoading, isCompanyError } = useCompany(
    parseInt(companyIDQuery)
  );  

  const [switchCamera, setSwitchCamera] = useState(false);
  const [newProductData, setNewProductData] = useState(null);
  const [newProductID, setNewProductID] = useState(null);

  console.log("Product Data Fetched: ");
  console.log(product);

  useEffect(() => {
    if (product?.data) {
      setNewProductData(product);      
    }
  }, [product]);  

  function Callback_OnCameraSwitch(doSwitch) {
    setSwitchCamera(doSwitch);
  }

  function Callback_OnChange_Product(productID, productData) {
    console.log("Product change attempt to - " + productID);
    setNewProductID(productID);
    setNewProductData({ data: productData });
  }

  return (
    <main className="flex md:flex-row flex-col items-center justify-center w-screen h-[100svh] bg-black">
      <ProductViewNavBar callback_OnCameraSwitch={Callback_OnCameraSwitch} />
      {isProductLoading ||
        (isCompanyLoading && (
          <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-gray-500">
            <LoadingIndicator />
            <span className="font-semibold lg:text-xl">Loading Product</span>
            <span className="font-light text-xs lg:text-sm">Please wait</span>
          </section>
        ))}

      {product &&
        product.data == null &&
        !isProductLoading &&
        company &&
        !isCompanyLoading && (
          <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-red-500">
            <span className="font-semibold lg:text-xl">
              Sorry, there was an error while loading data
            </span>
            <span className="font-light text-xs lg:text-sm">
              Please refresh the page if you still see an error after 30 secs
            </span>
          </section>
        )}

      {isProductError ||
        (isCompanyError && (
          <section className="flex flex-col p-4 gap-2 items-center justify-between w-full text-red-500">
            <span className="font-semibold lg:text-xl">
              Sorry, there was an error while loading data
            </span>
            <span className="font-light text-xs lg:text-sm">
              Please refresh the page if you still see an error after 30 secs
            </span>
          </section>
        ))}

      {newProductData != null &&
        product &&
        product.data != null &&
        !isProductError &&
        company &&
        !isCompanyError && (
          <section className="flex flex-col items-center justify-center w-full h-full">
            <div className="flex items-center justify-center w-full h-full text-white bg-gray-900">
              <ProductViewMirror
                iFrameBaseURLMobile="https://main.d1iyqjpav8ryhy.amplifyapp.com/"
                iFrameBaseURLDesktop="https://main.d1iyqjpav8ryhy.amplifyapp.com/"
                productID={product.data.productID}
                skeJSON={product.data.skeJson}
                texJSON={product.data.texJson}
                texPNG={product.data.texPng}
                debugMode={debugMode}
                newProductID={newProductID}
                switchCam={switchCamera}
                callback_SwitchCam={Callback_OnCameraSwitch}
              />
            </div>
            <div className="absolute top-4 bottom-4 left-4 right-4">
              <ProductViewInfoCard productInfo={newProductData} />
              <ProductViewCatalogue
                catalogue={company.catalogue}
                selectedProductID={product.data.productID}
                categories={company.company[0].categories}
                selectedCategory={[product.data.category]}
                callback_OnChange_SelectedProduct={Callback_OnChange_Product}
              />
            </div>
          </section>
        )}
    </main>
  );
};

export default ProductView;
