import Link from "next/link";
import { getFormattedPrice } from "@/utils/productInfoUtils";
import Image from "next/image";

const PG_Card = ({ productInfo }) => {
  return (
    <Link
      className="group flex flex-col bg-white hover:bg-tif-blue hover:scale-105 rounded-xl shadow-[0_0px_15px_3px_rgba(0,0,0,0.10)] hover:shadow-md transition-all"
      href={
        "/view/" + productInfo.productID + "?companyID=" + productInfo.companyID
      }
    >
      <div
        id="card"
        className="flex flex-col px-2 pt-2 pb-4 gap-4 w-full h-72 md:h-80 lg:h-96 justify-center items-center"
      >
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
          <h1 className="text-gray-600 group-hover:text-white text-sm font-medium group-hover:font-bold truncate transition-all">
            {productInfo.productName}
          </h1>
          <h2 className="text-xs font-normal group-hover:font-semibold text-red-500 group-hover:text-white transition-all">
            {getFormattedPrice(productInfo.currency, productInfo.price)}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default PG_Card;
