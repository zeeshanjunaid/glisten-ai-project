import { PrismicText, SliceComponentProps } from "@prismicio/react";

import Bounded from "@/components/Bounded";
import { ButtonLink } from "@/components/ButtonLink";
import { Content } from "@prismicio/client";
import PlainLogo from "./PlainLogo";

/**
 * Props for `CallToAction`.
 */
export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

/**
 * Component for "CallToAction" Slices.
 */
const CallToAction = ({ slice }: CallToActionProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative py-32 text-center font-medium md:py-40"
    >
      <div className="glow absolute -z-10 aspect-square w-full max-w-sm rounded-full bg-blue-500/50 blur-[160px] filter" />
      <div className="glass-container rounded-lg bg-gradient-to-b from-slate-800 to-slate-900 p-4 md:rounded-xl">
        <PlainLogo />
      </div>
      <div className="mt-8 max-w-xl text-5xl text-balance">
        <PrismicText field={slice.primary.heading} />
      </div>
      <ButtonLink className="mt-6" field={slice.primary.button_link}>
        {slice.primary.button_label || "Learn More"}
      </ButtonLink>
    </Bounded>
  );
};

export default CallToAction;
