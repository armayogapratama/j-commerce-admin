"use client";

import React from "react";
import Link from "next/link";

export default function CompoundCard({
  title,
  value,
}: {
  title: string;
  value: string | number | boolean;
}) {
  return (
    <div className="w-full grid grid-cols-3 md:flex flex-row items-center gap-x-3 md:gap-x-1 py-3">
      <div className="w-3/12">
        <p className="text-neutral-90 text-[12px] md:text-[14px]">{title}</p>
      </div>

      <ul className="w-full flex flex-col gap-y-3 pl-4">
        <li className="w-full list-disc text-black text-[12px] md:text-[14px]">
          {value}
        </li>
      </ul>
    </div>
  );
}
