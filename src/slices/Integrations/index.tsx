import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";

import { AnimatedContent } from "./AnimatedContent";
import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import Image from "next/image";
import React from "react";
import StarBackground from "./StarBackground";
import background from "./background.jpg";

/**
 * Props for `Integrations`.
 */
export type IntegrationsProps = SliceComponentProps<Content.IntegrationsSlice>;

/**
 * Component for "Integrations" Slices.
 */
const Integrations = ({ slice }: IntegrationsProps): JSX.Element => {
  return (
    <Bounded
      className="relative overflow-hidden"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Image
        alt=""
        fill
        className="object-cover"
        quality={90}
        src={background}
      />
      <StarBackground />
      <div className="relative">
        <h2 className="mx-auto max-w-2xl text-balance text-center text-5xl font-medium md:text-7xl">
          <PrismicText field={slice.primary.heading} />
        </h2>
        <div className="mx-auto mt-6 max-w-md text-balance text-center text-slate-300">
          <PrismicRichText field={slice.primary.body} />
        </div>
        <AnimatedContent slice={slice} />
      </div>
    </Bounded>
  );
};

export default Integrations;
