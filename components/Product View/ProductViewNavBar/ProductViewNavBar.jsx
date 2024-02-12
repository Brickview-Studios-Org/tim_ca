import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

const ProductViewNavBar = () => {
  const router = useRouter();

  return (
    <section className="absolute top-0 left-0 flex w-fit h-auto py-4 px-2 z-20">
      <button
        onClick={() => router.back()}
        className="p-2 bg-white text-black rounded-full shadow-xl"
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>
    </section>
  );
};

export default ProductViewNavBar;
