"use client";

import Script from "next/script";
import type { CSSProperties, HTMLAttributes } from "react";

type DotLottieProps = HTMLAttributes<HTMLElement> & {
  src?: string;
  autoplay?: boolean;
  loop?: boolean;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "dotlottie-wc": DotLottieProps;
    }
  }
}

type LottieBackgroundProps = {
  src: string;
  className?: string;
  style?: CSSProperties;
};

export function LottieBackground({ src, className, style }: LottieBackgroundProps) {
  return (
    <>
      <Script
        src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.14/dist/dotlottie-wc.js"
        type="module"
        strategy="afterInteractive"
      />
      <dotlottie-wc
        src={src}
        autoplay
        loop
        className={className}
        style={{ width: "100%", height: "100%", ...style }}
      />
    </>
  );
}
