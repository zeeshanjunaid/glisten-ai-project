import { Content, isFilled } from "@prismicio/client";
import { PiArrowsClockwise, PiGear } from "react-icons/pi";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

import Bounded from "@/components/Bounded";
import { ButtonLink } from "@/components/ButtonLink";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";

const icons = {
  gear: <PiGear />,
  cycle: <PiArrowsClockwise />,
};

/**
 * Props for `Showcase`.
 */
export type ShowcaseProps = SliceComponentProps<Content.ShowcaseSlice>;

/**
 * Component for "Showcase" Slices.
 */
const Showcase = ({ slice }: ShowcaseProps): JSX.Element => {
  return (
    <Bounded
      className="relative"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="glow absolute -z-10 aspect-square w-full max-w-xl rounded-full bg-blue-400/20 blur-3xl filter" />
      {isFilled.richText(slice.primary.heading) && (
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading2: ({ children }) => (
              <h2 className="text-balance text-center text-5xl font-medium md:text-7xl">
                {children}
              </h2>
            ),
          }}
        />
      )}
      <div className="mt-16 grid items-center rounded-xl border border-blue-50/20 bg-gradient-to-b from-slate-50/15 to-slate-50/5 p-8 backdrop-blur-sm lg:grid-cols-3 lg:py-12">
        <div>
          <div className="w-fit rounded-lg bg-blue-500/35 p-4 text-3xl">
            {slice.primary.icon && icons[slice.primary.icon]}
          </div>
          <div className="mt-6 text-2xl font-normal">
            <PrismicRichText field={slice.primary.sub_heading} />
          </div>
          <div className="prose prose-invert mt-4 max-w-xl">
            <PrismicRichText field={slice.primary.body} />
          </div>

          <ButtonLink className="mt-6" field={slice.primary.button_link}>
            {slice.primary.button_label || "Learn More"}
          </ButtonLink>
        </div>
        <PrismicNextImage
          className={clsx(
            "opacity-90 shadow-2xl lg:col-span-2 mt-8 lg:mt-0",
            slice.variation === "reverse"
              ? "lg:order-1 lg:translate-x-[15%]"
              : "lg:-order-1 lg:translate-x-[-15%]",
          )}
          field={slice.primary.image}
        />
      </div>
    </Bounded>
  );
};

export default Showcase;
