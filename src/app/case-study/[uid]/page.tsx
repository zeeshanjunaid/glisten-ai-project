import { PrismicText, SliceZone } from "@prismicio/react";

import Bounded from "@/components/Bounded";
import { Metadata } from "next";
import { PrismicNextImage } from "@prismicio/next";
import StarGrid from "@/components/StarGrid";
import { components } from "@/slices";
import { createClient } from "@/prismicio";
import { notFound } from "next/navigation";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("case_study", params.uid)
    .catch(() => notFound());

  return (
    <Bounded as="article">
      <div className="relative grid place-items-center text-center">
        <StarGrid />
        <h1 className="text-7xl font-medium">
          <PrismicText field={page.data.company} />
          <p className="text-lg text-yellow-500">Case Study</p>
        </h1>
        <p className="mb-4 mt-8 max-w-xl text-xl text-slate-300">
          <PrismicText field={page.data.description} />
        </p>
        <PrismicNextImage
          quality={100}
          className="rounded-lg"
          field={page.data.logo_image}
        />
      </div>
      <div className="mx-auto">
        <SliceZone slices={page.data.slices} components={components} />
      </div>
    </Bounded>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("case_study", params.uid)
    .catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("case_study");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
