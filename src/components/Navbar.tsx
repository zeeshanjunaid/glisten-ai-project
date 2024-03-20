"use client";

import { Content, asLink } from "@prismicio/client";
import { MdClose, MdMenu } from "react-icons/md";
import React, { useState } from "react";

import { ButtonLink } from "./ButtonLink";
import Link from "next/link";
import { PrismicNextLink } from "@prismicio/next";
import WordMark from "./WordMark";
import clsx from "clsx";
import { usePathname } from "next/navigation";

type NavbarProps = {
  settings: Content.SettingsDocument;
};
export const Navbar = ({ settings }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className="p-4 md:p-6">
      <div className="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-white md:flex-row md:items-center">
        <div className="flex items-center justify-between">
          <Link href="/" className="z-50" onClick={() => setOpen(false)}>
            <WordMark />
            <span className="sr-only">Glisten.ai</span>
          </Link>
          <button
            type="button"
            className="block p-2 text-3xl text-white md:hidden"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <MdMenu />
            <span className="sr-only">Open Menu</span>
          </button>
        </div>
        <div
          className={clsx(
            "fixed bottom-0 left-0 right-0 top-0 z-40 flex flex-col items-end gap-4 bg-[#070815] pr-4 pt-14 transition-transform duration-300  ease-in-out motion-reduce:transition-none md:hidden",
            open ? "translate-x-0" : "translate-x-[100%]",
          )}
        >
          <button
            type="button"
            className="fixed right-4 top-4 mb-4 block p-2 text-3xl text-white md:hidden"
            aria-expanded={open}
            onClick={() => setOpen(false)}
          >
            <MdClose />
            <span className="sr-only">Close Menu</span>
          </button>
          <div className="grid justify-items-end gap-8">
            {settings.data.navigation.map((item) => {
              if (item.cta_button) {
                return (
                  <ButtonLink
                    onClick={() => setOpen(false)}
                    key={item.label}
                    field={item.link}
                    aria-current={
                      pathname.includes(asLink(item.link) as string)
                        ? "page"
                        : undefined
                    }
                  >
                    {item.label}
                  </ButtonLink>
                );
              }
              return (
                <PrismicNextLink
                  onClick={() => setOpen(false)}
                  field={item.link}
                  key={item.label}
                  className="block px-3 text-3xl first:mt-8"
                  aria-current={
                    pathname.includes(asLink(item.link) as string)
                      ? "page"
                      : undefined
                  }
                >
                  {item.label}
                </PrismicNextLink>
              );
            })}
          </div>
        </div>
        <ul className="hidden gap-6 md:flex">
          {settings.data.navigation.map((item) => {
            if (item.cta_button) {
              return (
                <li key={item.label}>
                  <ButtonLink
                    aria-current={
                      pathname.includes(asLink(item.link) as string)
                        ? "page"
                        : undefined
                    }
                    field={item.link}
                  >
                    {item.label}
                  </ButtonLink>
                </li>
              );
            }
            return (
              <li key={item.label}>
                <PrismicNextLink
                  aria-current={
                    pathname.includes(asLink(item.link) as string)
                      ? "page"
                      : undefined
                  }
                  field={item.link}
                  className="inline-flex min-h-11 items-center"
                >
                  {item.label}
                </PrismicNextLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
