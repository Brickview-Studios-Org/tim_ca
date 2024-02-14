import { NextResponse, userAgent } from "next/server";

const ProductViewMirror = ({
  iFrameBaseURLMobile,
  iFrameBaseURLDesktop,
  productID,
  skeJSON,
  texJSON,
  texPNG,
}) => {
  let iFrameSrc = "";
  let iFrameParams = [
    "productID=" + productID,
    "skeJson=" + skeJSON,
    "texJson=" + texJSON,
    "texPng=" + texPNG,
  ];

  function GenerateFrameSrc() {
    iFrameSrc = (isMobile() ? iFrameBaseURLMobile : iFrameBaseURLDesktop) + "?";

    for (let i = 0; i < iFrameParams.length; i++) {
      iFrameSrc += iFrameParams[i];
      if (i != iFrameParams.length - 1) iFrameSrc += "&";
    }

    console.log("Generated iFrame Src URL -> " + iFrameSrc);
    return iFrameSrc;
  }

  /*function middleware(request) {
    const url = request.nextUrl;
    const { device } = userAgent(request);
    const viewport = device.type === "mobile" ? "mobile" : "desktop";
    url.searchParams.set("viewport", viewport);
    return NextResponse.rewrite(url);
  }*/

  function isMobile() {
    return (
      navigator.maxTouchPoints > 0 &&
      /Android|iPhone/i.test(navigator.userAgent)
    );
  }

  return (
    <iframe
      src={GenerateFrameSrc()}
      width="100%"
      height="100%"
      allow="camera"
      style={{ transform: 'scale(0.5)' }}
      className="z-0 border-2 border-red-500 overflow-clip"
    ></iframe>
  );
};

export default ProductViewMirror;
