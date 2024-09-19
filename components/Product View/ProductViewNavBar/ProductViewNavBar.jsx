import { useRouter } from "next/navigation";
import {
  ChevronLeftIcon,
  CameraIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

const ProductViewNavBar = ({
  callback_OnCameraSwitch,
  isPluginMode = false,
}) => {
  const router = useRouter();

  if (isPluginMode) {
    return (
      <section className="absolute top-0 left-0 right-0 flex items-center justify-between h-auto py-4 px-4 z-20">
        <button
          onClick={() => router.back()}
          className="p-2 bg-white text-black rounded-full shadow-xl"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center px-6 py-1 rounded-full bg-white">
          <Image
            src="/Logos/TIF_Logo.svg"
            alt="Try It First Logo"
            width={112.5}
            height={48}
            className="pb-2"
          />
        </div>

        <button
          onClick={() => callback_OnCameraSwitch(true)}
          className="flex items-center justify-center p-2 gap-4 bg-white text-black rounded-full shadow-xl"
        >
          <ArrowPathIcon className="w-5 h-5" />
          <CameraIcon className="w-5 h-5" />
        </button>
      </section>
    );
  } else {
    return (
      <section className="absolute top-0 left-0 right-0 flex items-center justify-between h-auto py-4 px-4 z-20">
        <button
          onClick={() => router.back()}
          className="p-2 bg-white text-black rounded-full shadow-xl"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>

        <button
          onClick={() => callback_OnCameraSwitch(true)}
          className="flex items-center justify-center p-2 gap-4 bg-white text-black rounded-full shadow-xl"
        >
          <ArrowPathIcon className="w-5 h-5" />
          <CameraIcon className="w-5 h-5" />
        </button>
      </section>
    );
  }
};

export default ProductViewNavBar;
