import { useParams } from "next/navigation";
import { NextResponse, userAgent } from "next/server";
import { useEffect } from "react";

const ProductViewMirror = ({
  iFrameBaseURLMobile,
  iFrameBaseURLDesktop,
  debugMode,
  productID,
  skeJSON,
  texJSON,
  texPNG,
  newProductID,
  switchCam,
  callback_SwitchCam,
}) => {
  let iFrameSrc = "";
  let iFrameParams = [
    "productID=" + productID,
    "skeJson=" + skeJSON,
    "texJson=" + texJSON,
    "texPng=" + texPNG,
    "debug=" + (debugMode ? debugMode : 0),
  ];

  useEffect(() => {
    if (switchCam) {
      HandleCamSwitch();
      callback_SwitchCam(false);
    }
  }, [switchCam]);

  useEffect(() => {
    if (newProductID != null) {
      HandleProductChange(newProductID);
    }
  }, [newProductID]);

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

  function HandleCamSwitch() {
    let iframe = document.getElementById("MirrorFrame");
    let iframeWindow = iframe.contentWindow;

    iframeWindow.postMessage({ switchCam: true }, "*");

    /*if (iframeWindow.toggleCamera) {
      iframeWindow.toggleCamera();
    } else {
      console.log("CAM TOGGLE FUNCTION NOT FOUND");
    }*/
  }

  function HandleProductChange(productID) {
    let iframe = document.getElementById("MirrorFrame");
    let iframeWindow = iframe.contentWindow;

    iframeWindow.postMessage({ newDressID: productID }, "*");
  }

  return (
    <iframe
      id="MirrorFrame"
      src={GenerateFrameSrc()}
      width="100%"
      height="100%"
      allow="camera"
      className="z-0 overflow-clip"
    ></iframe>
  );
};

export default ProductViewMirror;
